import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Note } from '../shared/note-model';
import { NotesService } from '../shared/notes-service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit, OnDestroy {

  note: Note;
  noteReadonly: boolean = true;
  isNew: boolean = false;

  private subscriptions = new Subscription();

  constructor(private route: ActivatedRoute, private notesService: NotesService, private router: Router) { }

  ngOnInit(): void {
    // by id identify if is new note or existing
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0) {
      this.isNew = true;
      this.noteReadonly = false;
      this.note = { id: 0, text: "" };
    } else {
      this.getNote(id);
    }
  }

  /**
   * Get data object of note
   * @param id id of note
   */
  getNote(id: number): void {
    this.subscriptions.add(this.notesService.getNote(id)
      .subscribe(note => this.note = note));
  }

  /**
   * Save new note
   * @param text text of new note
   */
  add(text: string): void {
    if (!text.length) { return; }
    this.note.text = text;
    this.subscriptions.add(this.notesService.addNote(this.note)
      .subscribe(() => this.router.navigate([''])));
  }

  /**
   * Update text of note
   * @param text text of textarea
   */
  save(text: string): void {
    this.note.text = text;
    this.subscriptions.add(this.notesService.updateNote(this.note)
      .subscribe(() => this.router.navigate([''])));
  }

  /**
   * Delete note
   * @param id id of note
   */
  delete(id: number) {
    this.subscriptions.add(this.notesService.deleteNote(id).subscribe(_ => this.router.navigate([''])));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
