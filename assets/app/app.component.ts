import { Component } from '@angular/core';
import { ContributionPicture } from './githubScraper/contributionPicture/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [ContributionPicture]
})
export class AppComponent {

}
