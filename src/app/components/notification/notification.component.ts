import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwPush } from '@angular/service-worker';
import { WebPushService } from 'src/app/services/web-push.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { PushHandleService } from 'src/app/services/push-handle.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notificationIsOpen = false;
  constructor(private matDialog: MatDialog,
    private swPush: SwPush,
    private webPushService: WebPushService,
    private pushHandleService: PushHandleService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.abrirDialog() }, 15 * 1000);
    setInterval(() => { this.abrirDialog() }, 1 * 60 * 1000);
    this.configurarPushHandle();

  }

  configurarPushHandle() {
    this.swPush.notificationClicks.subscribe((message:any) =>  {
      this.pushHandleService.handleWebPushMessages(message)
    })
  }

  abrirDialog() {
    if (this.swPush.isEnabled) {
      if (!this.webPushService.isSubscribed()) {
        const now = (new Date()).getTime();
        const lastTry = this.webPushService.lastTry();
        const twelveHours = (12 * 60 * 60 * 1000);
        if ((!lastTry || now > (lastTry + twelveHours)) && !this.notificationIsOpen) {
          this.notificationIsOpen = true;
          const newDialog = this.matDialog.open(NotificationDialogComponent)
          newDialog.afterClosed().subscribe(() => {
            this.notificationIsOpen = false;
            this.webPushService.tryingSubscribe();
          })
        }
      }
    }
  }

}
