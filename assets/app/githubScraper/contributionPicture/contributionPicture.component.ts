import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { DomSanitizationService } from '@angular/platform-browser';
import 'rxjs/Rx'; // .map()
import {Observable} from "rxjs/Observable";


@Component({
  moduleId: module.id,
  selector: 'contribution-picture',
  templateUrl: 'contributionPicture.html'
})
export class ContributionPicture {
  html;

  constructor(private _http: Http, private sanitizer: DomSanitizationService) {
    this.getImage();
  }

  getImage() {
    console.log("running");
    this._http.get('http://localhost:3000/githubContribution')
      .subscribe(response => {
        console.log(response);
        // var el = document.createElement('html');
        // el.innerHTML = response.text();
        // var squares = el.getElementsByTagName("rect");
        // for (var i = squares.length; i >=0; i--) {
        //   console.log(squares[i]);
        // }

        // for (var i = 0; i < allChilds.length; i++) { // body
        //   for (var j = 0; i < allChilds[i].childNodes.length; i++) { // svg
        //     console.log(allChilds[i])
        //   }
        // }

        var incomingHtml = response.json().image;
        this.html = this.sanitizer.bypassSecurityTrustHtml(incomingHtml);
      })
      // .catch(error => Observable.throw(error.json()));
  }
}
