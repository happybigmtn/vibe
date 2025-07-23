import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { inngest } from '@/inngest/client';
export const appRouter = createTRPCRouter({
  invoke: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .output(
      z.object({
        success: z.boolean(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await inngest.send({
          name: "test/hello.world",
          data: {
            email: input.text
          }
        });
        return { success: true, message: 'Event sent successfully' };
      } catch (error) {
        console.warn('Inngest not configured:', error);
        return { success: false, message: 'Inngest not configured - this is expected in development' };
      }
    }),
  createAI: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
