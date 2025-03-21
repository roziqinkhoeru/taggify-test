'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<main className='w-full container max-w-7xl mx-auto px-6'>
			<div className='w-full h-screen flex items-center justify-center'>
				<div className=''>
					<h2 className='text-2xl font-semibold text-zinc-100 mb-2'>Something went wrong!</h2>
					<p className='text-zinc-400 mb-4'>{error.message}</p>
					<button className='px-3.5 py-2 h-10 rounded-lg bg-indigo-500 cursor-pointer' onClick={() => reset()}>
						Try again
					</button>
				</div>
			</div>
		</main>
	);
}
