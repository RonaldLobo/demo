import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDisplayComponent } from './usuario-display.component';

describe('UsuarioDisplayComponent', () => {
  let component: UsuarioDisplayComponent;
  let fixture: ComponentFixture<UsuarioDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
