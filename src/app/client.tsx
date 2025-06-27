"use client";

import { trpc } from "@/trpc/client";

export const Client = () => {
  // This will use the prefetched data from the server
  const { data, error, isLoading } = trpc.createAI.useQuery({ text: 'RK prefetch' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Prefetched Data:</h2>
      {JSON.stringify(data)}
    </div>
  );
}

