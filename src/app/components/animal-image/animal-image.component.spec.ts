import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalImageComponent } from './animal-image.component';

describe('AnimalImageComponent', () => {
  let component: AnimalImageComponent;
  let fixture: ComponentFixture<AnimalImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
