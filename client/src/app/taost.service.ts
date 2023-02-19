import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private messageService: MessageService) {}

  showSuccess(detail: string = 'Successfully') {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail,
    });
  }

  showInfo(detail: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail,
    });
  }

  showWarn(detail: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail,
    });
  }

  showError(detail: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail,
    });
  }
}
