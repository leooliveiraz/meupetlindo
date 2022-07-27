import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SwPush } from '@angular/service-worker';
import { ToastService } from 'src/app/services/toast.service';
import { WebPushService } from 'src/app/services/web-push.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NotificationDialogComponent>,
    private swPush: SwPush,
    private webPushService: WebPushService,
    private toast: ToastService) { }

  ngOnInit(): void {
  }

  requisitarInscricao() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.salvarInscricao(sub)
        this.webPushService.subscribeInServer(sub).subscribe(() => {
          this.toast.create("success", "A partir de agora, você receberá notificações do nosso APP!");
          this.dialogRef.close({});
        })
      })
      .catch(err => {
        this.toast.create("error", "Seu dispositivo não pode receber esse tipo de notificações"),
          this.dialogRef.close({});
      });
  }

  salvarInscricao(sub: any) {
    this.webPushService.storeSubscription(sub);
  }

}
