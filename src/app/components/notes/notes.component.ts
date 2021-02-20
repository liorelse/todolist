import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../models/Note';
import { NoteService } from '../../services/note.service'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  //notes!:Note[];
  noteObs!: Observable<Note[]>;
  showStatusTodo: boolean = true;
  showStatusDone: boolean = true;

  constructor(
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getEnabledStatus() {
    return new Array(
      this.showStatusTodo ? 'todo' : '',
      this.showStatusDone ? 'done' : '',
    )
  }

  statusTodo () {
    this.showStatusTodo = true;
    this.showStatusDone = false;
  }

  statusDone () {
    this.showStatusTodo = false;
    this.showStatusDone = true;
  }

  statusAll () {
    this.showStatusTodo = true;
    this.showStatusDone = true;
  }

  newNote() {
    this.noteService.newNote(1,'');
    this.getNotes();
  }

  getNotes() {
    this.noteObs = this.noteService.getNotesReverse();
    console.log(this.noteObs)
    /* this.noteService.getNoteList().subscribe(noteList => {
      this.notes = noteList
    }); */
  }

}
