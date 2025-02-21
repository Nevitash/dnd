import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AddTrackedEntryFormService} from '../../../services/forms/add-tracked-entry-form.service';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {TrackedEntry} from '../../../models/tracked-entry';
import {Character} from '../../../models/character';
import {Attribute} from '../../../models/dto/attribute';
import {TrackedAttribute} from '../../../enums/tracked-attribute';
import {AttributeWithModifierComponent} from '../../inputs/attribute-with-modifier/attribute-with-modifier.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {ImageUploadComponent} from '../../inputs/image-upload/image-upload.component';
import {MatIcon} from '@angular/material/icon';
import {NgIconsModule} from '@ng-icons/core';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-tracked-entry',
  standalone: true,

  templateUrl: './add-tracked-entry.component.html',
  imports: [
    ReactiveFormsModule,
    AttributeWithModifierComponent,
    MatLabel,
    MatDialogContent,
    MatFormField,
    ImageUploadComponent,
    MatIcon,
    NgIconsModule,
    MatInput,
    MatButton,
    MatDialogTitle
  ],
  styleUrl: './add-tracked-entry.component.scss'
})
export class AddTrackedEntryComponent {
  form!: FormGroup;
  attributeArray!: FormArray<FormControl<Attribute | null>>;
  protected _rollableAttributes: string[] = [
    TrackedAttribute.INITIATIVE.valueOf()
  ]

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
    let multiple: number = (this.form.controls[this.formService.KEY_MULTIPLIER] as FormControl<number>).value ?? 1;
    let attributeArray = this.attributeArray.controls.map(
      (attributeControl: FormControl<Attribute | null>) => {
        let name: string = attributeControl.value!.name;
        let value: number = attributeControl.value!.value;
        let modifier: number = attributeControl.value?.modifier ?? 0;
        return new Attribute(name, value, modifier);
      }
    );
    let character: Character = (this.form.controls[this.formService.KEY_CHARACTER] as FormControl<Character>).value ?? undefined;
    let image: File = (this.form.controls[this.formService.KEY_IMAGE] as FormControl<File>).value ?? undefined;
    let trackedEntries: TrackedEntry[] = [];
    for (let i = 0; i < multiple; i++) {
      trackedEntries.push(
        TrackedEntry.buildWithArgs({
          name: name,
          attributes: attributeArray,
          character: character,
          image: image
        })
      )
    }
    this.dialogRef.close(trackedEntries);
    this.formService.resetForm();
  }

  isRollable(attribute: FormControl<Attribute | null>): boolean {
    if(!attribute.value){
      return false;
    }
    return (this._rollableAttributes.includes(attribute.value!.name));
  }
}
