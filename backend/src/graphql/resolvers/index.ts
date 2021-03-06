import { StoreRepository } from '../../repository/StoreRepository';

const storeRepository = new StoreRepository();

export default {
  stores: storeRepository.fetch.bind(storeRepository) as typeof storeRepository.fetch,

  storesWithDistance: storeRepository.fetchWithDistance.bind(
    storeRepository,
  ) as typeof storeRepository.fetchWithDistance,

  storesWithDrivingDistance: storeRepository.fetchWithDrivingDistance.bind(
    storeRepository,
  ) as typeof storeRepository.fetchWithDrivingDistance,
};
