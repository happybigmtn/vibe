import 'server-only'; // <-- ensure this file cannot be imported from the client
import { cache } from 'react';
import { createTRPCContext, createCallerFactory } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

// Create the caller factory
const createCaller = createCallerFactory(appRouter);

// Export a server-side caller
export const trpc = createCaller(createTRPCContext);
