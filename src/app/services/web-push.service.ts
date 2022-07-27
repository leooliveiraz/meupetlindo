import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebPushService {

  constructor(private http: HttpClient,
    private swPush: SwPush) { }
  url = `${environment.API_URL}web-push`;

  subscribeInServer(objeto: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}`, objeto, { headers: headers });
  }

  unscribeInServer(objeto: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}/unscribe`, objeto, { headers: headers });
  }

  unscribeNotifications(objeto: any) {
    if (this.swPush.isEnabled) {
      this.swPush.unsubscribe().then(() => {
        const sub = this.getSubscription();
        this.unscribeInServer(sub).subscribe(() => { });
        localStorage.removeItem("subscription")
        this.tryingSubscribe();
      })
    }
  }

  storeSubscription(sub: any) {
    localStorage.setItem("subscription", JSON.stringify(sub));
  }

  isSubscribed() {
    return localStorage.getItem("subscription");
  }

  getSubscription() {
    return JSON.parse(localStorage.getItem("subscription") + "");
  }

  tryingSubscribe() {
    localStorage.setItem("try-subscribe", JSON.stringify((new Date()).getTime()));
  }

  lastTry() {
    const epoch = localStorage.getItem("try-subscribe");
    return epoch ? JSON.parse(epoch) : null;
  }

}
