import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  catchError,
  delay,
  map,
  Observable,
  of,
} from 'rxjs';
import { Incident, IncidentFilters } from '../models/incident.model';

@Injectable({ providedIn: 'root' })
export class IncidentsService {
  private readonly dataUrl = 'assets/incidents.json';

  http = inject(HttpClient);

  loadData(filters?: IncidentFilters): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.dataUrl).pipe(
      delay(300),
      map(data => this.applyFilters(data, filters)),
      catchError(err => {
        console.error('Помилка завантаження incidents.json', err);
        return of([]);
      })
    );
  }

  private applyFilters(data: Incident[], filters?: IncidentFilters): Incident[] {
    if (!filters) return data;

    return data.filter(incident => {
      const matchesCategory =
        !filters.categories?.length || filters.categories.includes(incident.category);

      const matchesPriority =
        !filters.priority || incident.severity === +filters.priority;

      const incidentDate = new Date(incident.createdAt);
      const matchesDate =
        (!filters.dateRange?.from || incidentDate >= new Date(filters.dateRange.from)) &&
        (!filters.dateRange?.to || incidentDate <= new Date(filters.dateRange.to));

      return matchesCategory && matchesPriority && matchesDate;
    });
  }


  getById(id: number): Observable<Incident | undefined> {
    return this.loadData().pipe(
      map((incidents) => incidents.find((incident) => incident.id === id))
    );
  }
}
