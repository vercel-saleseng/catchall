import Link from 'next/link';
import type { TArticle } from '../types';

interface Props extends TArticle {
	categorySlug: string;
}

export default function Article({ author, content, title, subtitle, categorySlug }: Props) {
	return (
		<article className='space-y-6'>
			{categorySlug !== '' && (
				<Link
					href={`/${categorySlug}`}
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
					Back to related articles
				</Link>
			)}
			<h1 className='text-4xl font-bold mb-4'>{title}</h1>
			<div className='flex items-center mb-6'>
				<div>
					<p className='font-semibold'>{author}</p>
				</div>
			</div>
			<p className='text-xl text-gray-600 mb-8'>{subtitle}</p>
			<div className='prose prose-lg max-w-none'>{content}</div>
		</article>
	);
}
