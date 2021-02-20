import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableInput } from 'rxjs';
import { tap, first } from 'rxjs/operators';
import { Note } from '../models/Note';
import { NotesMeta } from '../models/NotesMeta';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesUrl: string = 'http://localhost:3000/notes';
  nextIdUrl: string = 'http://localhost:3000/next_id';
  dateNow!: number;
  dateEdited!: Date;
  nextId!: number;


  constructor(
    private http: HttpClient) { }

  ngOnInit () {
  }

  getNotesMeta(): void {
    let tempNotesMeta: NotesMeta[] = []
    this.http.get<NotesMeta[]>(this.nextIdUrl)
      .pipe(first())
      .subscribe(notesMeta => {
        tempNotesMeta = notesMeta
        console.log(tempNotesMeta)
        this.nextId = notesMeta[0].next;
        console.log(this.nextId)
    });
  }

  getNotes():Observable<Note[]> {
    this.getNotesMeta()
    console.log(this.nextId);
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNotesReverse():Observable<Note[]> {
    return this.getNotes().pipe(
      tap(results => {
        results.reverse()
      })
    );
  }

  getLists():string[] {
    let tempNotes: Note[] = []
    this.getNotes().subscribe(notes => {
      tempNotes = notes
    });
    let lists: string[] = []
    tempNotes.forEach(note => {
      if (!lists.includes(note.list)) {
        lists.push(note.list)
      }
    });
    return lists;
  }

  getEditedDate(): string {
    this.dateNow = Date.now()
    this.dateEdited = new Date(this.dateNow)
    return this.dateEdited.toISOString()
  }

  autoSave(formValue: any): ObservableInput<any> {
    formValue.edited = this.getEditedDate()
    console.log(formValue);
    return this.http.patch<Note>(`${this.notesUrl}/${formValue.id}`, formValue)
  }

  update(noteValues: any): void {
    noteValues.edited = this.getEditedDate()
    console.log(noteValues);
    this.http.patch<Note>(`${this.notesUrl}/${noteValues.id}`, noteValues)
      .subscribe(
        (val) => {
            console.log("PATCH call successful value returned in body",
                        val);
        },
        response => {
            console.log("PATCH call in error", response);
        },
        () => {
            console.log("The PATCH observable is now completed.");
        });
  }

  setNextId() {
    let newNextID: NotesMeta = {
      id: 0,
      next: this.nextId + 1
    }
    console.log(newNextID)
    this.http.patch<Note>(`${this.nextIdUrl}/0`, newNextID)
      .subscribe(
        (val) => { console.log(val); },
        response => { console.log(response); },
        () => { this.nextId = newNextID.next; });
  }

  newNote(owner: number, list: string) {
    let newNote: Note = new Note();
    newNote.id = this.nextId;
    newNote.title = '';
    newNote.body = '';
    newNote.media = '';
    newNote.status = 'todo';
    newNote.edited = this.getEditedDate();
    newNote.created = newNote.edited;
    newNote.deleted = false;
    newNote.list = list;
    newNote.owner = owner;
    this.setNextId()
    this.http.post<Note>(`${this.notesUrl}`, newNote).subscribe(
      (val) => {
          console.log("PATCH call successful value returned in body",
                      val);
      },
      response => {
          console.log("PATCH call in error", response);
      },
      () => {
          console.log("The PATCH observable is now completed.");
      });
  }
}
