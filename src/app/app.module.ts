import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';
import { TodosService } from './services/todos.service';
import { TodoPageComponent } from './containers/todo-page/todo-page.component';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { default as reducer } from './reducers';
import { TodosEffects } from './effects/todos.effects';
import { TodoActions } from './actions/todo.actions';
import { FilterActions } from './actions/filter.actions';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoFilterComponent,
    TodoPageComponent,
    TodoAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(TodosEffects)
  ],
  providers: [TodosService, TodoActions, FilterActions],
  bootstrap: [AppComponent]
})
export class AppModule { }
