import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  create(icon: string,
    msg: string,
    position: any = 'bottom',
    showConfirmButton = false,
    timer = 3,
    showTimerProgressBar = true) {

    const toast: any = Swal.mixin({
      toast: true,
      position: position,
      showConfirmButton: showConfirmButton,
      timer: timer * 1000,
      timerProgressBar: showTimerProgressBar,
      iconColor: 'white',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
      customClass: {
        popup: 'colored-toast'
      },
    })
    toast.fire({
      icon: icon,
      title: msg
    })
  }

}
