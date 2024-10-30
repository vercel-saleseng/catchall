import Link from 'next/link';
import data from '../data.json';

export default function CategorieList() {
	return (
		<div className='flex items-center gap-2'>
			{data.categories.map((category) => (
				<div key={category.slug}>
					<Link href={`/${category.slug}`}>
						<span className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
							{category.name}
						</span>
					</Link>
				</div>
			))}
		</div>
	);
}
