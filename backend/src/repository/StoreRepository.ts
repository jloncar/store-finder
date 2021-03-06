import Store from '../model/Store';
import { FileRepository } from './drivers/FileRepository';
import { readFile } from 'fs/promises';

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

export class StoreRepository extends FileRepository<Store> {
  constructor() {
    super('stores.json');
  }

  async all(): Promise<Store[]> {
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
}
