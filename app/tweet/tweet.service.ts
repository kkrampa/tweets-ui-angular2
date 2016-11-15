import { Injectable, Inject } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import {Tweet} from './tweet.model';


@Injectable()
export class TweetService {
    constructor(private authHttp: AuthHttp, @Inject('API_URL') private apiUrl: string) {}

    addTweet(content): Promise<Tweet> {
        return this.authHttp
            .post(`${this.apiUrl}/tweets/`, {content})
            .toPromise()
            .then(response => <Tweet>response.json());
    }

    getTweets(): Promise<Tweet[]> {
        return this.authHttp
            .get(`${this.apiUrl}/tweets/`)
            .toPromise()
            .then(response => <Tweet[]>response.json());
    }
}
