import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { TicketReportComponent } from '../ticket-report/ticket-report.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from 'src/app/Common/auth.guard';
import { MailMasterComponent } from '../mail-master/mail-master.component';

const routes: Routes = [
  {
    path: 'TicketList', component: TicketListComponent, canActivate: [AuthGuard], data: {
      title: 'Tickets'
    }
  },
  {
    path: 'TicketDetails/:id', component: TicketDetailComponent, canActivate: [AuthGuard], data: {
      title: 'Ticket Details'
    }
  },
  {
    path: 'EditTicketDetails/:id', component: TicketDetailComponent, data: {
      title: 'Ticket Details'
    }
  },
  {
    path: 'users', component: RegisterComponent, canActivate: [AuthGuard], data: {
      title: 'Users'
    }
  },
  {
    path: 'Ticket-Report', component: TicketReportComponent, canActivate: [AuthGuard], data: {
      title: 'Ticket-Report'
    }
  },
  {
    path: 'Mail-Master', component: MailMasterComponent, canActivate: [AuthGuard], data: {
      title: 'Ticket-Report'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketingRoutingModule { }
