import { StoreRepository } from '../../repository/StoreRepository';

const storeRepository = new StoreRepository();

export default {
  stores: storeRepository.all.bind(storeRepository) as typeof storeRepository.all,
};
