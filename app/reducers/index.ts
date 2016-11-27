import { reducer as tweetsReducer } from './tweets';

import { combineReducers } from '@ngrx/store';

const reducers = {
    tweets: tweetsReducer
};

export function reducer(state: any, action: any) {
    return combineReducers(reducers)(state, action);
}