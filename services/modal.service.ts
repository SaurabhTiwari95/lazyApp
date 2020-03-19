import { Injectable, Component, Inject, EventEmitter } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";

@Injectable()
export class ModalService {
  constructor(public dialog: MatDialog) {}

  ref;
  okPressed = new EventEmitter();
  cancelPressed = new EventEmitter();
  openModal(title: string, content: string, link?) {
    this.ref = this.dialog.open(CustomModal, {
      data: { title, content, link }
    });
    let ref = this.ref;
    this.ref.componentInstance.okEmitter.subscribe(d => {
      this.okPressed.emit(d);
      console.log(d);
    });
    this.ref.componentInstance.cancelEmitter.subscribe(d => {
      this.cancelPressed.emit(d);
      console.log(d);
    });
    return ref;
  }
}

@Component({
  selector: "dialog-content-example-dialog",
  template: `
    <div mat-dialog-title>{{ data.title }}</div>
    <mat-dialog-content class="mat-typography">
      <p [innerHTML]="data.content">
        {{ data.content }}
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button
        (click)="cancelFired($event)"
        mat-button
        [mat-dialog-close]="true"
      >
        Cancel
      </button>
      <ng-container *ngIf="data.link">
        <button
          mat-button
          [mat-dialog-close]="true"
          [routerLink]="data.link"
          cdkFocusInitial
          (click)="okFired($event)"
        >
          Ok
        </button>
      </ng-container>
      <ng-container *ngIf="!data.link">
        <button
          (click)="okFired($event)"
          mat-button
          [mat-dialog-close]="true"
          cdkFocusInitial
        >
          Ok
        </button>
      </ng-container>
    </mat-dialog-actions>
  `
})
export class CustomModal {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  okEmitter = new EventEmitter();
  cancelEmitter = new EventEmitter();

  okFired(e) {
    this.okEmitter.emit("ok");
    this.okEmitter.complete();
  }

  cancelFired(e) {
    this.cancelEmitter.emit("cancel");
    this.cancelEmitter.complete();
  }
}
