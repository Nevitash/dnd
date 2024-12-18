import {Component, forwardRef, Input} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validators
} from '@angular/forms';
import {Attribute} from '../../../models/dto/attribute';
import {RollUtil} from '../../../utils/rollUtil';

@Component({
  templateUrl: './attribute-with-modifier.component.html',
  selector: 'app-attribute-with-modifier',
  styleUrls: ['./attribute-with-modifier.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AttributeWithModifierComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AttributeWithModifierComponent),
      multi: true
    }
  ]
})
export class AttributeWithModifierComponent implements ControlValueAccessor {
  @Input() attributeName!: string;
  @Input() value: number = 10;
  @Input() modifier?: number;
  @Input() rollCode?: string;

  protected _form: FormGroup;
  protected _attribute: Attribute;
  protected readonly KEY_STAT_NAME: string = "name";
  protected readonly KEY_STAT_VALUE: string = "value";
  protected readonly KEY_STAT_MODIFIER: string = "modifier";

  private onChange: any = () => {};
  private onTouched: any = () => {};

  constructor(private formBuilder: FormBuilder) {
    this._form = this.formBuilder.group({
      [this.KEY_STAT_NAME]: new FormControl<string>(this.attributeName, [Validators.required]),
      [this.KEY_STAT_VALUE]: new FormControl<number>(this.value, [Validators.required]),
      [this.KEY_STAT_MODIFIER]: new FormControl<number>(this.modifier ?? 0, [])
    });

    this._form.valueChanges.subscribe(value => {
      this.onChange(value);
      this.onTouched();
    });

    this._attribute = new Attribute(this.attributeName, this.value, this.modifier);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this._form.disable() : this._form.enable();
  }

  writeValue(value: Attribute): void {
    if (value) {
      this._form.patchValue(
        {name: value.name, value: value.value, modifier: value.modifier},
        { emitEvent: false });
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this._form.valid ? null : { invalidForm: { valid: false, message: "Attribute form is invalid" } };
  }

  roll($event: MouseEvent) {
    $event.stopPropagation();
    const operator = this.modifier! >= 0 ? "+" : "";
    const result = RollUtil.rollWithDiceCode(`${this.rollCode}${operator}${this.modifier}`);
    this._form.get(this.KEY_STAT_VALUE)!.setValue(result);
  }
}
