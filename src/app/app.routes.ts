import { Routes } from '@angular/router';
import { EventsListComponent } from './pages/event-list/events-list.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsListComponent },
  { path: 'events/:id', component: EventDetailsComponent },
];
