import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteRoleComponent } from './route-role.component';

describe('RouteRoleComponent', () => {
  let component: RouteRoleComponent;
  let fixture: ComponentFixture<RouteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
