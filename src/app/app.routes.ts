import { Routes } from '@angular/router';
import { IncidentsLayoutComponent } from './components/incidents-layout/incidents-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'incidents/list',
    pathMatch: 'full'
  },
  {
    path: 'incidents',
    component: IncidentsLayoutComponent,
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./components/incidents-list/incidents-list.component').then(m => m.IncidentsListComponent)
      },
      {
        path: 'map',
        loadComponent: () =>
          import('./components/incidents-map/incidents-map.component').then(m => m.IncidentsMapComponent)
      }
    ]
  },
  {
    path: 'incident/:id',
    loadComponent: () =>
      import('./components/incident-detail/incident-detail.component').then(m => m.IncidentDetailComponent)
  }
];
