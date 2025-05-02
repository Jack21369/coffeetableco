import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-btn',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.css'
})
export class PrimaryBtnComponent {
  @Input() label: string = '';
  @Input() routerLink?: string | any[];
  @Input() href?: string;
  @Input() target?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
