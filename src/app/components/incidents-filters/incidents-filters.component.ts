import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { INCIDENT_CATEGORIES } from '../../constants/incident-categories';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-incidents-filters',
  imports: [MatMomentDateModule, CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatRadioModule, ReactiveFormsModule, MatDatepickerModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './incidents-filters.component.html',
  styleUrls: ['./incidents-filters.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
})
export class IncidentsFiltersComponent implements OnInit {
  categoryList = INCIDENT_CATEGORIES;
  viewMode: 'list' | 'map' = 'list';
  incidentsFilterForm: FormGroup = new FormGroup({});

  constructor(private _router: Router, private _route: ActivatedRoute, private _filterService: FilterService) { }
  ngOnInit() {
    this.getViewMode();
    this.incidentsFilterForm = new FormGroup({
      categories: new FormControl([]),
      priority: new FormControl(''),
      dateRange: new FormGroup({
        from: new FormControl<Date | null>(null),
        to: new FormControl<Date | null>(null)
      }),
    });

    if (Object.keys(this._filterService.currentFilters).length !== 0) {
      this.incidentsFilterForm.patchValue(this._filterService.currentFilters);
      this.incidentsFilterForm.markAllAsDirty();
      this.incidentsFilterForm.markAsTouched();
      this.incidentsFilterForm.updateValueAndValidity();
    }

  }

  getViewMode() {
    const child = this._route.firstChild;
    const path = child?.snapshot.routeConfig?.path === 'map' ? 'map' : 'list';
    this.viewMode = path;
  }

  changeViewMode(mode: 'list' | 'map') {
    this.viewMode = mode;
    this._router.navigate(['/incidents', mode], {
      queryParams: this._route.snapshot.queryParams
    });
  }

  applyFilters() {
    this._filterService.setFilters(this.incidentsFilterForm.value);
  }

  resetFilters() {
    this._filterService.setFilters({});
    this.incidentsFilterForm.reset();
  }
}
