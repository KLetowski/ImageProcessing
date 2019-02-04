import { types, ModelPropertiesDeclaration } from 'mobx-state-tree';

export type ImageModel = {
  title: string;
  source: string;
  width: number;
  height: number;
};

export const ImageUpload = types
  .model<ImageModel>('ImageUpload', {
    title: '',
    source: '',
    width: 0,
    height: 0
  })
  .actions((self: ImageModel) => ({}))
  .views((self: ImageModel) => ({}));
