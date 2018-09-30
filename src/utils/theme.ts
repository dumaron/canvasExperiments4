export interface claraThemeType {
	backgroundColor: string;
	blockColor: string;
	activeColor: string;
	basePadding: number;
	ratios: {
		l: number;
		s: number;
	};
}

export const theme: claraThemeType = {
	backgroundColor: '#2b2b2b',
	blockColor: '#3a3a3a',
  activeColor: '#9797bf',
	basePadding: 1,
	ratios: {
		l: 1.25,
		s: 0.75,
	},
};
