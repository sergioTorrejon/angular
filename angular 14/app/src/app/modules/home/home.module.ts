import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SalesOverviewComponent } from './home-components/sales-overview/sales-overview.component';
import { OurVisiterComponent } from './home-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './home-components/profile/profile.component';
import { ContactsComponent } from './home-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './home-components/activity-timeline/activity-timeline.component';
import { AppMaterialModule } from 'src/app/app-material-module';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    FlexLayoutModule,
    NgApexchartsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [HomeComponent, SalesOverviewComponent, OurVisiterComponent, ProfileComponent, ContactsComponent, ActivityTimelineComponent]
})
export class HomeModule {}
