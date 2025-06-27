import { getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();

  // Prefetch the query on the server
  await queryClient.prefetchQuery({
    queryKey: [['createAI'], { input: { text: 'RK prefetch' }, type: 'query' }],
    queryFn: async () => {
      // Use the server-side caller
      const { getServerTrpc } = await import('@/trpc/server');
      const serverTrpc = await getServerTrpc();
      return await serverTrpc.createAI({ text: 'RK prefetch' });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
