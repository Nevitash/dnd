// import {AppState} from '../app.state';
// import {ActionReducer, combineReducers, MetaReducer} from '@ngrx/store';
// import {Phase} from '../../enums/phase';
// import {FEATURE_KEY_PHASE, FEATURE_KEY_TRACKED_ENTRIES} from '../selector/tracked-entry.selector';
// import {trackedEntryReducer} from './tracked-entry.reducer';
// import {phaseReducer} from './phase.reducer';
//
// export const initialState: AppState = {
//   trackedEntries: [],
//   roundTrackedEntries: [],
//   phase: Phase.PREVIEW
// };
//
// export function metaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return function (state, action) {
//     return reducer(state, action);
//   }
// }
//
// export const reducers = combineReducers({
//   [FEATURE_KEY_TRACKED_ENTRIES]: trackedEntryReducer,
//   [FEATURE_KEY_PHASE]: phaseReducer,
// })
//
// export const metaReducers: MetaReducer<any>[] = [
//   metaReducer
// ];
