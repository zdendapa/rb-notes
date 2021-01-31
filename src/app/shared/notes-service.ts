import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Note } from "./note-model";

@Injectable()
export class NotesService {

  //TODO from config
  private notesUrl = 'api/notes';  // URL to web api
  private notes: Note[];

  // show spinner
  loading = new Subject<boolean>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET all notes */
  getNotes(): Observable<Note[]> {
    this.loading.next(true);
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(notes => { this.notes = notes; this.loading.next(false) }),
        catchError(this.handleError<Note[]>('getNotes', []))
      );
  }

  /** GET the note by id */
  getNote(id: number): Observable<Note> {
    this.loading.next(true);
    const url = `${this.notesUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap(_ => this.loading.next(false)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }

  /** POST new note */
  addNote(note: Note): Observable<Note> {
    this.loading.next(true);
    // Simply generate new id
    note.id = this.notes.length ? this.notes[this.notes.length - 1].id + 1 : 1;
    return this.http.post<Note>(this.notesUrl, note, this.httpOptions).pipe(
      tap((newNote: Note) => this.loading.next(false)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

  /** DELETE the note from the server */
  deleteNote(id: number): Observable<Note> {
    this.loading.next(true);
    const url = `${this.notesUrl}/${id}`;
    return this.http.delete<Note>(url, this.httpOptions).pipe(
      tap(_ => this.loading.next(false)),
      catchError(this.handleError<Note>('deleteNote'))
    );
  }

  /** PUT update the note on the server */
  updateNote(note: Note): Observable<any> {
    this.loading.next(true);
    return this.http.put(this.notesUrl, note, this.httpOptions).pipe(
      tap(_ => this.loading.next(false))
      , catchError(this.handleError<Note>('updateNote'))
    );
  }

  /**
     * Handle Http operation that failed.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Disable spinner
      this.loading.next(false);

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
