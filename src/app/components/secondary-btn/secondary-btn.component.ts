import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-btn',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './secondary-btn.component.html',
  styleUrl: './secondary-btn.component.css'
})
export class SecondaryBtnComponent {
  @Input() label: string = '';
  @Input() routerLink?: string | any[];
  @Input() href?: string;
  @Input() target?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
