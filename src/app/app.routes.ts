import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ServicesComponent } from './pages/services/services.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GeneralInquiryComponent } from './pages/forms/general-inquiry/general-inquiry.component';
import { EventBookingComponent } from './pages/forms/event-booking/event-booking.component';
import { ArtistSubmissionComponent } from './pages/forms/artist-submission/artist-submission.component';
import { JoinTeamComponent } from './pages/forms/join-team/join-team.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { 
    path: 'services', 
    children: [
      { path: '', component: ServicesComponent },
      { path: 'general-inquiry', component: GeneralInquiryComponent },
      { path: 'event-booking', component: EventBookingComponent },
      { path: 'artist-submission', component: ArtistSubmissionComponent },
      { path: 'join-team', component: JoinTeamComponent }
    ]
  },
  { path: 'gallery', component: GalleryComponent },
  { path: '**', redirectTo: '' }
];
