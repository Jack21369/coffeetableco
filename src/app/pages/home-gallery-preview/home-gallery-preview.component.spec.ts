import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGalleryPreviewComponent } from './home-gallery-preview.component';

describe('HomeGalleryPreviewComponent', () => {
  let component: HomeGalleryPreviewComponent;
  let fixture: ComponentFixture<HomeGalleryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGalleryPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGalleryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
