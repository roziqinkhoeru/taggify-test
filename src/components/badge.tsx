interface BadgeProps {
	color: string;
	name: string;
	textColor?: string;
	removable?: boolean;
	onRemove?: () => void;
}

function Badge({ textColor = 'text-white', color, name, removable = false, onRemove }: BadgeProps) {
	return (
		<div
			className={`flex items-center space-x-3 rounded-full py-1 ${textColor} ${
				removable ? 'text-sm px-3' : 'text-xs px-2'
			}`}
			style={{ backgroundColor: color }}
		>
			<span>{name}</span>
			{removable && (
				<button type='button' className='text-white hover:text-red-500 cursor-pointer' onClick={onRemove}>
					✕
				</button>
			)}
		</div>
	);
}

export default Badge;
