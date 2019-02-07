export const greyScaleFilter = (imageData: ImageData) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    var avg =
      (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
    imageData.data[i] = avg;
    imageData.data[i + 1] = avg;
    imageData.data[i + 2] = avg;
  }

  return imageData;
};

export const createImageData = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  return ctx.createImageData(width, height);
};

export const filter = (imageData: ImageData, matrix: number[]): ImageData => {
  const side = Math.round(Math.sqrt(matrix.length));
  const halfSide = Math.floor(side / 2);

  const source = imageData.data;
  const sourceWidth = imageData.width;
  const sourceHeight = imageData.height;

  const width = sourceWidth;
  const height = sourceHeight;
  const output = createImageData(width, height);
  const destination = output.data;

  for (let imgY = 0; imgY < height; imgY++) {
    for (let imgX = 0; imgX < width; imgX++) {
      let destinationOff = (imgY * width + imgX) * 4;
      let red = 0,
        green = 0,
        blue = 0,
        alpha = 0;

      for (let checkedY = 0; checkedY < side; checkedY++) {
        for (let checkedX = 0; checkedX < side; checkedX++) {
          let scy = Math.min(
            sourceHeight - 1,
            Math.max(0, imgY + checkedY - halfSide)
          );
          let scx = Math.min(
            sourceWidth - 1,
            Math.max(0, imgX + checkedX - halfSide)
          );

          let sourceOff = (scy * sourceWidth + scx) * 4;
          let matrixWeight = matrix[checkedY * side + checkedX];

          red += source[sourceOff] * matrixWeight;
          green += source[sourceOff + 1] * matrixWeight;
          blue += source[sourceOff + 2] * matrixWeight;
          alpha += source[sourceOff + 3] * matrixWeight;
        }
      }

      destination[destinationOff] = red;
      destination[destinationOff + 1] = green;
      destination[destinationOff + 2] = blue;
      destination[destinationOff + 3] = alpha + 0 * (255 - alpha);
    }
  }

  return output;
};
