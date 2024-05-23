import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRoleRouteMappingComponent } from './modify-role-route-mapping.component';

describe('ModifyRoleRouteMappingComponent', () => {
  let component: ModifyRoleRouteMappingComponent;
  let fixture: ComponentFixture<ModifyRoleRouteMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyRoleRouteMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyRoleRouteMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
