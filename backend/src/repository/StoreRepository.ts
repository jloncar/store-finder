import Store from '../model/Store';
import { FileRepository } from './drivers/FileRepository';
import { readFile } from 'fs/promises';
import { RoutingAPILimitError } from '../error/RoutingAPILimit.error';

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

type AllWithDistanceArgs = {
  userLatitude: number;
  userLongitude: number;
  limit?: number;
};

export class StoreRepository extends FileRepository<Store> {
  constructor() {
    super('stores.json');
  }

  async fetch(): Promise<Store[]> {
    const parsed: StoreJSON = JSON.parse(
      (await readFile(this.filePath)).toString('utf-8'),
    ) as StoreJSON;

    return parsed.stores.map((storeRaw) => {
      const store = new Store();
      // No object spread because we don't want POJO
      Object.assign(store, storeRaw);
      return store;
    });
  }

  async fetchWithDistance({
    userLatitude,
    userLongitude,
    limit,
  }: AllWithDistanceArgs): Promise<Store[]> {
    return (await this.fetch())
      .map((store) => store.calculateCrowDistance(userLatitude, userLongitude))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, limit);
  }

  async fetchWithDrivingDistance({
    userLatitude,
    userLongitude,
    limit,
  }: AllWithDistanceArgs): Promise<Store[]> {
    if (!limit) limit = 5;
    if (limit && limit > globalThis.maximumRoutingRequests)
      throw new RoutingAPILimitError(
        `Routing API Error: Limit can't be set higher than ${globalThis.maximumRoutingRequests}`,
      );

    return Promise.all(
      await (await this.fetchWithDistance({ userLatitude, userLongitude, limit })).map(
        async (store) => await store.calculateDrivingDistance(userLatitude, userLongitude),
      ),
    );
  }
}
