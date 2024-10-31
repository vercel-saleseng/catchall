import { notFound } from 'next/navigation';
import { getCachedData } from '../lib';
import CategorieList from '../ui/categorie-list';

export default async function Layout(props: { params: Promise<{ route?: string[] }>; children: React.ReactNode }) {
	const params = await props.params;
	const fragment = await getCachedData(params.route);
	if (!fragment) return notFound();

	return (
		<div className=''>
			<nav className='flex items-center justify-between py-4 px-4'>
				<span className='text-xs font-medium'>Last Reval: {new Date(fragment.ts).toLocaleString()}</span>
				<CategorieList />
			</nav>
			<main className='max-w-3xl mx-auto px-4 py-8 space-y-6'>{props.children}</main>
		</div>
	);
}
