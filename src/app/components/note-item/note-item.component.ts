import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Note } from 'src/app/models/Note';
import { NoteService } from '../../services/note.service';
import { Subject } from 'rxjs';
import { switchMap, debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note!: Note;
  @ViewChild('btnDel') btnDel!: ElementRef;
  @ViewChild('btnDone') btnDone!: ElementRef;

  cardForm!: FormGroup;
  idControl!: FormControl;
  titleControl!: FormControl;
  bodyControl!: FormControl;
  isValid!: boolean;
  status!: string;

  private unsubscribe = new Subject<void>()

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.isValid = this.cardForm.valid;

  }

  initForm() {
    //this.idControl = new FormControl(this.note.id),
    this.titleControl = new FormControl(this.note.title ? this.note.title : '',
      [Validators.required, Validators.maxLength(30)]);
    this.bodyControl = new FormControl(this.note.body ? this.note.body : '',
      [Validators.maxLength(250)]);
    this.cardForm = this.fb.group({
      id: this.note.id,
      title: this.titleControl,
      body: this.bodyControl,
      //media: this.note.media,
      //status: this.note.status,
      //created: this.note.created,
      //edited: this.note.edited,
      //deleted: this.note.deleted,
      //list: this.note.list,
      //owner: this.note.owner,
    });
    this.cardForm.valueChanges
      .pipe(
        debounceTime(2500),
        switchMap(formValue => this.noteService.autoSave(formValue)),
        takeUntil(this.unsubscribe)
    )
    .subscribe(
      () => console.log("Saved")
      //saveResult =>  ... handle successful save ...,
      //err => ... handle save error ...
    );
  }

  ngAfterViewInit() {
    this.setBtnDone(this.note.status);
  }

  ngOnDestroy() {
    this.unsubscribe.next()
  }

  setClasses():object {
    let classes = {
      note: true,
      'is-deleted': this.note.deleted,
    }
    return classes
  }

  setBtnDone(status: string = 'todo') {
    const statusText = new Map([
      ['todo', 'Done'],
      ['done', 'Undo'],
    ]);
    let newLabel = statusText.get(status) || statusText.get('todo')
    this.btnDone.nativeElement.innerHTML = newLabel;
  }

  onDone(note:Note) {
    if (note.status == 'todo') {
      note.status = 'done';
    } else if (note.status == 'done') {
      note.status = 'todo';
    }
    this.setBtnDone(note.status);
    this.noteService.update(note)
  }

  onDelete(note:Note) {
    note.deleted = !note.deleted
    this.btnDel.nativeElement.innerHTML = note.deleted ? 'Restore' : 'Remove';
    this.noteService.update(note)
  }

}
