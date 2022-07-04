import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSharedAnimalComponent } from './add-shared-animal.component';

describe('AddSharedAnimalComponent', () => {
  let component: AddSharedAnimalComponent;
  let fixture: ComponentFixture<AddSharedAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSharedAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSharedAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
