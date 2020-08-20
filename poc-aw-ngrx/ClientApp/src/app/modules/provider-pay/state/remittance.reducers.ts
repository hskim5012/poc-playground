import { IRemittanceResponse } from '../../../models/remittanceResult';
import { RemittanceAction, RemittanceActionTypes } from './remittance.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  results: RemittanceState;
}

export interface RemittanceState {
  remitValues: {
    ncpdp: string,
    asOfDate: string,
    remitDateFrom: string,
    remitDateTo: string,
    linesPerPage: string,
    level: string
  };
  results: IRemittanceResponse;
  error: string;
}

const initialState: RemittanceState = {
  remitValues: {
    ncpdp: '1221',
    asOfDate: '2020-01-01',
    remitDateFrom: '2017-01-01',
    remitDateTo: '2020-01-01',
    linesPerPage: '4',
    level: 'Group Level'
  },
  results: {
    data: {
      remits: []
    }
  },
  error: ''
};

const getRemittanceFeatureState = createFeatureSelector<RemittanceState>(
  'remittances'
);

export const getSearchCriteria = createSelector(
  getRemittanceFeatureState,
  state => state.remitValues
)

export const getRemittances = createSelector(
  getRemittanceFeatureState, // feature selector
  state => state.results // projector function
);

export const getError = createSelector(
  getRemittanceFeatureState,
  state => state.error
);

export function reducer(
  state = initialState,
  action: RemittanceAction
): RemittanceState {
  switch (action.type) {

    case RemittanceActionTypes.LoadSuccess: {
      console.log('existing state: ' + JSON.stringify(state));
      console.log('payload: ' + action.payload);
      return {
        ...state,
        results: action.payload
      };
    }

    case RemittanceActionTypes.LoadFail: {
      console.log("existing state: " + JSON.stringify(state));
      console.log("payload: " + action.payload);
      return {
        ...state,
        results: {
          data: {
            remits: []
          }
        },
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
