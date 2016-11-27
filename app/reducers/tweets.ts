import * as tweets from '../actions/tweets';

import { Tweet } from '../tweet/tweet.model';


export function reducer(state: Tweet[] = [], action: tweets.Actions): Tweet[] {
    switch (action.type) {
        case tweets.ActionTypes.LOAD_TWEETS_SUCCESS: {
            return action.payload;
        }
        case tweets.ActionTypes.ADD_TWEET_SUCCESS: {
            return [action.payload, ...state];
        }
        case tweets.ActionTypes.LIKE_TWEET_SUCCESS: {
            const likedTweet = <Tweet>action.payload;
            return state.map(tweet => {
                if (tweet.id !== likedTweet.id) {
                    return tweet;
                } else {
                    return likedTweet;
                }
            });
        }
        default: {
            return state;
        }
    }
}
