import CreateTag from '@/components/create-tag';
import TableTag from '@/components/table-tag';
import { getTags } from '@/services/tag.service';

interface TagsProps {
	searchParams: {
		search?: string;
		entityType?: string;
	};
}

async function Tags({ searchParams }: TagsProps) {
	const { search, entityType } = await searchParams;

	const tags = await getTags({
		search,
		entityType,
	});

	if (!tags) {
		throw new Error('Failed to fetch tags');
	}

	return (
		<div className='container w-full max-w-7xl mx-auto px-6 py-10'>
			<div className='flex flex-col w-full space-y-10'>
				<CreateTag />
				<TableTag tags={tags.data} />
			</div>
		</div>
	);
}

export default Tags;
