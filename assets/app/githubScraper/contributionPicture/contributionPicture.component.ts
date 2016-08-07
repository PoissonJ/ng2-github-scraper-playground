import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx'; // .map()
import {Observable} from "rxjs/Observable";

@Component({
  moduleId: module.id,
  selector: 'contribution-picture',
  templateUrl: 'contributionPicture.html'
})
export class ContributionPicture {
  html;

  constructor(private _http: Http) {
    this.getImage();
  }

  getImage() {
    console.log("running");
    this._http.get('https://github.com/users/poissonj/contributions')
      .subscribe(response => {
        console.log(response);
        var el = document.createElement('html');
        el.innerHTML = response.text();
        var squares = el.getElementsByTagName("rect");
        for (var i = squares.length; i >=0; i--) {
          console.log(squares[i]);
        }

        // for (var i = 0; i < allChilds.length; i++) { // body
        //   for (var j = 0; i < allChilds[i].childNodes.length; i++) { // svg
        //     console.log(allChilds[i])
        //   }
        // }

        this.html = 'done';
      })
      // .catch(error => Observable.throw(error.json()));
  }
}
