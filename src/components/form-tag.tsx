'use client';

import { getRandomHexColor } from '@/libs/content';
import { TagRequest } from '@/types/state';
import { useState } from 'react';
import Badge from './badge';

interface FormTagProps {
	setTags: (val: TagRequest[]) => void;
	tags: TagRequest[];
}

function FormTag({ setTags, tags }: FormTagProps) {
	const [isAdding, setIsAdding] = useState(false);
	const [tagName, setTagName] = useState('');

	const handleAddTag = () => {
		if (!tagName.trim()) return;
		const newTag = { name: tagName, color: getRandomHexColor() };
		setTags([...tags, newTag]);

		// reset
		setTagName('');
		setIsAdding(false);
	};

	const handleRemoveTag = (index: number) => {
		setTags(tags.filter((_, i) => i !== index));
	};

	return (
		<div className='flex flex-col space-y-2'>
			<label htmlFor='tags' className='text-zinc-200'>
				Tags
			</label>

			<div className='flex flex-wrap items-center gap-2 p-3 border border-zinc-600 rounded-md min-h-[44px]'>
				{tags.map((tag, index) => (
					<Badge key={index} color={tag.color} name={tag.name} removable onRemove={() => handleRemoveTag(index)} />
				))}

				{isAdding ? (
					<input
						type='text'
						autoFocus
						className='text-zinc-200 px-3 py-1 h-8 border border-zinc-600 rounded-md outline-0 focus:border-indigo-500'
						placeholder='Tag name...'
						value={tagName}
						onChange={(e) => setTagName(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
						onBlur={() => setIsAdding(false)}
					/>
				) : (
					<button
						type='button'
						className='p-1.5 size-7 rounded-full text-lg flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 cursor-pointer'
						onClick={() => setIsAdding(true)}
					>
						+
					</button>
				)}
			</div>
		</div>
	);
}

export default FormTag;
