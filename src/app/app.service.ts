import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() {
  }

  swalFire(title: string, icon: 'warning' | 'error' | 'info' | 'success' | 'question'){
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title: title,
      icon: icon
    })
  }

}
