import { Component } from '@angular/core';
import { GithubScraper } from './githubScraper/index';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  directives: [GithubScraper]
})
export class AppComponent {

}
