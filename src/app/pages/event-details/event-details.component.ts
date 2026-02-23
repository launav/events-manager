import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventItem } from '../../../core/models';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../core/service.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent {
  private destroyRef = inject(DestroyRef);

  event = signal<EventItem | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  registering = signal(false);

  private id: string;

  constructor(private route: ActivatedRoute, private eventsService: EventsService, private location: Location, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.eventsService.getEventById(this.id)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (ev) => this.event.set(ev),
        error: () => this.error.set('No se pudo cargar el evento.'),
        complete: () => this.loading.set(false),
      });
  }

 register(): void {
  const ev = this.event();
  if (!ev) return;

  if (ev.attendees >= ev.capacity) {
    this.error.set('Este evento está completo.');
    return;
  }

  this.registering.set(true);
  this.error.set(null);

  this.eventsService.register(this.id)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.router.navigate(['/events'], {
          state: { toast: 'Te has inscrito correctamente.' }
        });
      },
      error: (err) => {
        // Si el backend responde 409 FULL, podemos afinar el mensaje:
        if (err?.status === 409) this.error.set('Este evento está completo.');
        else this.error.set('No se pudo registrar la inscripción.');
        this.registering.set(false);
      },
      complete: () => this.registering.set(false),
    });
}
  goBack(): void {
    this.location.back();
  }
}
