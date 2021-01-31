import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent},
  { path: 'note/:id', loadChildren: () => import('./note/note.module').then(m => m.NoteModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
