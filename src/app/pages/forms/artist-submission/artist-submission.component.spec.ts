import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSubmissionComponent } from './artist-submission.component';

describe('ArtistSubmissionComponent', () => {
  let component: ArtistSubmissionComponent;
  let fixture: ComponentFixture<ArtistSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistSubmissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
