import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import {TrackedEntry} from '../../models/tracked-entry';

@Component({
  selector: 'app-initiative-tracker-entry',
  standalone: false,

  templateUrl: './initiative-tracker-entry.component.html',
  styleUrl: './initiative-tracker-entry.component.scss'
})
export class InitiativeTrackerEntryComponent implements OnInit, OnDestroy {
  protected _zoomedIn: boolean = false;

  protected _imageUrl?: string | ArrayBuffer | null;
  @Input() tracked!: TrackedEntry;

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
}
