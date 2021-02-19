import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/Note';
import { NoteService } from '../../services/note.service'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes!:Note[];

  constructor(
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  newNote() {
    this.noteService.newNote(1,'');
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotesReverse().subscribe(notes => {
      this.notes = notes
    });
  }

}
