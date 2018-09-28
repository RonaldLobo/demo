import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDisplayComponent } from './producto-display.component';

describe('ProductoDisplayComponent', () => {
  let component: ProductoDisplayComponent;
  let fixture: ComponentFixture<ProductoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
