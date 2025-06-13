import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewHeaderComponent } from './preview-header.component';

describe('PreviewHeaderComponent', () => {
  let component: PreviewHeaderComponent;
  let fixture: ComponentFixture<PreviewHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
