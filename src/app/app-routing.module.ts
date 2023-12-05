import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { MeetingScheduleComponent } from './meeting-schedule/meeting-schedule.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"home", component:DashboardComponent, children: [
    {path:"customer", component:CustomerComponent, children: [
      {path:"meeting-schedule", component:MeetingScheduleComponent}
    ]},
    {path:"meeting-schedule", component:MeetingScheduleComponent}
  ]},

  {path:"logout",component:LoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
