import * as tweets from './tweets';

import { combineReducers } from '@ngrx/store';

import { Tweet } from '../tweet/tweet.model';

const reducers = {
    tweets: tweets.reducer
};

export interface State {
    tweets: Tweet[];
}

export function reducer(state: State, action: any) {
    return combineReducers(reducers)(state, action);
}
