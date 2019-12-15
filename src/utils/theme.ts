export interface claraThemeType {
	backgroundColor: string;
	blockColor: string;
	activeColor: string;
	ink: string;
	basePadding: number;
	ratios: {
		l: number;
		s: number;
	};
}

export const theme: claraThemeType = {
	backgroundColor: '#22292d',
	blockColor: '#303940',
  activeColor: '#494f56',
  ink: '#b5b5b8',
	basePadding: .3,
	ratios: {
		l: 1.25,
		s: 0.75,
	},
};
