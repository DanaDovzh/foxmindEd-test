import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IncidentFilters } from '../models/incident.model';


const defaultFilters: IncidentFilters = {
  categories: [],
  priority: undefined,
  dateRange: { from: null, to: null }
};

@Injectable({ providedIn: 'root' })
export class FilterService {
  private filtersSubject = new BehaviorSubject<IncidentFilters>(defaultFilters);
  filters$ = this.filtersSubject.asObservable();

  setFilters(newFilters: IncidentFilters) {
    this.filtersSubject.next(newFilters);
  }

  get currentFilters(): IncidentFilters {
    return this.filtersSubject.getValue();
  }
}
