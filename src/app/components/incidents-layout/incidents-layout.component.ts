import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IncidentsFiltersComponent } from '../incidents-filters/incidents-filters.component';

@Component({
  selector: 'app-incidents-layout',
  imports: [RouterOutlet, IncidentsFiltersComponent],
  templateUrl: './incidents-layout.component.html',
  styleUrl: './incidents-layout.component.scss'
})
export class IncidentsLayoutComponent {

}
