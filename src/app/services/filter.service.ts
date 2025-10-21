import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IncidentFilters } from '../models/incident.model';


@Injectable({ providedIn: 'root' })
export class FilterService {
  private filtersSubject = new BehaviorSubject<IncidentFilters>({});
  filters$ = this.filtersSubject.asObservable();

  setFilters(newFilters: IncidentFilters) {
    this.filtersSubject.next(newFilters);
  }

  get currentFilters(): IncidentFilters {
    return this.filtersSubject.getValue();
  }
}
