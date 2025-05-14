import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingStateComponent } from '../../components/loading-state/loading-state.component';

@Component({
  selector: 'app-home-about-preview',
  standalone: true,
  imports: [CommonModule, LoadingStateComponent],
  templateUrl: './home-about-preview.component.html',
  styleUrls: ['./home-about-preview.component.css']
})
export class HomeAboutPreviewComponent implements OnInit {
  isLoading = true;
  values = [
    {
      title: 'Quality',
      description: 'We source the finest ingredients and maintain strict quality standards in every cup we serve.'
    },
    {
      title: 'Community',
      description: 'Building meaningful connections through shared experiences and genuine hospitality.'
    },
    {
      title: 'Innovation',
      description: 'Constantly evolving our menu and services to exceed expectations and create memorable moments.'
    }
  ];

  ngOnInit() {
    // Simulate content loading
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}
