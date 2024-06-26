'use server';
import { CreateCommentProps, createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCommentAction(formData: FormData) {
  if (!formData.get('user')) {
    return { isError: true, message: 'Name field is required' };
  }
  const data: CreateCommentProps = {
    slug: formData.get('slug') as string,
    user: formData.get('user') as string,
    message: formData.get('message') as string,
  };
  createComment(data);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}
