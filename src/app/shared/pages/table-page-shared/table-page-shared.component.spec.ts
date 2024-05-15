import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageSharedComponent } from './table-page-shared.component';

describe('TablePageSharedComponent', () => {
  let component: TablePageSharedComponent;
  let fixture: ComponentFixture<TablePageSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePageSharedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablePageSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
