import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

export type notificationType = 'blank' | 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) { }

  public notify(model: {
    title?: string;
    message?: string;
    type?: notificationType;
    position?: NzNotificationPlacement
  }) {
    this.notification.create(
      model.type ?? 'blank',
      model.title ?? '',
      model.message ?? '',
      { nzPlacement: model.position ?? 'top' }
    );
  }
}
