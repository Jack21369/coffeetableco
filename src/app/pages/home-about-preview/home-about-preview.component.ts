import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-home-about-preview',
  standalone: true,
  imports: [CommonModule, LoadingStateComponent, PreviewHeaderComponent, PrimaryBtnComponent],
  templateUrl: './home-about-preview.component.html',
  styleUrls: ['./home-about-preview.component.css']
})
export class HomeAboutPreviewComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    // Simulate content loading
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
