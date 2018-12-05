import { Injectable, InjectionToken } from '@angular/core';

export const TOASTR_TOKEN = new InjectionToken<Object>('toastr');

 declare var toastr;

 toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

@Injectable()
export class ToastrService {

  info(message : string ){
    toastr.info(message);
  }
  
  warning(message : string ){
    toastr.warning(message);
  }

  success(message : string ){
    toastr.success(message);
  }

  error(message : string ){
    toastr.error(message);
  }
  
}
