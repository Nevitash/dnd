import {Component, Input} from '@angular/core';
import {TrackedEntry} from '../../models/tracked-entry';

@Component({
  selector: 'app-initiative-tracker-entry',
  standalone: false,

  templateUrl: './initiative-tracker-entry.component.html',
  styleUrl: './initiative-tracker-entry.component.scss'
})
export class InitiativeTrackerEntryComponent {
  @Input() tracked!: TrackedEntry;

}
