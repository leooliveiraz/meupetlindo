import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAnimalComponent } from './share-animal.component';

describe('ShareAnimalComponent', () => {
  let component: ShareAnimalComponent;
  let fixture: ComponentFixture<ShareAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
