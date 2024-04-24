import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe],
  entryComponents: [DateFormatPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    DateFormatPipe,
  ],
})
export class SharedModule {}
