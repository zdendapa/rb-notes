import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from '../shared/note-model';
import { NotesService } from '../shared/notes-service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {

  notes: Note[];
  private subscriptions = new Subscription();

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  /**
   * Get all notes from server
   */
  getNotes(): void {
    this.subscriptions.add(this.notesService.getNotes().subscribe(notes => this.notes = notes));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
