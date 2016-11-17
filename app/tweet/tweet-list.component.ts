import {Component, OnInit} from '@angular/core';
import {TweetService} from './tweet.service';
import {Tweet} from './tweet.model';

@Component({
    moduleId: module.id,
    selector: 'app-tweet-list',
    templateUrl: 'tweet-list.component.html'
})
export class TweetListComponent implements OnInit {
    tweets: Tweet[];

    constructor(private tweetService: TweetService) {}

    getTweets() {
        this.tweetService.getTweets().then(tweets => this.tweets = tweets);
    }

    ngOnInit() {
        this.getTweets();
    }

    addTweet(tweet: Tweet) {
        this.tweets = [tweet, ...this.tweets];
    }
}
