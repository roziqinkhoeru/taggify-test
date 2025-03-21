'use client';

import FormTag from '@/components/form-tag';
import { useToast } from '@/providers/toast-provider';
import { getDetailEntity, updateEntity } from '@/services/entity.service';
import { TagRequest } from '@/types/state';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

function DetailEntity() {
	const { id, type } = useParams();
	const { makeToast } = useToast();
	const [entityForm, setEntityForm] = useState({
		title: '',
		text: '',
		tags: [] as TagRequest[],
	});
	const [isLoading, setIsLoading] = useState({
		fetch: false,
		update: false,
	});

	const handleTagChange = (updatedTags: TagRequest[]) => {
		setEntityForm((prev) => ({ ...prev, tags: updatedTags }));
	};

	const fetchEntityById = useCallback(async () => {
		setIsLoading((prev) => ({ ...prev, fetch: true }));
		try {
			const response = await getDetailEntity(type as string, Number(id));
			setEntityForm({
				title: response.data.title,
				text: response.data.text,
				tags: response.data.tags,
			});
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to fetch entity';
			makeToast(message, 'error');
		} finally {
			setIsLoading((prev) => ({ ...prev, fetch: false }));
		}
	}, [id, type]);

	const handleUpdateEntity = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading((prev) => ({ ...prev, update: true }));
		try {
			const response = await updateEntity({
				id: Number(id),
				entityType: type as string,
				title: entityForm.title,
				text: entityForm.text,
				tags: entityForm.tags,
			});

			if (response.status === 'success') {
				makeToast(response?.message ?? 'Entity updated successfully!', 'success');
				setEntityForm({ title: '', text: '', tags: [] });
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to update entity';
			makeToast(message, 'error');
		} finally {
			setIsLoading((prev) => ({ ...prev, update: false }));
		}
	};

	useEffect(() => {
		// setEntityForm({
		// 	title: 'Entity title',
		// 	text: 'Entity text',
		// 	tags: [
		// 		{
		// 			name: 'Tag name',
		// 			color: '#393838',
		// 		},
		// 	],
		// });
		fetchEntityById();
	}, [fetchEntityById]);

	return (
		<div className='container w-full max-w-7xl mx-auto px-6 py-10'>
			<div className='flex flex-col w-full space-y-10'>
				<form className='w-full max-w-lg flex flex-col space-y-5' onSubmit={handleUpdateEntity}>
					<div className='flex flex-col space-y-2'>
						<label htmlFor='title' className='text-zinc-200'>
							Title *
						</label>
						<input
							type='text'
							className='text-zinc-200 px-3 py-1 h-10 border border-zinc-600 rounded-md outline-0 focus:border-indigo-500'
							id='title'
							name='title'
							placeholder="Enter entity's title"
							required
							onChange={(e) => setEntityForm({ ...entityForm, title: e.target.value })}
							value={entityForm.title}
							autoComplete='off'
						/>
					</div>
					<div className='flex flex-col space-y-2'>
						<label htmlFor='text' className='text-zinc-200'>
							Text *
						</label>
						<textarea
							className='text-zinc-200 px-3 py-1 border border-zinc-600 rounded-md outline-0 focus:border-indigo-500'
							id='text'
							name='text'
							placeholder="Enter entity's text"
							required
							rows={3}
							onChange={(e) => setEntityForm({ ...entityForm, text: e.target.value })}
							value={entityForm.text}
						/>
					</div>
					<FormTag tags={entityForm.tags} setTags={handleTagChange} />
					<div className='flex items-center justify-end gap-3'>
						<button
							className='px-3 py-1 h-10 rounded-md bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-400'
							type='button'
							onClick={() => setEntityForm({ title: '', text: '', tags: [] })}
						>
							Cancel
						</button>
						<button
							className='px-3 py-1 h-10 rounded-md bg-indigo-500 hover:bg-indigo-600 cursor-pointer disabled:opacity-55 disabled:bg-zinc-600'
							type='submit'
							disabled={isLoading.fetch || isLoading.update}
						>
							{isLoading.update ? 'Updating...' : 'Update'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default DetailEntity;
