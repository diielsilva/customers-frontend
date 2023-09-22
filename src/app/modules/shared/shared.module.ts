import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PhonePipe } from './pipes/phone.pipe';
import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    MessageComponent,
    LoadingComponent,
    NavbarComponent,
    PaginatorComponent,
    PhonePipe,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    MessageComponent,
    LoadingComponent,
    NavbarComponent,
    PaginatorComponent,
    PhonePipe
  ]
})
export class SharedModule { }
