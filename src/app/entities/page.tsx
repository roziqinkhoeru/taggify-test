import EntityCard from '@/components/entity-card';
import { getArticles, getBlogs, getNotes } from '@/services/entity.service';
import { Article, Blog, Note } from '@/types/state';

async function Entities() {
	const notes = await getNotes();
	const blogs = await getBlogs();
	const articles = await getArticles();

	if (!notes || !blogs || !articles) {
		throw new Error('No entities found');
	}

	return (
		<div className='container w-full max-w-7xl mx-auto px-6 py-10'>
			<div className='flex flex-col w-full space-y-10'>
				{/* notes */}
				<div className=''>
					<h2 className='font-semibold text-xl text-zinc-300 mb-4'>Notes</h2>
					<div className='w-full grid grid-cols-12 gap-5'>
						{notes.data.length > 0 ? (
							notes.data.map((entity: Note) => (
								<div className='col-span-4' key={entity.id}>
									<EntityCard
										id={entity.id}
										title={entity.title}
										text={entity.text}
										tags={entity.tags}
										type={entity.entityType}
									/>
								</div>
							))
						) : (
							<div className='col-span-full'>
								<p>No notes found</p>
							</div>
						)}
					</div>
				</div>
				{/* blogs */}
				<div className=''>
					<h2 className='font-semibold text-xl text-zinc-300 mb-4'>Blogs</h2>
					<div className='w-full grid grid-cols-12 gap-5'>
						{blogs.data.length > 0 ? (
							blogs.data.map((entity: Blog) => (
								<div className='col-span-4' key={entity.id}>
									<EntityCard
										id={entity.id}
										title={entity.title}
										text={entity.text}
										tags={entity.tags}
										type={entity.entityType}
									/>
								</div>
							))
						) : (
							<div className='col-span-full'>
								<p>No blogs found</p>
							</div>
						)}
					</div>
				</div>
				{/* articles */}
				<div className=''>
					<h2 className='font-semibold text-xl text-zinc-300 mb-4'>Articles</h2>
					<div className='w-full grid grid-cols-12 gap-5'>
						{articles.data.length > 0 ? (
							articles.data.map((entity: Article) => (
								<div className='col-span-4' key={entity.id}>
									<EntityCard
										id={entity.id}
										title={entity.title}
										text={entity.text}
										tags={entity.tags}
										type={entity.entityType}
									/>
								</div>
							))
						) : (
							<div className='col-span-full'>
								<p>No articles found</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Entities;
