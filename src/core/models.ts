export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  location: string;
  attendees: number;
  capacity: number;
}

export type EventCategory = 'Taller' | 'Conferencia' | 'Networking' | 'Concierto';

export interface EventFilters {
  category?: EventCategory;
  dateFrom?: string;   // "YYYY-MM-DD"
  dateTo?: string;     // "YYYY-MM-DD"
  q?: string;
}
