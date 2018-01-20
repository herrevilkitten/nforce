import { EventEmitter } from "events";

export interface StreamingClientSubscribeOptions {
    topic: string;
    isSystem?: boolean;
    isEvent?: boolean;
}

export class StreamingClient extends EventEmitter {
    subscribe(options: StreamingClientSubscribeOptions): StreamingSubscription;

    disconnect(): void;
}

export class StreamingSubscription extends EventEmitter {
    cancel(): void;
}
