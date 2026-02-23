import { Component, DestroyRef, inject, signal, Signal, WritableSignal } from '@angular/core';
import { EventCategory, EventFilters, EventItem } from '../../../core/models';
import { EventsService } from '../../../core/service.service';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
  private destroyRef = inject(DestroyRef);

  events = signal<EventItem[]>([]);
  loading: boolean = false;
  error = signal<string | null>(null);
  toast = signal<string | null>(null);

  // filters
  category: EventCategory | '' = '';
  dateFrom: string = '';
  dateTo: string = ''
  q: string = '';

  constructor(private eventService: EventsService, private router: Router) { }

  ngOnInit(): void {
    const msg = history.state?.toast as string | undefined;
    if (msg) {
      this.toast.set(msg);

      // limpia el state para que no reaparezca al refrescar
      history.replaceState({}, '');

      // auto-ocultar a los 3s
      setTimeout(() => this.toast.set(null), 3000);
    }

    this.getAllEvents();
  }

  getAllEvents() {
    this.loading = true;
    this.error.set(null);

    const filters: EventFilters = {
      category: this.category || undefined,
      dateFrom: this.dateFrom || undefined,
      dateTo: this.dateTo || undefined,
      q: this.q?.trim() || undefined,
    };

    this.eventService.getEvents(filters).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (events) => {
        this.events.set(events);
        this.loading = false;
      },
      error: (err) => {
        this.error.set('Error al cargar eventos');
        this.loading = false;
      }
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/events', id]);
  }

  clear(): void {
    this.category = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.q = '';
    this.getAllEvents();
  }

}
