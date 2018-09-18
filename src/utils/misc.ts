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
