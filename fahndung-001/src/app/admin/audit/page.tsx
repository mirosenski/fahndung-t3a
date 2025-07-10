"use client";

import { useState } from "react";
import LiveAuditMonitor from "~/components/admin/live-audit-monitor";

interface LogEntry {
  timestamp: string;
  message: string;
  severity: "info" | "warning" | "critical";
}

const logs: LogEntry[] = [
  {
    timestamp: "2024-05-01T10:00:00Z",
    message: "Benutzeranmeldung erfolgreich",
    severity: "info",
  },
  {
    timestamp: "2024-05-02T11:00:00Z",
    message: "Konfiguration geändert",
    severity: "warning",
  },
  {
    timestamp: "2024-05-03T12:30:00Z",
    message: "Serverfehler aufgetreten",
    severity: "critical",
  },
];

export default function AuditPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? logs : logs.filter((l) => l.severity === filter);

  return (
    <div className="p-6 space-y-4">
      <LiveAuditMonitor />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <a
          href="/admin/audit/export"
          className="text-blue-600 underline hover:text-blue-800"
        >
          CSV exportieren
        </a>
      </div>
      <div>
        <label className="mr-2 font-medium">Filter:</label>
        <select
          className="border rounded px-2 py-1"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Alle</option>
          <option value="info">Info</option>
          <option value="warning">Warnung</option>
          <option value="critical">Kritisch</option>
        </select>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Zeitpunkt</th>
            <th className="border px-2 py-1 text-left">Nachricht</th>
            <th className="border px-2 py-1 text-left">Stufe</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((log) => (
            <tr key={log.timestamp} className="border-t">
              <td className="border px-2 py-1">{log.timestamp}</td>
              <td className="border px-2 py-1">{log.message}</td>
              <td className="border px-2 py-1">{log.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
