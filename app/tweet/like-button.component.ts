import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import * as tweets from '../actions/tweets';
import { Tweet } from './tweet.model';

@Component({
    moduleId: module.id,
    selector: 'app-like-button',
    template: `<button (click)="sendLike()" class="btn btn-default">Like</button>`
})
export class LikeButtonComponent implements OnInit {
    @Input() tweet: Tweet;
    @Output() liked = new EventEmitter();

    constructor(private store: Store<any>) { }

    ngOnInit() { }

    sendLike() {
        this.store.dispatch(new tweets.LikeTweetAction(this.tweet));
    }
}
