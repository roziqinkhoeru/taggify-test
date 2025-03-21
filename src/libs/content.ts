export const getContrastText = (bgColor: string) => {
	const hex = bgColor.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);

	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	return luminance > 0.5 ? 'text-zinc-900' : 'text-zinc-100';
};

export const getRandomHexColor = () => {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
