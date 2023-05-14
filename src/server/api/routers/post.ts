import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: {
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          title: input.title,
          content: input.content,
          published: input.published,
        },
      });
    }),

  getUserPosts: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.post.findMany({
        include: {
          author: true,
        },
        where: {
          authorId: input.userId,
        },
      });
    }),

  getAllPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
