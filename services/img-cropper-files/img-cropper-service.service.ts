import { Injectable, Component, Inject, EventEmitter } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { ImageCroppedEvent } from "ngx-image-cropper";
@Injectable()
export class ImgCropperServiceService {
  constructor(public dialog: MatDialog) {}

  croppedImage;
  originalImage;
  filename;
  filetype;
  filesize;

  imageStatus: EventEmitter<any> = new EventEmitter();

  openImageCropper(event) {
    this.originalImage = event.target.value;
    let ref = this.dialog.open(ImageCropperComponent, {
      hasBackdrop: true,
      height: "700px",
      width: "1000px",
      data: { event: event }
    });

    ref.componentInstance.compEmitter.subscribe(data => {
      console.log(data);
      this.croppedImage = ref.componentInstance.croppedImage;
      this.filename = ref.componentInstance.filename;
      this.filetype = ref.componentInstance.filetype;
      this.filesize = ref.componentInstance.filesize;
      this.imageStatus.emit(data);
    });
    // ref.afterClosed().subscribe(() => {
    //   this.croppedImage = ref.componentInstance.croppedImage;
    //   console.log("cropped image loaded", this.croppedImage);
    //   this.closeEmitter.emit("imgCropperClosed");
    // });
    return ref;
  }
}
@Component({
  selector: "dialog-content-img-cropper-example-dialog",

  templateUrl: "./img-cropper-template.html",
  styleUrls: ["./img-cropper-scss.scss"]
})
export class ImageCropperComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  imageChangedEvent: any = this.data.event;
  croppedImage: any = "";

  compEmitter: EventEmitter<any> = new EventEmitter();

  filename = this.data.event.target.files.item(0)
    ? this.data.event.target.files.item(0).name
    : "";
  filesize = this.data.event.target.files.item(0)
    ? this.data.event.target.files.item(0).size
    : "";
  filetype = this.data.event.target.files.item(0)
    ? this.data.event.target.files.item(0).type
    : "";

  imageCropped(event: ImageCroppedEvent) {
    // console.log("image cropped");
    this.croppedImage = event.base64;
  }
  imageLoaded() {}
  cropperReady() {}
  loadImageFailed() {}

  addCroppedImage() {
    this.compEmitter.emit("imageLoaded");
  }
  removeImage() {
    this.data["event"].target.value = "";
    this.compEmitter.emit("imageCancelled");
  }
}
