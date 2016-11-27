import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import * as tweets from '../actions/tweets';
import { Tweet } from '../tweet/tweet.model';
import { TweetService } from '../tweet/tweet.service';

@Injectable()
export class TweetsEffects {
    @Effect()
    loadTweets$: Observable<Action> = this.actions$
        .ofType(tweets.ActionTypes.LOAD_TWEETS)
        .switchMap(() => this.tweetService.getTweets().map((tweetsList: Tweet[]) => new tweets.LoadTweetsSuccessAction(tweetsList)));

    @Effect()
    addTweet$: Observable<Action> = this.actions$
        .ofType(tweets.ActionTypes.ADD_TWEET)
        .switchMap((action) => this.tweetService.addTweet(action.payload).map((tweet: Tweet) => new tweets.AddTweetSuccessAction(tweet)));

    @Effect()
    likeTweet$: Observable<Action> = this.actions$
        .ofType(tweets.ActionTypes.LIKE_TWEET)
        .switchMap(
            (action) => this.tweetService.sendLike(action.payload).map((tweet: Tweet) => new tweets.LikeTweetSuccessAction(tweet))
        );

    constructor(private actions$: Actions, private tweetService: TweetService) {

    }
};
