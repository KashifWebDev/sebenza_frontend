import{Component, OnInit} from '@angular/core';
import {AppService} from "../../../app.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

show: boolean = true;
txt = '';
  constructor(private appService: AppService) {
    if(localStorage.getItem('lang')){
      this.show = true;
    }else{
      this.show = false;
    }

    if(localStorage.getItem('lang') == 'en') this.txt = "English";
    if(localStorage.getItem('lang') == 'es') this.txt = "Spanish";
    if(localStorage.getItem('lang') == 'pt') this.txt = "Portuguese";
    if(localStorage.getItem('lang') == 'fr') this.txt = "French";
  }

  ngOnInit(): void {
  }

  translatedText(text: string): string{
    return this.appService.translate(text);
  }

  changeLang(lang: string){
    this.show = false;
    this.appService.setLang(lang);
  }


}
