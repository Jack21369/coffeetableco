import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutPreviewComponent } from './home-about-preview.component';

describe('HomeAboutPreviewComponent', () => {
  let component: HomeAboutPreviewComponent;
  let fixture: ComponentFixture<HomeAboutPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAboutPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAboutPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
