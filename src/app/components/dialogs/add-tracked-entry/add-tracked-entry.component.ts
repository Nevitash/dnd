import {Component,} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {AddTrackedEntryFormService} from '../../../services/forms/add-tracked-entry-form.service';
import {MatDialogRef} from '@angular/material/dialog';
import {TrackedEntry} from '../../../models/tracked-entry';
import {Character} from '../../../models/character';
import {Attribute} from '../../../models/dto/attribute';

@Component({
  selector: 'app-add-tracked-entry',
  standalone: false,

  templateUrl: './add-tracked-entry.component.html',
  styleUrl: './add-tracked-entry.component.scss'
})
export class AddTrackedEntryComponent {
  form!: FormGroup;
  attributeArray!: FormArray<FormControl<Attribute | null>>;

  constructor(
    protected formService: AddTrackedEntryFormService,
    public dialogRef: MatDialogRef<AddTrackedEntryComponent>
  ) {
    this.form = formService.form;
    this.attributeArray = formService.attributeArray;
  }

  protected readonly AddTrackedEntryFormService = AddTrackedEntryFormService;

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    let name: string = (this.form.controls[this.formService.KEY_NAME] as FormControl<string>).value ?? undefined;
    let attributeArray = this.attributeArray.controls.map(
      (attributeControl: FormControl<Attribute | null>) => {
        let name: string = attributeControl.value!.name;
        let value: number = attributeControl.value!.value;
        let modifier: number = attributeControl.value?.modifier ?? 0;
        return new Attribute(name, value, modifier);
      }
    );
    let character: Character = (this.form.controls[this.formService.KEY_CHARACTER] as FormControl<Character>).value ?? undefined;
    this.dialogRef.close(TrackedEntry.buildWithArgs({name: name, attributes: attributeArray, character: character}));
  }

  trackFunctionAttributes(attribute: FormControl<Attribute | null>) {
    return attribute.value?.name ?? undefined;
  }
}
