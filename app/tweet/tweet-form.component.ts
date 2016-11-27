import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as tweets from '../actions/tweets';

@Component({
    selector: 'app-tweet-form',
    templateUrl: 'app/tweet/tweet-form.component.html'
})
export class TweetFormComponent implements OnInit {
    @Input() content: string;

    constructor(private store: Store<any>) { }

    ngOnInit() { }

    addTweet() {
        this.store.dispatch(new tweets.AddTweetAction(this.content));
    }
}
