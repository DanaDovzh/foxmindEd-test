import { DatePipe, Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Incident } from '../../models/incident.model';
import { IncidentsService } from '../../services/incidents.service';
import { IncidentCategoryPipe } from '../../shared/pipes/incident-category.pipe';

@Component({
  selector: 'app-incident-detail',
  imports: [MatCardModule, IncidentCategoryPipe, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.scss'],
  standalone: true
})
export class IncidentDetailComponent implements OnInit, AfterViewInit {
  incidentId: number | null = null;
  currentIncident: Incident = {} as Incident;
  private map!: L.Map
  options: L.MapOptions = {
    zoom: 13,
    layers: [
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ]
  };
  constructor(private _route: ActivatedRoute, private _incidentsService: IncidentsService, private _location: Location) { }

  ngOnInit() {
    this.incidentId = this._route.snapshot.paramMap.get('id') ? Number(this._route.snapshot.paramMap.get('id')) : null;

    if (this.incidentId) {
      this.getIncidentDetails();
    }
  }

  ngAfterViewInit() {
    this.initMap();
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  getIncidentDetails() {
    this._incidentsService.getById(this.incidentId as number).subscribe(incident => {
      if (!incident) {
        return;
      }
      this.currentIncident = incident;
      this.addMarker();
    });
  }

  initMap() {
    this.map = L.map('mapIncident', {
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

  addMarker() {
    if (!this.currentIncident.location) {
      return;
    }
    const customIcon = L.divIcon({
      html: `
              <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="assets/leaflet/marker-icon-detail.svg" style="width: 25px; height: 41px;" />
              </div>
            `,
      iconSize: [25, 55],
      className: ''
    });
    const marker = L.marker([this.currentIncident.location.lat, this.currentIncident.location.lng], { icon: customIcon });
    marker.addTo(this.map);
    this.map.setView([this.currentIncident.location.lat, this.currentIncident.location.lng], 13);
  }

  goBack() {
   this._location.back();
  }
}
