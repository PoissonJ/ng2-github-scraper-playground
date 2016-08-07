import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import 'rxjs/Rx'; // .map()
import {Observable} from "rxjs/Observable";


@Component({
  moduleId: module.id,
  selector: 'streak',
  templateUrl: 'contributionPicture.html'
})
export class Streak {
  public html: SafeHtml;

  constructor(private _http: Http, private sanitizer: DomSanitizationService) {
    this.getImage();
  }

  getImage() {
    this._http.get('http://localhost:3000/')
      .subscribe(response => {
        var incomingHtml = response.json().image;
        this.html = this.sanitizer.bypassSecurityTrustHtml(incomingHtml);
      })
  }
}
