import { getContrastText } from '@/libs/content';
import { Tag } from '@/types/state';
import Link from 'next/link';
import Badge from './badge';

interface EntityCardProps {
	id: number;
	title: string;
	type: string;
	text: string;
	tags: Tag[];
}

function EntityCard({ id, title, type, text, tags }: EntityCardProps) {
	return (
		<Link
			className='border border-zinc-700 p-5 rounded-xl block hover:scale-105 transition-all duration-150 ease-in-out bg-transparent hover:bg-zinc-900 h-full'
			href={`/entities/${type}/${id}`}
		>
			<p className='font-semibold text-zinc-200 text-base mb-2 text-pretty'>{title}</p>
			<p className='text-sm text-zinc-400 line-clamp-3 mb-3 text-balance'>{text}</p>
			<div className='flex flex-wrap gap-x-2 gap-y-2.5'>
				{tags.length > 0
					? tags.map((tag) => {
							const textColor = getContrastText(tag.color);
							return <Badge key={tag.id} textColor={textColor} color={tag.color} name={tag.name} />;
					  })
					: null}
			</div>
		</Link>
	);
}

export default EntityCard;
