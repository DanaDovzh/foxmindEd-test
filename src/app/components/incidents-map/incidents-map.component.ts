import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from '../../models/incident.model';
import { FilterService } from '../../services/filter.service';
import { IncidentsService } from '../../services/incidents.service';
import { IncidentCategoryPipe } from '../../shared/pipes/incident-category.pipe';
declare const L: any;
@Component({
  selector: 'app-incidents-map',
  imports: [DatePipe, IncidentCategoryPipe],
  templateUrl: './incidents-map.component.html',
  styleUrls: ['./incidents-map.component.scss'],
  standalone: true
})
export class IncidentsMapComponent implements OnInit, AfterViewInit {
  viewContainerRef = inject(ViewContainerRef);
  router = inject(Router);
  markerCluster!: any;
  incidentsData: Incident[] = [];
  private map!: L.Map
  options: L.MapOptions = {
    zoom: 8,
    center: L.latLng(50.4501, 30.5234),
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ]
  };

  @ViewChild('popupTemplate') popupTemplate!: TemplateRef<unknown>;

  constructor(private _filterService: FilterService, private _incidentsService: IncidentsService) { }

  ngOnInit() {
    this.subscribeToFilterChanges();
  }

  ngAfterViewInit() {
    this.initMap();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  getIncidents() {
    this._incidentsService.loadData(this._filterService.currentFilters).subscribe(data => {
      this.incidentsData = data;
      this.addMarkers();
    });
  }

  subscribeToFilterChanges() {
    this._filterService.filters$.subscribe(() => {
      this.getIncidents();
    });
  }
  private initMap() {
    this.map = L.map('map', {
      zoom: 13,
      center: L.latLng(50.4501, 30.5234),
      layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }

  addMarkers() {
    if (this.markerCluster) {
      this.map.removeLayer(this.markerCluster);
    }
    this.markerCluster = (window as any).L.markerClusterGroup();
    this.incidentsData.forEach(incident => {
      const customIcon = L.divIcon({
        html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img src="assets/leaflet/marker-icon.png" style="width: 25px; height: 41px;" />
          <span style="font-size: 12px; color: black; margin-top: 4px;">${incident.category}</span>
        </div>
      `,
        iconSize: [25, 55],
        className: ''
      });

      const popupContent = this.viewContainerRef.createEmbeddedView(
        this.popupTemplate, { $implicit: incident }
      );

      const container = document.createElement('div');
      popupContent.rootNodes.forEach(node => container.appendChild(node));
      L.marker([incident.location.lat, incident.location.lng], { alt: incident.category, icon: customIcon })
        .addTo(this.markerCluster)
        .bindPopup(container);
    });

    this.map.addLayer(this.markerCluster);
  }

  openIncident(id: number) {
    this.router.navigate(['/incident', id]);
  }
}
