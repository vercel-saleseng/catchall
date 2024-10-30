import Link from 'next/link';
import type { CategoryData } from '../types';

export default function ArticleList({ category }: { category: CategoryData }) {
	return (
		<div className='space-y-6'>
			<Link
				href='/'
				className='inline-flex items-center rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 20 20'
					fill='currentColor'
					className='w-4 h-4 inline-block mr-1'>
					<path
						fillRule='evenodd'
						d='M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z'
						clipRule='evenodd'
					/>
				</svg>
				Back to all articles
			</Link>
			<h1 className='text-3xl font-bold mb-8 capitalize'>{category.name} Articles</h1>
			<ul className='space-y-8'>
				{category.articles.map((article) => (
					<li key={article.slug} className='border-b border-gray-200 pb-6'>
						<Link href={`/${category.slug}/${article.slug}`} className='group'>
							<h2 className='text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors'>
								{article.title}
							</h2>
							<p className='text-gray-600 mb-4'>{article.subtitle}</p>
							<div className='flex items-center'>
								<span className='text-sm text-gray-500'>{article.author}</span>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
