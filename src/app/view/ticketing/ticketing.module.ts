import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingRoutingModule } from './ticketing-routing/ticketing-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component'
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from './ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { RegisterComponent } from './register/register.component';
import { MailMasterComponent } from './mail-master/mail-master.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    TicketListComponent,
    TicketDetailComponent,
    TicketReportComponent,
    RegisterComponent,
    MailMasterComponent],
  imports: [
    CommonModule,
    TicketingRoutingModule,
    CalendarModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbModule,
    ProgressSpinnerModule,
    PanelModule,
    CardModule,
    ScrollPanelModule,
    InputSwitchModule,
    KeyFilterModule,
    PasswordModule,
    ButtonModule,
    ToastModule
  ],
  providers: [TicketService]
})
export class TicketingModule { }
