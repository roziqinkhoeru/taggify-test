import Link from 'next/link';

function Navbar() {
	return (
		<nav className='w-full fixed top-0 bg-zinc-800'>
			<div className='w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
				<Link href='/'>
					<h1 className='uppercase font-bold text-indigo-400'>Taggify</h1>
				</Link>
				<div className='flex items-center gap-x-4'>
					<Link href='/tags' className='text-zinc-400'>
						Tags
					</Link>
					<Link href='/entities' className='text-zinc-400'>
						Entities
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
