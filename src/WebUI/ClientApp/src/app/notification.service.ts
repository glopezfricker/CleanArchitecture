import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message, title) {
    this.toastr.success(message, title)
  }

  showError(message, title) {
    this.toastr.error(message, title)
  }

  showInfo(message, title){
    this.toastr.info(message, title)
  }

  showWarning(message, title){
    this.toastr.warning(message, title)
  }
}
