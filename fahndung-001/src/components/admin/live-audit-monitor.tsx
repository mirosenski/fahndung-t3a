"use client";

import { useEffect } from "react";

/**
 * LiveAuditMonitor establishes a SSE connection to `/api/admin/audit/stream`
 * and shows browser notifications for incoming critical events.
 */
export default function LiveAuditMonitor() {
  useEffect(() => {
    const source = new EventSource("/api/admin/audit/stream");

    source.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        if (data?.severity?.toLowerCase() === "critical") {
          const notify = () =>
            new Notification("Kritisches Ereignis", {
              body: data.message ?? "Unbekanntes Ereignis",
            });

          if (Notification.permission === "granted") {
            notify();
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((perm) => {
              if (perm === "granted") notify();
            });
          }
        }
      } catch (err) {
        console.error("Fehler beim Verarbeiten des SSE-Events", err);
      }
    };

    return () => {
      source.close();
    };
  }, []);

  return null;
}
