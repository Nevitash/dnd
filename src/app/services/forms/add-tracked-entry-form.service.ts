import {Injectable} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, Validators} from '@angular/forms';
import {Character} from '../../models/character';
import {TrackedAttribute} from '../../enums/tracked-attribute';
import {Attribute} from '../../models/dto/attribute';

@Injectable({
  providedIn: 'root'
})
export class AddTrackedEntryFormService {
  public readonly KEY_NAME = "name";
  public readonly KEY_STATS = "stats";
  public readonly KEY_CHARACTER = "character";
  public readonly KEY_IMAGE = "image";
  public readonly KEY_MULTIPLIER = "multiplier";
  private readonly _attributesWithMod: Array<string> = [
    TrackedAttribute.INITIATIVE.valueOf()
  ];
  private readonly _attributesWithoutMod: Array<string> = [
    TrackedAttribute.HP.valueOf(),
    TrackedAttribute.AC.valueOf(),

  ];

  private _form!: FormGroup;
  private _attributeArray!: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this.assignForm(this.buildForm())
  }

  private buildForm(): FormGroup {
    let statsArray: FormArray = this.formBuilder.array([]);
    let form: FormGroup = this.formBuilder.group({
      [this.KEY_NAME]: new FormControl<string>("", [Validators.required]),
      [this.KEY_CHARACTER]: new FormControl<Character | undefined>(undefined, []),
      [this.KEY_IMAGE]: new FormControl<File | undefined>(undefined, []),
      [this.KEY_STATS]: statsArray,
      [this.KEY_MULTIPLIER]: new FormControl<number>(1, [Validators.required])
    });
    for (const attributeId in Object.keys(this._attributesWithMod)) {
      statsArray.push(this.createStatFormControls(this._attributesWithMod[attributeId], 10, 0), {emitEvent: false});
    }
    for (const attributeId in Object.keys(this._attributesWithoutMod)) {
      statsArray.push(this.createStatFormControls(this._attributesWithoutMod[attributeId], 10), {emitEvent: false});
    }

    return form;
  }

  private createStatFormControls(attributeName: string, value: number, modifier?: number): FormControl<Attribute | null> {
    let attribute: Attribute = new Attribute(attributeName, value, modifier);
    return new FormControl<Attribute>(attribute, []);
  }

  get form(): FormGroup {
    return this._form;
  }

  get attributeArray(): FormArray<FormControl<Attribute | null>> {
    return this._attributeArray;
  }

  set attributeArray(value: FormArray<FormControl<Attribute | null>>) {
    this._attributeArray = value;
  }

  private assignForm(form: FormGroup) {
    this._form = form;
    this._attributeArray = form.get(this.KEY_STATS) as FormArray;
  }

  resetForm() {
    let form = this.buildForm();
    this._form.reset(form);
    this.assignForm(form);
  }
}
