import type { Comment } from '@prisma/client';
import { db } from './db';

export type CreateCommentProps = Omit<Comment, 'id' | 'postedAt'>;

export async function createComment({ slug, user, message }: CreateCommentProps) {
    return await db.comment.create({
        data: { slug, user, message },
    });
}

export async function getComments(slug: string) {
    return await db.comment.findMany({
        where: { slug },
    });
}