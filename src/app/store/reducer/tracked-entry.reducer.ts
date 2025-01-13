// import {AppState} from '../app.state';
// import {TrackedEntry} from '../../models/tracked-entry';
// import {TrackerUtility} from '../../utils/tracker-utility';
// import {Phase} from '../../enums/phase';
// import {createReducer, on} from '@ngrx/store';
// import {
//   addTrackedEntry,
//   clearTrackedEntries,
//   removeTrackedEntry,
//   updateTrackedEntry
// } from '../actions/tracked-entry.action';
// import {initialState} from './app.reducer';
//
// const handleAddTrackedEntry = (appState: AppState, newEntry: TrackedEntry): AppState => {
//   newEntry.name = TrackerUtility.determineUniqueName(appState.trackedEntries, newEntry.name);
//
//   const updatedTrackedEntries = [...appState.trackedEntries, newEntry];
//   TrackerUtility.sortEntries(updatedTrackedEntries);
//
//   let updatedRoundTrackedEntries = appState.roundTrackedEntries;
//   if (appState.phase === Phase.PREVIEW) {
//     updatedRoundTrackedEntries = [...appState.roundTrackedEntries, newEntry];
//     TrackerUtility.sortEntries(updatedRoundTrackedEntries);
//   }
//
//   return {
//     ...appState,
//     trackedEntries: updatedTrackedEntries,
//     roundTrackedEntries: updatedRoundTrackedEntries,
//   };
// };
//
// const handleRemoveTrackedEntry = (appState: AppState, trackedEntry?: TrackedEntry, name?: string): AppState => {
//   let updatedTrackedEntries = [...appState.trackedEntries];
//   let updatedRoundTrackedEntries = [...appState.roundTrackedEntries];
//
//   updatedTrackedEntries = TrackerUtility.removeEntry(updatedTrackedEntries, trackedEntry, name);
//   updatedRoundTrackedEntries = TrackerUtility.removeEntry(updatedRoundTrackedEntries, trackedEntry, name);
//
//   TrackerUtility.sortEntries(updatedTrackedEntries);
//   TrackerUtility.sortEntries(updatedRoundTrackedEntries);
//
//   return {
//     ...appState,
//     trackedEntries: updatedTrackedEntries,
//     roundTrackedEntries: updatedRoundTrackedEntries
//   };
// }
//
// const handleUpdateTrackedEntry = (appState: AppState, key: string, entry: Partial<TrackedEntry>) => {
//   let updatedTrackedEntries = [...appState.trackedEntries];
//   let updatedRoundTrackedEntries = [...appState.roundTrackedEntries];
//
//   updatedTrackedEntries = TrackerUtility.updateEntry(updatedTrackedEntries, key, entry);
//   updatedRoundTrackedEntries = TrackerUtility.updateEntry(updatedRoundTrackedEntries, key, entry);
//
//   return {
//     ...appState,
//     trackedEntries: updatedTrackedEntries,
//     roundTrackedEntries: updatedRoundTrackedEntries
//   };
// }
//
// export const trackedEntryReducer = createReducer(
//   initialState,
//   on(addTrackedEntry, (state, { trackedEntry }) => handleAddTrackedEntry(state, trackedEntry)),
//   on(removeTrackedEntry, (state, { trackedEntry, name }) => handleRemoveTrackedEntry(state, trackedEntry, name)),
//   on(updateTrackedEntry, (state, { name, entry }) => handleUpdateTrackedEntry(state, name, entry)),
//   on(clearTrackedEntries, state => ({ ...state, roundTrackedEntries: [], trackedEntries: [] }))
// );
