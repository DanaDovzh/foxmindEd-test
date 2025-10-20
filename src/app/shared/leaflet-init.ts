import * as L from 'leaflet';
import 'leaflet.markercluster';
if (!(window as any).L) {
  (window as any).L = L;
}

export { L };
