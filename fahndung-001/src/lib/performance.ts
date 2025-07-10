import { EventEmitter } from "events";
import { db } from "~/server/db";

export const performanceEmitter = new EventEmitter();

export function TrackTiming(name: string) {
  return function (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    descriptor.value = async function (...args: unknown[]) {
      const start = Date.now();
      try {
        return await original.apply(this, args);
      } finally {
        const duration = Date.now() - start;
        const metric = await db.performanceMetric.create({
          data: { name, duration },
        });
        performanceEmitter.emit("metric", metric);
      }
    };
  };
}
