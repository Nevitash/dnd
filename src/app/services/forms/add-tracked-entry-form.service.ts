import {Injectable} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  public readonly SUB_KEY_ATTRIBUTE_NAME = "name";
  private readonly _attributes: Array<string> = [
    TrackedAttribute.INITIATIVE.valueOf()
  ];

  private readonly _form: FormGroup;
  private _attributeArray: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this._attributeArray = formBuilder.array([]);
    this._form = formBuilder.group({
      [this.KEY_NAME]: new FormControl<string>("", [Validators.required]),
      [this.KEY_CHARACTER]: new FormControl<Character | undefined>(undefined, []),
      [this.KEY_STATS]: this._attributeArray
    });

    for (const attributeId in Object.keys(this._attributes)) {
      this._attributeArray.push(this.createStatFormControls(this._attributes[attributeId], 10, 0), {emitEvent: false});
    }
    this._attributeArray.push(this.createStatFormControls(TrackedAttribute.AC.valueOf(), 10), {emitEvent: false});
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
}
