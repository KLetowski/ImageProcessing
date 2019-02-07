import { types, Instance, applySnapshot } from 'mobx-state-tree';

export type ImageUploadModel = {
  title: string;
  source: string;
  width: number;
  height: number;
  uploadDateTime: Date;
};

export const ImageUpload = types
  .model('ImageUpload', {
    title: '',
    source: '',
    width: 0,
    height: 0,
    uploadDateTime: new Date()
  })
  .actions(self => ({
    drawImage() {
      const that = this;
      const img: HTMLImageElement = document.getElementById(
        'img'
      ) as HTMLImageElement;
      img.src = self.source;
      img.style.display = 'block';
      img.onload = function() {
        const canvas: HTMLCanvasElement = document.getElementById(
          'canvas'
        ) as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext(
          '2d'
        ) as CanvasRenderingContext2D;
        canvas.width = img.offsetWidth;
        canvas.height = img.offsetHeight;
        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';

        that.updateImageProperties({
          source: self.source,
          title: self.title,
          height: canvas.height,
          width: canvas.width,
          uploadDateTime: new Date()
        });
      };
    },

    addNewImage(image: ImageUploadModel) {
      applySnapshot(self, image);
    },

    updateImageProperties(image: ImageUploadModel) {
      applySnapshot(self, image);
    }
  }));

export type ImageUploadType = Instance<typeof ImageUpload>;
