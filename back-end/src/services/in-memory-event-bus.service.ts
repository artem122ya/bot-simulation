import { EventEmitter } from "events";
import { randomUUID } from "node:crypto";
import { EventName, EventPayloadMap } from "../events/event.types";

export interface Subscription {
  id: string;
  event: string;
  handler: (data: any) => Promise<void> | void;
}

export class InMemoryEventBus {
  private eventEmitter: EventEmitter;
  private subscriptions: Map<string, Subscription[]>;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.subscriptions = new Map();
  }

  subscribe<T extends EventName>(
    event: T,
    handler: (
      data: EventPayloadMap[T] & { _meta: { timestamp: string; eventName: T } },
    ) => Promise<void> | void,
  ): string {
    const subscriptionId = randomUUID();

    if (!this.subscriptions.has(event)) {
      this.subscriptions.set(event, []);
    }

    const subscription: Subscription = { id: subscriptionId, event, handler };
    this.subscriptions.get(event)!.push(subscription);

    this.eventEmitter.on(event, async (data: EventPayloadMap[T]) => {
      try {
        await handler(data as any);
      } catch (error) {
        console.error(`Error in event handler for '${event}':`, error);
      }
    });

    return subscriptionId;
  }

  unsubscribe(subscriptionId: string): boolean {
    for (const [event, subs] of this.subscriptions.entries()) {
      const index = subs.findIndex((sub) => sub.id === subscriptionId);

      if (index !== -1) {
        const [removed] = subs.splice(index, 1);
        this.eventEmitter.removeListener(event, removed.handler);

        console.log(
          `Unsubscribed from event '${event}', subscription ID: ${subscriptionId}`,
        );

        if (subs.length === 0) {
          this.subscriptions.delete(event);
        }

        return true;
      }
    }

    return false;
  }

  async publish<T extends EventName>(
    event: T,
    data: EventPayloadMap[T],
  ): Promise<void> {
    const eventData = {
      ...data,
      _meta: {
        timestamp: new Date().toISOString(),
        eventName: event,
      },
    };

    try {
      this.eventEmitter.emit(event, eventData);
    } catch (error) {
      console.error(`Error publishing event '${event}':`, error);
      throw error;
    }
  }
  getSubscriberCount(event: string): number {
    return this.eventEmitter.listenerCount(event);
  }

  getSubscriptions(): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const [event, subs] of this.subscriptions.entries()) {
      result[event] = subs.map((sub) => sub.id);
    }

    return result;
  }

  clearAllSubscriptions(): void {
    this.eventEmitter.removeAllListeners();
    this.subscriptions.clear();
  }
}
