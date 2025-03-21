'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { Tag } from '@/types/state';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TableTagProps {
	tags: Tag[];
}

function TableTag({ tags }: TableTagProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(searchParams.get('search') || '');
	const [selectedType, setSelectedType] = useState(searchParams.get('entityType') || '');
	const querySearch = useDebounce(search, 500);

	useEffect(() => {
		const params = new URLSearchParams();

		if (querySearch) params.set('search', querySearch);
		if (selectedType) params.set('entityType', selectedType);

		router.push(`?${params.toString()}`, { scroll: false });
	}, [querySearch, selectedType, router]);

	return (
		<div className=''>
			{/* filter */}
			<div className='flex items-center justify-between mb-6'>
				<div className=''>
					<input
						id='searchFilter'
						name='searchFilter'
						type='text'
						className='border border-zinc-700 px-3 py-1 w-full rounded-md h-9 focus:border-indigo-500 outline-0'
						autoComplete='off'
						placeholder='Search tag'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className=''>
					<select
						name='entityTypeFilter'
						id='entityTypeFilter'
						className='border border-zinc-700 px-3 py-1 rounded-md h-9 focus:border-indigo-500 outline-0'
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						<option value=''>All</option>
						<option value='note'>Note</option>
						<option value='blog'>Blog</option>
						<option value='article'>Article</option>
					</select>
				</div>
			</div>
			{/* table */}
			<div className='w-full overflow-y-auto'>
				<table className='w-full border border-zinc-700'>
					<thead>
						<tr>
							<th className='border border-zinc-700 px-3 py-1'>Name</th>
							<th className='border border-zinc-700 text-center px-3 py-1'>Color</th>
							<th className='border border-zinc-700 px-3 py-1'>Created At</th>
						</tr>
					</thead>
					<tbody>
						{tags.length > 0 ? (
							tags.map((tag: Tag) => (
								<tr key={tag.id}>
									<td className='border border-zinc-700 px-3 py-1 text-zinc-300'>{tag.name}</td>
									<td className='border border-zinc-700 text-center px-3 py-1 text-zinc-300'>
										<div className='flex items-center justify-center gap-1.5'>
											<div className='size-3 rounded-full' style={{ background: `${tag.color}` }} />
											{tag.color}
										</div>
									</td>
									<td className='border border-zinc-700 px-3 py-1 text-zinc-300'>
										{new Date(tag.createdAt).toLocaleString()}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={3} className='border border-zinc-700 text-center'>
									No data
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default TableTag;
