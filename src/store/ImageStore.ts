import { types, Instance } from 'mobx-state-tree';
import { ImageUpload, ImageModel } from '../types/ImageUpload';

export const ImageStore = types
  .model('ImageUpload', {
    image: ImageUpload
  })
  .actions(self => ({
    add(image: ImageModel) {
      self.image = Object.assign(image);
    },

    setWidthAndHeight(width: number, height: number) {
      self.image.width = width;
      self.image.height = height;
    }
  }));

export type ImageStoreType = Instance<typeof ImageStore>;
