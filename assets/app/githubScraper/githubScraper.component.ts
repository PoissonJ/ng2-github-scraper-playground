import { Component } from "@angular/core";
import { Http } from "@angular/http";
import { DomSanitizationService, SafeHtml } from "@angular/platform-browser";
import "rxjs/add/operator/map"; // .map()
import {Observable} from "rxjs/Observable";


@Component({
  moduleId: module.id,
  selector: "github-scraper",
  templateUrl: "githubScraper.html"
})
export class GithubScraper {
  public html: SafeHtml;
  public streak: string;
  public loading: boolean = true;

  constructor(private _http: Http, private sanitizer: DomSanitizationService) {
    this.getImage();
  }

  getImage() {
    this._http.get("http://localhost:3000/githubContribution")
      .subscribe(response => {
        let incomingHtml = response.json().image;
        this.streak = response.json().streak;
        this.html = this.sanitizer.bypassSecurityTrustHtml(incomingHtml);
        this.loading = false;
      });
  }
}
