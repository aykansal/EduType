"use client";

import LiveChat from "@/components/LiveChat";
import { useParams } from "next/navigation";

export default function StreamPage() {
  const params = useParams();
  const streamId = params.streamId;

  if (!streamId) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Stream: {streamId}</h1>
      <LiveChat
        streamId={streamId as string}
        userId={`user-${Math.random()}`}
        username={`User ${Math.floor(Math.random() * 1000)}`}
      />
    </div>
  );
}
