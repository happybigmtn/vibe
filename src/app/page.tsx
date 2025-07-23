// import { getQueryClient } from "@/trpc/server";
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { Client } from "./client";
// import { Suspense } from "react";
//
// const Page = async () => {
//   const queryClient = getQueryClient();
//
//   // Prefetch the query on the server
//   await queryClient.prefetchQuery({
//     queryKey: [['createAI'], { input: { text: 'RK prefetch' }, type: 'query' }],
//     queryFn: async () => {
//       // Use the server-side caller
//       const { getServerTrpc } = await import('@/trpc/server');
//       const serverTrpc = await getServerTrpc();
//       return await serverTrpc.createAI({ text: 'RK prefetch' });
//     },
//   });
//
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Client />
//       </Suspense>
//     </HydrationBoundary>
//   )
// }
//
// export default Page

"use client";

import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

const Page = () => {
  const invoke = trpc.invoke.useMutation({
    onSuccess: () => {
      toast.success('Background job invoked successfully!');
    },
  })

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Button disabled={invoke.isPending} onClick={() => invoke.mutate({ text: 'John' })}>Invoke Background Job</Button>
    </div>
  )
}

export default Page;
