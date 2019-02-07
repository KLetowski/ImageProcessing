import { ImageUpload } from '../types/ImageUpload';
import { Instance } from 'mobx-state-tree';
import { routingStore } from './History';
import { FilterMethods } from '../types/FilterMethod';

export const store = {
  imageUpload: ImageUpload.create({}),
  filterMethods: FilterMethods.create(),
  routing: routingStore
};

export type StoreType = Instance<typeof store>;

export interface InjectedProps {
  store: StoreType;
}
