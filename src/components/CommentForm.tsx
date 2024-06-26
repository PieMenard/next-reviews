import { createCommentAction } from '@/app/reviews/[slug]/actions';

type CommentFormProps = {
  title: string;
  slug: string;
};

export default function CommentForm({ title, slug }: CommentFormProps) {
  return (
    <form
      action={createCommentAction}
      className="border bg-white flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <p className="pb-1">
        Leave a comment for <strong>{title}</strong>:
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          id="userField"
          name="user"
          required
          maxLength={50}
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
          required
          maxLength={500}
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
