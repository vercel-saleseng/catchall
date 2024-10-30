import { notFound } from 'next/navigation';
import type { Fragment } from '../types';
import Article from '../ui/article';
import ArticleList from '../ui/article-list';
import CategorieList from '../ui/categorie-list';

const getFragment = async (route?: string[]): Promise<Fragment> => {
	const sleepDuration = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
	await new Promise((resolve) => setTimeout(resolve, sleepDuration));

	const data = (await import('../data.json')).default;

	if (!route || route.length === 0) return { templateType: 'article', article: data.home, categorySlug: '' };
	if (route.length === 1) {
		const foundItem = data.categories.find((el) => el.slug === route[0].toLowerCase());
		if (!foundItem) return undefined;

		return { templateType: 'list', data: foundItem };
	}

	const foundItem = data.categories
		.find((el) => el.slug === route[0].toLowerCase())
		?.articles.find((article) => article.slug === route[1].toLowerCase());

	if (!foundItem) return undefined;

	return { templateType: 'article', article: foundItem, categorySlug: route[0].toLowerCase() };
};

export default async function Page(props: { params: Promise<{ route?: string[] }> }) {
	const params = await props.params;
	const fragment = await getFragment(params.route);
	if (!fragment) return notFound();

	return (
		<main className='max-w-3xl mx-auto px-4 py-8 space-y-6'>
			<CategorieList />
			<Template fragment={fragment} />
		</main>
	);
}

const Template = ({ fragment }: { fragment: Fragment }) => {
	switch (fragment?.templateType) {
		case 'list':
			return <ArticleList category={fragment.data} />;
		case 'article':
			return <Article categorySlug={fragment.categorySlug} {...fragment.article} />;
		default:
			return <h1>404</h1>;
	}
};
