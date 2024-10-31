import { revalidateTag } from 'next/cache';
import data from '../data.json';

export const runtime = 'edge';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get('category');

	if (!category) return new Response('Category required', { status: 400 });
	const categories = data.categories.map((el) => el.slug);
	if (!categories.includes(category)) return new Response('Invalid category', { status: 400 });

	revalidateTag(category);
	return new Response('✅ Revalidated', { status: 200 });
}
