import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ListsService } from './services/lists.service';
import { BoardComponent } from './components/board/board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {DndModule} from 'ng2-dnd';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



const appRoutes = [
  {path: '', component: DashboardComponent},
  {path: 'Board', component: BoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    DndModule.forRoot(),
    NgbModule.forRoot()

  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
