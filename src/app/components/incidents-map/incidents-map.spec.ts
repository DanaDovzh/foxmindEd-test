import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsMap } from './incidents-map.component';

describe('IncidentsMap', () => {
  let component: IncidentsMap;
  let fixture: ComponentFixture<IncidentsMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
