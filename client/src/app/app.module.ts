import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routes'; //此时的routing针对整个project
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from'@angular/forms'
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
