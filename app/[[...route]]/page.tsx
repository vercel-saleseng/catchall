import { notFound } from 'next/navigation';
import type { Fragment } from '../types';
import Article from '../ui/article';
import ArticleList from '../ui/article-list';
import CategorieList from '../ui/categorie-list';
import { unstable_cache as cache } from 'next/cache';

const cacheTagCategories = ['technology', 'environment', 'health', 'space'];

const getCachedData = async (route?: string[]) => {
	if (!route) return getFragment(route);

	// all categories but Technology & AI should be cached by their slug
	const tags = !route ? undefined : route[0] in cacheTagCategories ? [route[0]] : undefined;

	// Technology & AI should be revalidated every 30 seconds
	const revalidate = route[0] in cacheTagCategories ? undefined : 30;

	const fn = cache(async () => getFragment(route), undefined, { revalidate, tags });
	return fn();
};

const getFragment = async (route?: string[]): Promise<Fragment> => {
	if (route?.length) {
		// simulate a delay
		const sleepDuration = Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
		await new Promise((resolve) => setTimeout(resolve, sleepDuration));
	}
	const data = (await import('../data.json')).default;

	if (!route || route.length === 0)
		return { ts: Date.now(), templateType: 'article', article: data.home, categorySlug: '' };
	if (route.length === 1) {
		const foundItem = data.categories.find((el) => el.slug === route[0].toLowerCase());
		if (!foundItem) return undefined;

		return { ts: Date.now(), templateType: 'list', data: foundItem };
	}

	const foundItem = data.categories
		.find((el) => el.slug === route[0].toLowerCase())
		?.articles.find((article) => article.slug === route[1].toLowerCase());

	if (!foundItem) return undefined;

	return { ts: Date.now(), templateType: 'article', article: foundItem, categorySlug: route[0].toLowerCase() };
};

export default async function Page(props: { params: Promise<{ route?: string[] }> }) {
	const params = await props.params;
	const fragment = await getCachedData(params.route);
	if (!fragment) return notFound();

	return (
		<main className='max-w-3xl mx-auto px-4 py-8 space-y-6'>
			{fragment.ts}
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
			return notFound();
	}
};
