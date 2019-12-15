export function getIndex(x: number, y: number, width: number): number {
	return x * 4 + y * 4 * width;
}

function toHex(n: number): string {
	return ('0' + n.toString(16)).slice(-2);
}

export function pixelToHex(r: number, g: number, b: number) {
	return '#' + toHex(r) + toHex(g) + toHex(b);
}

export function avg(nums: number[]): number {
	let total = 0,
		cont;

	for (cont = 0; cont < nums.length; cont++) total += nums[cont];

	return total / nums.length;
}

export function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
	const radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = cos * (x - cx) + sin * (y - cy) + cx,
		ny = cos * (y - cy) - sin * (x - cx) + cy;
	return { x: nx, y: ny };
}
