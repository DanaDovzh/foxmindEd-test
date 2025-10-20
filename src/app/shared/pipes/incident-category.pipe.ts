import { Pipe, PipeTransform } from '@angular/core';
import { INCIDENT_CATEGORIES } from '../../constants/incident-categories';

@Pipe({
  name: 'categoryLabel',
  standalone: true
})
export class IncidentCategoryPipe implements PipeTransform {
  transform(value: string): string {
    const category = INCIDENT_CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : value;
  }
}
