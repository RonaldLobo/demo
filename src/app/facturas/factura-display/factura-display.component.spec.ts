import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDisplayComponent } from './factura-display.component';

describe('FacturaDisplayComponent', () => {
  let component: FacturaDisplayComponent;
  let fixture: ComponentFixture<FacturaDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
