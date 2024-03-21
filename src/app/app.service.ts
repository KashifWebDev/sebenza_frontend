import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import dictionary from './core/translation/dictionary.json';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private dictionary: any = dictionary;

  constructor() {
  }

  swalFire(title: string | undefined, icon: 'warning' | 'error' | 'info' | 'success' | 'question', timer: number = 1500){
    Swal.fire({ position: 'top-end', title: title, text: '', showConfirmButton: false, timer: timer, icon: icon})
  }

  translate(key: string): string {
    const language = this.getLang();
    if (!this.dictionary[key]) {
      return key; // Return the provided key if it doesn't exist in the dictionary
    }else{
      return this.dictionary[key][language]; // Return the translated text if available
    }
  }

  getLang(){
    return localStorage.getItem('lang') ?? 'en';
  }

  setLang(lang: string){
    localStorage.setItem('lang', lang);
  }

}
