import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizationService, SafeHtml } from '@angular/platform-browser';
import 'rxjs/Rx'; // .map()
import {Observable} from "rxjs/Observable";


@Component({
  moduleId: module.id,
  selector: 'github-scraper',
  templateUrl: 'githubScraper.html'
})
export class GithubScraper {
  public html: SafeHtml;
  public streak: string;

  constructor(private _http: Http, private sanitizer: DomSanitizationService) {
    this.getImage();
  }

  getImage() {
    this._http.get('http://localhost:3000/githubContribution')
      .subscribe(response => {
        var incomingHtml = response.json().image;
        this.streak = response.json().streak;
        this.html = this.sanitizer.bypassSecurityTrustHtml(incomingHtml);
      })
  }
}
