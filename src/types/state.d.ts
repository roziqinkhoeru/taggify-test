interface TagRequest {
	name: string;
	color: string;
}
interface Tag {
	id: number;
	name: string;
	color: string;
	createdAt: string;
}
interface RequestTag {
	name: string;
	color: string;
}
interface Note {
	id: number;
	title: string;
	entityType: string;
	text: string;
	tags: Tag[];
}
interface Blog {
	id: number;
	title: string;
	entityType: string;
	text: string;
	tags: Tag[];
}
interface Article {
	id: number;
	title: string;
	entityType: string;
	text: string;
	tags: Tag[];
}
interface RequestTagState {
	search?: string;
	entityType?: string;
}

export type { Article, Blog, Note, RequestTag, RequestTagState, Tag, TagRequest };
