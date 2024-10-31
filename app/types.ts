export type TArticle = {
	title: string;
	slug: string;
	subtitle: string;
	content: string;
	author: string;
};

export type CategoryData = {
	name: string;
	slug: string;
	articles: {
		title: string;
		slug: string;
		author: string;
		subtitle: string;
		content: string;
	}[];
};

export type Fragment =
	| {
			ts: number;
			data: CategoryData;
			templateType: 'list';
	  }
	| {
			ts: number;
			article: TArticle;
			categorySlug: string;
			templateType: 'article';
	  }
	| undefined;
