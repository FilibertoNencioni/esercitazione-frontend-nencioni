import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'

export const nameof = <T extends {}>(name: keyof T) => name;
export const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

export function confirmNotification(options: SweetAlertOptions): Promise<SweetAlertResult> {
    options.confirmButtonColor = "#0078d4";
    return Swal.fire({
      ...options,
      showCancelButton: !!options.cancelButtonText,
      showCloseButton: true
    })
  }