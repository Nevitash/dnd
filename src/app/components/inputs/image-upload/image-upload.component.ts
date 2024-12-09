import {Component, forwardRef, inject, Input, input} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  standalone: false,

  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageUploadComponent),
      multi: true
    },
  ]
})
export class ImageUploadComponent implements ControlValueAccessor {
  protected readonly KEY_IMAGE = "image";
  protected _form!: FormGroup;
  protected _formBuilder: FormBuilder = inject(FormBuilder);
  protected _image: FormControl<File | null>;
  @Input() private _imageUrl?: string | ArrayBuffer | null;

  private onChange: any = () => {
  };
  private onTouched: any = () => {
  };

  constructor() {
    this._image = new FormControl<File | null>(null, []);
    this._form = this._formBuilder.group({
      [this.KEY_IMAGE]: this._image
    })
  }


  get imageUrl(): string | ArrayBuffer | null | undefined {
    return this._imageUrl;
  }

  set imageUrl(value: string | ArrayBuffer | null) {
    this._imageUrl = value;
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

  writeValue(value: File | null): void {
    if (value) {
      this._form.patchValue(
        {[this.KEY_IMAGE]: value.name},
        {emitEvent: false});
    }
  }

  uploadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
