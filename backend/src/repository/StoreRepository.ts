import Store, { Vehicle } from '../model/Store';
import { FileRepository } from './drivers/FileRepository';
import { readFile } from 'fs/promises';
import { RoutingAPILimitError } from '../error/RoutingAPILimitError';

interface StoreJSON {
  stores: [
    {
      [key: string]: string | number | boolean;
    },
  ];
  attributes: {
    longitude: unknown;
    latitude: unknown;
  };
}

export type StoreFetchArguments = {
  latitude?: number;
  longitude?: number;
  limit?: number;
  vehicle?: Vehicle;
};

export class StoreRepository extends FileRepository<Store> {
  constructor() {
    super('stores.json');
  }

  /**
   * Routes fetch logic based on arguments provided.
   * Without latitude & longitude - all vehicles are returned, up to specified limit
   * With lat&long but without vehicle - only simple distance is provided
   * With vehicle specified, there's a predefined limit due to Routing API
   *
   *
   * @param props
   */
  async fetch(props: StoreFetchArguments = {}): Promise<Store[]> {
    const { latitude, longitude, limit, vehicle } = props;

    if (!latitude || !longitude) {
      return this.fetchAll(limit); // return all
    }
    if (!vehicle) {
      return this.fetchWithDistance({
        latitude,
        longitude,
        limit,
      }); // return simple distance
    }

    return this.fetchWithTravelInfo({
      latitude,
      longitude,
      limit,
      vehicle,
    }); // return full info
  }

  protected async fetchAll(limit?: number): Promise<Store[]> {
    const parsed: StoreJSON = JSON.parse(
      (await readFile(this.filePath)).toString('utf-8'),
    ) as StoreJSON;

    return parsed.stores
      .map((storeRaw) => {
        const store = new Store();
        // No object spread because we don't want POJO
        Object.assign(store, storeRaw);
        return store;
      })
      .slice(0, limit);
  }

  protected async fetchWithDistance({
    latitude: userLatitude,
    longitude: userLongitude,
    limit,
  }: StoreFetchArguments): Promise<Store[]> {
    return (await this.fetch())
      .map((store) => store.calculateCrowDistance(userLatitude, userLongitude))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }

  protected async fetchWithTravelInfo({
    latitude: userLatitude,
    longitude: userLongitude,
    limit,
    vehicle,
  }: StoreFetchArguments): Promise<Store[]> {
    if (!limit) limit = 5;
    if (limit && limit > globalThis.maximumRoutingRequests)
      throw new RoutingAPILimitError(
        `Routing API Error: Limit can't be set higher than ${globalThis.maximumRoutingRequests}`,
      );

    return Promise.all(
      await (
        await this.fetchWithDistance({ latitude: userLatitude, longitude: userLongitude, limit })
      ).map(async (store) => await store.fetchTravelInfo(userLatitude, userLongitude, vehicle)),
    );
  }
}
