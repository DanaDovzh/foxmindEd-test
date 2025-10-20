export const INCIDENT_CATEGORIES = [
  { value: 'Fire', label: 'Пожежа' },
  { value: 'Accident', label: 'ДТП' },
  { value: 'Flood', label: 'Затоплення' },
  { value: 'Gas', label: 'Газ' },
  { value: 'Natural', label: 'Природні' },
  { value: 'Chemical', label: 'Хімічна небезпека' },
  { value: 'Electricity', label: 'Електрика' },
  { value: 'Water', label: 'Водопостачання' },
  { value: 'Infrastructure', label: 'Інфраструктура' },
  { value: 'Construction', label: 'Будівництво' },
  { value: 'Social', label: 'Соціальні події' },
];


export type IncidentCategory = (typeof INCIDENT_CATEGORIES)[number]['value'];
