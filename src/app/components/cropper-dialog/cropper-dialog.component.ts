import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faRotateLeft, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.css']
})
export class CropperDialogComponent implements OnInit {

  @ViewChild(ImageCropperComponent, { static: false }) imageCropper: ImageCropperComponent | any;
  constructor(public dialogRef: MatDialogRef<CropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  imageChangedEvent: any = {};
  srcImage: any = null;
  croppedImage: any = {};
  selectedImage = null;
  canvasRotation = 0;

  rotateLeftIcon = faRotateLeft;
  rotateRightIcon = faRotateRight;

  ngOnInit(): void {
    this.imageChangedEvent = this.data.event;
    this.selectedImage = this.data.event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  concluirRecorte() {
    this.srcImage = this.croppedImage;
    this.dialogRef.close(this.srcImage)
  }

  rotateRight() {
    this.canvasRotation++
  }

  rotateLeft() {
    this.canvasRotation--;
  }

}
