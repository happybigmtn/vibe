"use client";

import { trpc } from "@/trpc/client";

export const Client = () => {
  const { data, error, isLoading } = trpc.createAI.useQuery({ text: 'RK prefetch' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}

