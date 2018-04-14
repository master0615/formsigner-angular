import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const LANG_RU_NAME = 'ru';
export const LANG_EN_NAME = 'en';

@Injectable()
export class LanguageService {
    public language:string;
    
    constructor(
        private translate   : TranslateService) {
        const browserLang = this.translate.getBrowserLang();
        this.language = browserLang.match(/en|ru/) ? browserLang :LANG_RU_NAME;
        this.translate.addLangs([LANG_EN_NAME, LANG_RU_NAME]);
        this.setLanguage( this.getLanguage() );
        //this.translate.setDefaultLang( this.lang ); 
        //this.setLang( this.lang );     
    }

    setLanguage( language:string ) {
        this.language = language;
        localStorage.setItem('currengLang', JSON.stringify( language ));     
        this.translate.use( language );          
    }
    
    getLanguage():string {
        this.language = JSON.parse( localStorage.getItem('currengLang') );
        return this.language ? this.language : LANG_EN_NAME;
    }
    public get( key : string ){
        return this.translate.get( key );
    }
}
