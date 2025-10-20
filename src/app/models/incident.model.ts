import { IncidentCategory } from "../constants/incident-categories";

export interface Incident {
  id: number;
  title: string;
  category: IncidentCategory;
  severity: number;
  createdAt: string;
  location: {
    lat: number;
    lng: number;
  };
  description: string;
}

export interface IncidentFilters {
  categories?: IncidentCategory[];
  priority?: number;
  dateRange?: {
    from?: Date | null;
    to?: Date | null;
  };
}
