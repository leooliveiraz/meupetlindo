import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { CropperDialogComponent } from '../cropper-dialog/cropper-dialog.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent | any;
  @Input() src: any;
  @Output() changeImageEvent = new EventEmitter();
  srcImage: any = null;
  croppedImage: any = {};

  cameraIcon = faCamera;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  mudar(event: any) {
    if (event.target.files[0]) {
      const newDialog = this.dialog.open(CropperDialogComponent, { data: { event: event } });
      newDialog.afterClosed().subscribe(croppedImg => {
        if (croppedImg) {
          this.src = null;
          this.srcImage = croppedImg;
          this.changeImageEvent.emit(this.srcImage);
        }
      })
    }
  }
}
