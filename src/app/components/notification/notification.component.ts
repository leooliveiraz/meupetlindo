import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwPush } from '@angular/service-worker';
import { WebPushService } from 'src/app/services/web-push.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private matDialog: MatDialog,
    private swPush: SwPush,
    private webPushService: WebPushService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => { this.abrirDialog() }, 15 * 1000);
    setInterval(() => { this.abrirDialog() }, 1 * 60 * 1000);
  }

  abrirDialog() {
    if (this.swPush.isEnabled) {
      if (!this.webPushService.isSubscribed()) {
        const now = (new Date()).getTime();
        const lastTry = this.webPushService.lastTry();
        const twelveHours = (12 * 60 * 60 * 1000);
        if (!lastTry || now > (lastTry + twelveHours)) {
          const newDialog = this.matDialog.open(NotificationDialogComponent);
          newDialog.afterClosed().subscribe(() => {
            this.webPushService.tryingSubscribe();
          })
        }
      }
    }
  }

}
