import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyDatepickerComponent } from './monthly-datepicker.component';

describe('MonthlyDatepickerComponent', () => {
  let component: MonthlyDatepickerComponent;
  let fixture: ComponentFixture<MonthlyDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyDatepickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
