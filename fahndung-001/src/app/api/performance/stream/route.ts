import { NextRequest } from "next/server";
import { performanceEmitter } from "~/lib/performance";

export const GET = async (_req: NextRequest) => {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (metric: unknown) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(metric)}\n\n`),
        );
      };

      performanceEmitter.on("metric", send);

      const interval = setInterval(() => {
        controller.enqueue(encoder.encode(": heartbeat\n\n"));
      }, 10000);

      controller.oncancel = () => {
        clearInterval(interval);
        performanceEmitter.off("metric", send);
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
};
