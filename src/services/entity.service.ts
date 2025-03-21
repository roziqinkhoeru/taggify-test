import articlesJson from '@/constants/articles.json';
import blogsJson from '@/constants/blogs.json';
import notesJson from '@/constants/notes.json';
import { TagRequest } from '@/types/state';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getNotes = async () => {
	// const response = await fetch(`${BASE_API_URL}/api/notes`);

	// if (response.status === 429) {
	// 	throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	// }

	// const data = await response.json();
	// return data;

	return notesJson;
};

export const getBlogs = async () => {
	// const response = await fetch(`${BASE_API_URL}/api/blogs`);

	// if (response.status === 429) {
	// 	throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	// }

	// const data = await response.json();
	// return data;

	return blogsJson;
};

export const getArticles = async () => {
	// const response = await fetch(`${BASE_API_URL}/api/articles`);

	// if (response.status === 429) {
	// 	throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	// }

	// const data = await response.json();
	// return data;

	return articlesJson;
};

export const getDetailEntity = async (entityType: string, id: number) => {
	const response = await fetch(`${BASE_API_URL}/api/${entityType}/${id}`);

	if (response.status === 429) {
		throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	}

	if (!response.ok) {
		throw new Error('Failed to fetch entity');
	}

	return response.json();
};

export const createEntity = async (entity: { title: string; entityType: string; text: string; tags: TagRequest[] }) => {
	const response = await fetch(`${BASE_API_URL}/api/${entity.entityType}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(entity),
	});

	if (response.status === 429) {
		throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	}

	if (!response.ok) {
		throw new Error('Failed to create entity');
	}

	return response.json();
};

export const updateEntity = async (entity: {
	id: number;
	title: string;
	entityType: string;
	text: string;
	tags: TagRequest[];
}) => {
	const response = await fetch(`${BASE_API_URL}/api/${entity.entityType}/${entity.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(entity),
	});

	if (response.status === 429) {
		throw new Error('Too many requests. The requests to this endpoint are being terminated due to abuse.');
	}

	if (!response.ok) {
		throw new Error('Failed to update entity');
	}

	return response.json();
};
