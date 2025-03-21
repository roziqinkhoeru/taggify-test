import tagsJson from '@/constants/tags.json';
import { RequestTagState, Tag } from '@/types/state';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getTags = async (requestTag: RequestTagState) => {
	const params = new URLSearchParams();
	if (requestTag.search) params.append('search', requestTag.search);
	if (requestTag.entityType) params.append('entityType', requestTag.entityType);

	// const res = await fetch(`${BASE_API_URL}/api/tags?${params}`, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 	},
	// });

	// if (res.status === 429) {
	// 	throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	// }

	// const data = await res.json();
	// return data;
	if (requestTag.search) {
		const { data, ...res } = tagsJson;
		const filteredData = data.filter((tag) => {
			if (requestTag.search && !tag.name.toLowerCase().includes(requestTag.search.toLowerCase())) {
				return false;
			}
			return true;
		});
		return { data: filteredData, ...res };
	}

	return tagsJson;
};
export const createTags = async (tag: { name: string; color: string }) => {
	const res = await fetch(`${BASE_API_URL}/api/tags`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(tag),
	});

	if (res.status === 429) {
		throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	}

	if (!res.ok) {
		throw new Error('Failed to create tag');
	}

	return res.json();
};
export const getTagsByEntity = async (entityType: string, entityId: number) => {
	const res = await fetch(`${BASE_API_URL}/api/tags/${entityType}/${entityId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await res.json();
	return data;
};
export const assignTagToEntity = async (entityType: string, entityId: number, tags: Tag[]) => {
	const res = await fetch(`${BASE_API_URL}/api/tags/assign`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ entityType, entityId, tags }),
	});

	if (res.status === 429) {
		throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	}

	if (!res.ok) {
		throw new Error('Failed to assign tag to entity');
	}

	return res.json();
};
