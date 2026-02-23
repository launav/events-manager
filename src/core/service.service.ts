import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventItem } from './models';
import { environment } from '../environment/enviroment';

@Injectable({ providedIn: 'root' })
export class EventsService {

  private readonly baseUrl = `${environment.baseUrl}${environment.events}`;

  constructor(private http: HttpClient) { }

  getEvents(filter?: { category?: string; dateFrom?: string; dateTo?: string; q?: string }): Observable<EventItem[]> {
    let params = new HttpParams();

    if (filter?.category) params = params.set('category', filter.category);
    if (filter?.dateFrom) params = params.set('dateFrom', filter.dateFrom);
    if (filter?.dateTo) params = params.set('dateTo', filter.dateTo);
    if (filter?.q) params = params.set('q', filter.q);

    return this.http.get<EventItem[]>(this.baseUrl, { params });
  }

  getEventById(id: string): Observable<EventItem> {
    return this.http.get<EventItem>(`${this.baseUrl}/${id}`);
  }

  register(id: string): Observable<EventItem> {
    return this.http.post<EventItem>(`${this.baseUrl}/${id}/register`, {});
  }

}
