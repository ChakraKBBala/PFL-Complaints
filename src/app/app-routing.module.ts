import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './view/default-component/default-component.component';
import { LoginComponent } from './landing/login/login.component';
import { LogoutGuard } from './Common/logout.guard';

const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' },
{
  path: 'login', component: LoginComponent, canActivate: [LogoutGuard]
},
{
  path: 'PFL', component: DefaultComponent, data: {
    title: 'Home'
  },
  children: [
    { path: '', redirectTo: 'Tickets', pathMatch: 'full' },
    { path: 'Tickets', loadChildren: () => import('./view/ticketing/ticketing.module').then(mod => mod.TicketingModule) }
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
