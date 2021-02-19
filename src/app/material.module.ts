import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatNativeDateModule,
        MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
        MatToolbarModule, FormsModule, MatCardModule, MatFormFieldModule,
        MatInputModule, MatListModule, MatSelectModule,],
    exports: [MatButtonModule, MatToolbarModule, MatNativeDateModule, FormsModule,
        MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
        MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule,
        MatListModule, MatSelectModule,],
})

export  class  MaterialModule { }
