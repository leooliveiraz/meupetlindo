import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetAppointmentComponent } from './vet-appointment.component';

describe('VetAppointmentComponent', () => {
  let component: VetAppointmentComponent;
  let fixture: ComponentFixture<VetAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VetAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VetAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
