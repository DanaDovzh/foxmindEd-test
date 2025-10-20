import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsFiltersComponent } from './incidents-filters.component';

describe('IncidentsFiltersComponent', () => {
  let component: IncidentsFiltersComponent;
  let fixture: ComponentFixture<IncidentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
