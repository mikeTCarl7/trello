import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { Ng2DragDropModule } from 'ng2-drag-drop';
import { ListsService } from './services/lists.service';
import { BoardComponent } from './components/board/board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {DndModule} from 'ng2-dnd';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NewListComponent } from './components/new-list/new-list.component';
import { EditAndDeleteCardComponent } from './components/edit-and-delete-card/edit-and-delete-card.component';
// import {MaterialModule} from '@angular/material';
// import {PopupModule} from 'ng2-opd-popup';
// import { LayoutModule } from 'ng2-flex-layout';

const appRoutes = [
  {path: '', component: DashboardComponent},
  {path: 'Board', component: BoardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DashboardComponent,
    NavbarComponent,
    NewListComponent,
    EditAndDeleteCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    // MaterialModule,
    // LayoutModule,
    Ng2DragDropModule.forRoot(),
    DndModule.forRoot(),
    NgbModule.forRoot()

    // PopupModule.forRoot()

  ],
  providers: [ListsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
