"use client";

import { useEffect, useState } from "react";

interface Metric {
  id: number;
  name: string;
  duration: number;
  createdAt: string;
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const es = new EventSource("/api/performance/stream");

    es.onmessage = (ev) => {
      const metric = JSON.parse(ev.data) as Metric;
      setMetrics((prev) => [metric, ...prev].slice(0, 20));
    };

    return () => {
      es.close();
    };
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900">
        Performance Metrics
      </h2>
      <ul className="mt-4 space-y-2">
        {metrics.map((m) => (
          <li key={m.id} className="text-sm text-gray-700">
            {m.name}: {m.duration}ms
          </li>
        ))}
      </ul>
    </div>
  );
}
