import {Component, OnInit} from '@angular/core';
import {TweetService} from './tweet.service';
import {Tweet} from './tweet.model';

@Component({
    selector: 'app-tweet-list',
    templateUrl: 'app/tweet/tweet-list.component.html'
})
export class TweetListComponent implements OnInit {
    tweets: Tweet[];

    constructor(private tweetService: TweetService) {}

    ngOnInit() {
        this.getTweets();
    }

    getTweets() {
        this.tweetService.getTweets().then(tweets => this.tweets = tweets);
    }
}
