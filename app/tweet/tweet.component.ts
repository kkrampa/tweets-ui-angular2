import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from './tweet.model';

@Component({
    selector: 'app-tweet',
    templateUrl: '/app/tweet/tweet.component.html'
})
export class TweetComponent implements OnInit {
    @Input() tweet: Tweet;

    constructor() { }

    ngOnInit() { }
}
