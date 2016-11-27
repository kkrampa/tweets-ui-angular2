import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { Tweet } from './tweet.model';
import * as tweets from '../actions/tweets';

@Component({
    moduleId: module.id,
    selector: 'app-tweet-list',
    templateUrl: 'tweet-list.component.html'
})
export class TweetListComponent implements OnInit {
    tweets$: Observable<Tweet[]>;

    constructor(private store: Store<any>) {
        this.tweets$ = store.select(state => state.tweets);
    }

    getTweets() {
        this.store.dispatch(new tweets.LoadTweetsAction());
    }

    ngOnInit() {
        this.getTweets();
    }
}
