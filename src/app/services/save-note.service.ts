import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObservableInput } from 'rxjs';
import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root'
})
export class SaveNoteService {
  notesUrl: string = 'http://localhost:3000/notes';
  dateNow!: number;
  dateEdited!: Date;

  constructor(private http:HttpClient) { }

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

  newNote(formValue: any): ObservableInput<any> {
    formValue.edited = this.getEditedDate()
    formValue.created = formValue.edited
    return this.http.put<Note>(`${this.notesUrl}/${formValue.id}`, formValue)
  }

}