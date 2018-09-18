import { Parameter } from '../definitions/parameters';
import { get } from '../utils/steps';
import { avg, getIndex, pixelToHex } from '../utils/misc';

export async function squares3(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	const w = canvas.width;
	const h = canvas.height;
	const context = canvas.getContext('2d');
	const c1 = get('limit', parameters) as number;
	const c2 = get('step', parameters) as number;
	const magicNumber = Math.floor(w / c1);
	if (context === null) throw new Error('Context is null');
	const img = context.getImageData(0, 0, w, h);
	const pixels = img.data;
	let x, y, index, m2, nextIndex, diffR, diffG, diffB, avgDiff, i;
	const squares = [];

	for (y = 0; y <= h; y += magicNumber) {
		for (x = 0; x <= w; x += magicNumber) {
			m2 = magicNumber * 4 * Math.random();
			index = getIndex(Math.floor(x), Math.floor(y), w);
			nextIndex = getIndex(Math.floor(x) + c2, Math.floor(y), w);

			diffR = Math.abs(pixels[index] - pixels[nextIndex]);
			diffG = Math.abs(pixels[index + 1] - pixels[nextIndex + 1]);
			diffB = Math.abs(pixels[index + 2] - pixels[nextIndex + 2]);
			avgDiff = avg([diffB, diffG, diffR]);

			console.log(avgDiff);
			// if (avgDiff > c1) {
				squares.push({
					x: Math.floor(x),
					y: Math.floor(y),
					size: m2,
					color: pixelToHex(diffR, diffG, diffB),
				});
			// }
		}
	}

  for (i=0; i<pixels.length; i+=4) {
    pixels[i] = pixels[i+1] = pixels[i+2] = 255;
  }

  context.putImageData(img, 0, 0);

  for(i=0; i<squares.length; i++) {
    const { x, y, size, color} = squares[i];
    context.beginPath();
    context.rect(x, y, size, size);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}
