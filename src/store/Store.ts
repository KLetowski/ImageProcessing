import { ImageUpload } from '../types/ImageUpload';
import { Instance } from 'mobx-state-tree';
import { routingStore } from './History';

export const store = {
  imageUpload: ImageUpload.create({}),
  routing: routingStore
};

export type StoreType = Instance<typeof store>;

export interface InjectedProps {
  store: StoreType;
}
