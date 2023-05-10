import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

  swalFire(title: string, icon: 'warning' | 'error' | 'info' | 'success' | 'question'){
    Swal.fire({ position: 'top-end', title: title, text: '', showConfirmButton: false, timer: 1500, icon: icon})
  }

}
