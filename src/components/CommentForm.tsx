import { createComment } from '@/lib/comments';
import { redirect } from 'next/navigation';

type CommentFormProps = {
  title: string;
  slug: string;
};

export default function CommentForm({ title, slug }: CommentFormProps) {
  async function action(formData: FormData) {
    'use server';
    createComment({
      slug,
      user: formData.get('user') as string,
      message: formData.get('message') as string,
    });
    redirect(`/reviews/${slug}`);
  }
  return (
    <form
      action={action}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <p className="pb-1">
        Leave a comment for <strong>{title}</strong>:
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          id="userField"
          name="user"
          className="border px-2 py-1 rounded w-48"
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          id="messageField"
          name="message"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-700 rounded px-2 py-1 self-center text-slate-50 w-32 hover:bg-orange-600"
      >
        Submit
      </button>
    </form>
  );
}
