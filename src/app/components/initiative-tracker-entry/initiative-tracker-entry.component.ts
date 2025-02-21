import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TrackedEntry} from '../../models/tracked-entry';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {NgClass, NgTemplateOutlet} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {DragScrollComponent, DragScrollItemDirective} from 'ngx-drag-scroll';
import {MatFabButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatCardImage} from '@angular/material/card';

@Component({
  selector: 'app-initiative-tracker-entry',
  standalone: true,

  templateUrl: './initiative-tracker-entry.component.html',
  imports: [
    MatAccordion,
    MatExpansionPanel,
    NgClass,
    MatIcon,
    MatExpansionPanelTitle,
    MatLabel,
    NgTemplateOutlet,
    MatSlider,
    FormsModule,
    MatExpansionPanelDescription,
    DragScrollComponent,
    MatFormField,
    MatFabButton,
    MatInput,
    MatSliderThumb,
    DragScrollItemDirective,
    MatCardImage,
    MatExpansionPanelHeader
  ],
  styleUrl: './initiative-tracker-entry.component.scss'
})
export class InitiativeTrackerEntryComponent implements OnInit, OnDestroy {
  @ViewChild('hpInput') hpInput!: ElementRef<HTMLInputElement>;
  protected _zoomedIn: boolean = false;

  protected _imageUrl?: string | ArrayBuffer | null;
  @Input() tracked!: TrackedEntry;
  @Input() damageCalc!: boolean;
  @Output() removeEntryEvent: EventEmitter<TrackedEntry> = new EventEmitter();

  ngOnInit(): void {
    if (this.tracked.image) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.tracked.image);
    }
  }

  ngOnDestroy(): void {
    this._imageUrl = undefined;
  }


  get imageUrl(): string | ArrayBuffer | null | undefined {
    return this._imageUrl;
  }

  set imageUrl(value: string | ArrayBuffer | null) {
    this._imageUrl = value;
  }

  toggleZoom() {
    this._zoomedIn = !this._zoomedIn;
  }

  onHpChange(value: string) {
    this.applyHpChange(value);
  }

  applyHpChange(valueString: string): void {
    let value = parseInt(valueString);

    if (this.tracked.stats.currentHp === undefined || this.tracked.stats.maxHp === undefined) {
      this.hpInput.nativeElement.value = "undefined";
      return;
    }

    if (valueString.startsWith("+") && this.tracked.stats.currentHp < 0) {
      this.tracked.stats.currentHp = 0;
    }

    if (valueString.startsWith("+") || valueString.startsWith("-")) {
      value = this.tracked.stats.currentHp + value;
    }

    this.setHp(value);
    this.hpInput.nativeElement.value = this.tracked.stats.currentHp.toString();
  }

  doDamage(value: string) {
    value = value.replace(/[+-]/g, "");  // Using a regular expression with global flag
    this.onHpChange(`-${value}`);
  }

  doHeal(value: string) {
    value = value.replace(/[+-]/g, "");  // Using a regular expression with global flag
    this.onHpChange(`+${value}`);
  }

  setHp(value: number) {
    if (!this.tracked.stats.maxHp) {
      return;
    }
    this.tracked.stats.currentHp = Math.min(value, this.tracked.stats.maxHp);
  }

  isDown(): boolean {
    if(!this.tracked || !this.tracked.stats){
      return false;
    }
    if(this.tracked.stats.currentHp === undefined){
      return false;
    }
    return this.tracked.stats.currentHp <= 0;
  }

  removeEntry($event: MouseEvent) {
    $event.stopPropagation();
    this.removeEntryEvent.emit(this.tracked);
  }
}
