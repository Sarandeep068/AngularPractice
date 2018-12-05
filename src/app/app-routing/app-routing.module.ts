import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { WelcomeComponent } from '../home/welcome.component';

const AppRoutes :Route[] = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
