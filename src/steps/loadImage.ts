import { ImageParameter, Parameter } from '../definitions/parameters';

export async function loadImage(canvas: HTMLCanvasElement, parameters: Parameter[]) {
	return new Promise(function(resolve: Function, reject: Function) {
		const reader = new FileReader();
		const file = parameters.find((p) => p.name === 'image') as ImageParameter;
		const img = new Image();

		if (!file) {
			throw new Error('No image file');
		}

		reader.onload = function() {
			img.src = reader.result as string;
		};

		img.onload = function() {
			const context = canvas.getContext('2d');

			if (!context) {
				reject(new Error('No canvas context'));
				return;
			}

			canvas.width = img.width;
			canvas.height = img.height;

			context.drawImage(img, 0, 0);
			resolve();
		};

		reader.readAsDataURL(file.value as Blob);
	});
}
