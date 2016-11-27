import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import {Tweet} from './tweet.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class TweetService {
    constructor(private authHttp: AuthHttp, @Inject('API_URL') private apiUrl: string) {}

    addTweet(content): Observable<Tweet> {
        return this.authHttp
            .post(`${this.apiUrl}/tweets/`, {content})
            .map(response => <Tweet>response.json());
    }

    getTweets(): Observable<Tweet[]> {
        return this.authHttp
            .get(`${this.apiUrl}/tweets/`)
            .map(response => <Tweet[]>response.json());
    }

    sendLike(tweet: Tweet): Observable<Tweet> {
        return this.authHttp
            .post(`${this.apiUrl}/tweets/${tweet.id}/like/`, {})
            .map(response => <Tweet>response.json());
    }
}
