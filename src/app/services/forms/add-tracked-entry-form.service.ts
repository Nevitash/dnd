import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Character} from '../../models/character';

@Injectable({
  providedIn: 'root'
})
export class AddTrackedEntryFormService {
  public readonly KEY_NAME = "name";
  public readonly KEY_INITIATIVE = "initiative";
  public readonly KEY_CHARACTER = "character";

  private readonly _form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this._form = formBuilder.group({
      [this.KEY_NAME]: new FormControl<string>("", [Validators.required]),
      [this.KEY_INITIATIVE]: new FormControl<number>(10, [Validators.required, Validators.min(1)]),
      [this.KEY_CHARACTER]: new FormControl<Character | undefined>(undefined, []),
    });
  }

  get form(): FormGroup {
    return this._form;
  }
}
