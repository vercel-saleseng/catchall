import { notFound } from 'next/navigation';
import type { Fragment } from '../types';
import Article from '../ui/article';
import ArticleList from '../ui/article-list';
import { getCachedData } from '../lib';

export default async function Page(props: { params: Promise<{ route?: string[] }> }) {
	const params = await props.params;
	const fragment = await getCachedData(params.route);
	if (!fragment) return notFound();

	return <Template fragment={fragment} />;
}

const Template = ({ fragment }: { fragment: Fragment }) => {
	switch (fragment?.templateType) {
		case 'list':
			return <ArticleList category={fragment.data} />;
		case 'article':
			return <Article categorySlug={fragment.categorySlug} {...fragment.article} />;
		default:
			return notFound();
	}
};
