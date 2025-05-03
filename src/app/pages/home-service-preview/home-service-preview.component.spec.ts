import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeServicePreviewComponent } from './home-service-preview.component';

describe('HomeServicePreviewComponent', () => {
  let component: HomeServicePreviewComponent;
  let fixture: ComponentFixture<HomeServicePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeServicePreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeServicePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
