import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMenuPreviewComponent } from './home-menu-preview.component';

describe('HomeMenuPreviewComponent', () => {
  let component: HomeMenuPreviewComponent;
  let fixture: ComponentFixture<HomeMenuPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMenuPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMenuPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
