'use server';
import { CreateCommentProps, createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type ActionError = {
  isError: boolean;
  message: string;
};

export async function createCommentAction(formData: FormData) {
  const data: CreateCommentProps = {
    slug: formData.get('slug') as string,
    user: formData.get('user') as string,
    message: formData.get('message') as string,
  };
  const error = validate(data);
  if (error) {
    return { isError: true, message: error };
  }
  createComment(data);
  revalidatePath(`/reviews/${data.slug}`);
  redirect(`/reviews/${data.slug}`);
}

function validate(data: CreateCommentProps) {
  if (!data.user) {
    return 'Name field is required.';
  }
  if (data.user.length > 50) {
    return 'Name cannot be longer than 50 characters.';
  }
  if (!data.message) {
    return 'Comment field is required';
  }
  if (data.user.length > 50) {
    return 'Comment exceeds 500 character limit.';
  }
}
