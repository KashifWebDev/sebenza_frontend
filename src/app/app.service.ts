import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

  swalFire(title: string | undefined, icon: 'warning' | 'error' | 'info' | 'success' | 'question', timer: number = 1500){
    Swal.fire({ position: 'top-end', title: title, text: '', showConfirmButton: false, timer: timer, icon: icon})
  }

}
