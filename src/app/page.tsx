import { Client } from "./client";
import { Suspense } from "react";

const Page = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  )
}

export default Page
