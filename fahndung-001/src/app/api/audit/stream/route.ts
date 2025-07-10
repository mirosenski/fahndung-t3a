import { auditEvents } from "~/lib/audit";
import { NextRequest } from "next/server";

export function GET(_req: NextRequest) {
  const encoder = new TextEncoder();
  let keepAlive: NodeJS.Timeout;
  let listener: (event: Event) => void;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      listener = (event: Event) => {
        const payload = JSON.stringify((event as CustomEvent).detail);
        controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
      };
      auditEvents.addEventListener("log", listener);
      keepAlive = setInterval(() => {
        controller.enqueue(encoder.encode(`:\n\n`));
      }, 15000);
    },
    cancel() {
      auditEvents.removeEventListener("log", listener);
      clearInterval(keepAlive);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
