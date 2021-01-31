import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rb-notes';

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('cs');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('cs');
    
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/cs|en/) ? browserLang : 'cs');

    translate.addLangs(['cs', 'en']); 
    
  }
}
