import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Incident } from '../../models/incident.model';
import { FilterService } from '../../services/filter.service';
import { IncidentsService } from '../../services/incidents.service';
import { IncidentCategoryPipe } from "../../shared/pipes/incident-category.pipe";

@Component({
  selector: 'app-incidents-list',
  imports: [MatSort, MatSortModule, MatTableModule, MatPaginatorModule, DatePipe, IncidentCategoryPipe, MatButtonModule, MatIconModule],
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss'],
  standalone: true
})
export class IncidentsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  incidentsData: Incident[] = [];
  pageSizeOptions: number[] = [5, 10, 20];
  pageSize = 5;
  dataSource = new MatTableDataSource(this.incidentsData);
  displayedColumns: string[] = ['position', 'title', 'category', 'severity', 'createdAt', "actions"];

  constructor(private _filterService: FilterService, private _liveAnnouncer: LiveAnnouncer, private _incidentsService: IncidentsService, private _router: Router) { }
  ngOnInit() {
    this.subscribeToFilterChanges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getIncidents() {
    this._incidentsService.loadData(this._filterService.currentFilters).subscribe(data => {
      this.incidentsData = data;
      this.dataSource.data = this.incidentsData;
    });
  }

  subscribeToFilterChanges() {
    this._filterService.filters$.subscribe(() => {
      this.getIncidents();
    });
  }

  openIncident(id: number) {
    this._router.navigate(['/incident', id]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
