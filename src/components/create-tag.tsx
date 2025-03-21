'use client';

import { useToast } from '@/providers/toast-provider';
import { createTags } from '@/services/tag.service';
import { useState } from 'react';

function CreateTag() {
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { makeToast } = useToast();

	const handleSubmitTag = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const randomColor = Math.floor(Math.random() * 16777215).toString(16);
			const response = await createTags({ name, color: `#${randomColor}` });

			if (response.status === 'success') {
				makeToast(response?.message ?? 'Tag created successfully!', 'success');
				setName('');
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to create tag';
			makeToast(message, 'error');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container w-full max-w-7xl mx-auto px-6'>
			<div className='w-full mx-auto max-w-sm'>
				<div className='w-full border border-zinc-700 p-6 rounded-lg'>
					<h1 className='font-semibold text-zinc-50 text-lg mb-4'>Create Tag</h1>
					<form className='flex flex-col space-y-6' onSubmit={handleSubmitTag}>
						<div className='flex flex-col space-y-2'>
							<label htmlFor='name' className='text-zinc-200'>
								Tag Name
							</label>
							<input
								type='text'
								className='text-zinc-200 px-3 py-1 h-10 border border-zinc-600 rounded-md outline-0 focus:border-indigo-500'
								id='name'
								name='name'
								placeholder="Enter tag's name"
								required
								onChange={(e) => setName(e.target.value)}
								value={name}
								autoComplete='off'
							/>
						</div>
						<div className='flex items-center justify-end gap-3'>
							<button
								className='px-3 py-1 h-10 rounded-md bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-400'
								type='button'
								onClick={() => setName('')}
							>
								Cancel
							</button>
							<button
								className='px-3 py-1 h-10 rounded-md bg-indigo-500 hover:bg-indigo-600 cursor-pointer disabled:opacity-55 disabled:bg-zinc-600'
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? 'Creating...' : 'Create'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CreateTag;
