import { NextResponse } from "next/server";

const logs = [
  { timestamp: "2024-05-01T10:00:00Z", message: "Benutzeranmeldung erfolgreich", severity: "info" },
  { timestamp: "2024-05-02T11:00:00Z", message: "Konfiguration geändert", severity: "warning" },
  { timestamp: "2024-05-03T12:30:00Z", message: "Serverfehler aufgetreten", severity: "critical" },
];

export function GET() {
  const header = "timestamp,message,severity";
  const rows = logs.map(l => `${l.timestamp},${l.message},${l.severity}`).join("\n");
  const csv = `${header}\n${rows}\n`;
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=\"audit-log.csv\"",
    },
  });
}
