import {Component,} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AddTrackedEntryFormService} from '../../../services/forms/add-tracked-entry-form.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TrackedEntry} from '../../../models/tracked-entry';
import {Character} from '../../../models/character';

@Component({
  selector: 'app-add-tracked-entry',
  standalone: false,

  templateUrl: './add-tracked-entry.component.html',
  styleUrl: './add-tracked-entry.component.css'
})
export class AddTrackedEntryComponent {
  form!: FormGroup;

  constructor(
    protected formService: AddTrackedEntryFormService,
              public dialogRef: MatDialogRef<AddTrackedEntryComponent>
  ) {
    this.form = formService.form;
  }

  protected readonly AddTrackedEntryFormService = AddTrackedEntryFormService;

  onSubmit() {
    if(this.form.invalid){
      return;
    }
    let name: string = (this.form.controls[this.formService.KEY_NAME] as FormControl<string>).value ?? undefined;
    let initiative: number = (this.form.controls[this.formService.KEY_INITIATIVE] as FormControl<number>).value ?? undefined;
    let character: Character = (this.form.controls[this.formService.KEY_CHARACTER] as FormControl<Character>).value ?? undefined;
    this.dialogRef.close(TrackedEntry.buildWithArgs({name: name, initiative: initiative, character: character}));
  }
}
