import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

type EventUpdatedPayload = {
  id: string;
  attendees: number;
  capacity: number;
};

@Injectable({ providedIn: 'root' })
export class RealtimeService {
  private socket: Socket | null = null;

  connect(): void {
    if (this.socket) return;

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  joinEvent(eventId: string): void {
    this.connect();
    this.socket?.emit('join:event', eventId);
  }

  leaveEvent(eventId: string): void {
    this.socket?.emit('leave:event', eventId);
  }

  onEventUpdated(): Observable<EventUpdatedPayload> {
    this.connect();

    return new Observable<EventUpdatedPayload>((subscriber) => {
      const handler = (payload: EventUpdatedPayload) => subscriber.next(payload);

      this.socket?.on('event:updated', handler);

      return () => {
        this.socket?.off('event:updated', handler);
      };
    });
  }
}
