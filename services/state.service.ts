import { Injectable, OnInit, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "./modal.service";
@Injectable()
export class StateService implements OnInit {
  constructor(private router: Router, private modal: ModalService) {
    router.events.subscribe(value => {});
  }

  ngOnInit() {}

  checkLogInStatus: () => boolean = () => {
    let cred = this.getSessionState();
    if (cred && cred["detail"] && cred["access_token"]) return true;
    else return false;
  };

  get isLoggedIn() {
    let cred = this.getSessionState();
    if (cred && cred["detail"] && cred["access_token"]) return true;
    else return false;
  }

  userName: any;

  sessionState: any;

  companyListData: any;

  showProgressBar: boolean = false;

  progressBarValue: number = 0;

  progressBarInt1: any;

  progressBarInt2: any;

  userDetails = JSON.parse(localStorage.getItem("ngStorage-user"));

  getObjFromArr(key, value, arr: any[]) {
    let result = arr.filter(elem => {
      if (elem[key] == value) {
        return true;
      } else {
        return false;
      }
    });
    return result[0];
  }

  progressBarInt3
  progressBarStart() {
    this.showProgressBar = true;
    if(this.progressBarValue == 0 || this.progressBarValue == undefined)this.progressBarValue = 10;
    if(this.progressBarValue >= 100)return;
    if (this.progressBarValue < 50) {
      // this.checkProgressBar(this.progressBarInt1, this.progressBarInt2);
      this.progressBarInt1 = setInterval(() => {
        this.progressBarValue += 10;
      },800);
    } else if (this.progressBarValue < 75) {
      //clearInterval(this.progressBarInt1);
      // this.checkProgressBar(this.progressBarInt1, this.progressBarInt2);
      this.progressBarInt2 = setInterval(() => {
        this.progressBarValue += 8;
      }, 800);
    }
    else{
      this.progressBarValue += 6;
      this.progressBarStart();
      // this.progressBarInt3 = setInterval(() => {
      // },800);
    }
  }

  // checkProgressBar(int1, int2) {
  //   if (int1 && this.progressBarValue > 50) {
  //     clearInterval(int1);
  //     int1 = false;
  //     this.progressBarStart();
  //   } else if (int2 && this.progressBarValue > 75) {
  //     clearInterval(int2);
  //     int2 = false;
  //   }
  // }

  progressBarStop() {
    this.progressBarValue = 100;
    //if (this.progressBarInt1) clearInterval(this.progressBarInt1);
    //clearInterval(this.progressBarInt1);
    //if (this.progressBarInt2) clearInterval(this.progressBarInt2);
    //clearInterval(this.progressBarInt2);
    setTimeout(() => {
      this.showProgressBar = false;
      this.progressBarValue = 0;
    },500);
    clearInterval(this.progressBarInt1);
    clearInterval(this.progressBarInt2);
   // clearInterval(this.progressBarInt3);
  }

  getSessionState() {
    return JSON.parse(localStorage.getItem("ngStorage-user"));
  }

  setSessionState(obj) {
    let objectToWrite = JSON.stringify(obj);
    localStorage.setItem("ngStorage-user", objectToWrite);
    return new Promise((res, rej) => {
      if (objectToWrite == localStorage.getItem("ngStorage-user")) {
        res(true);
      } else {
        res(false);
      }
    });
  }

  getCompanyDetails() {
    let company = JSON.parse(localStorage.getItem("ngStorage-tmpData"));
    return company["detailCompany"];
  }

  checkPermissionsForComponent(permissionsToCheck: string[]) {
    let credentials = this.getSessionState();
    let userPermissions = credentials["user_permissions"];
    for (let i = 0; i < permissionsToCheck.length; i++) {
      for (let j = 0; j < userPermissions.length; j++) {
        if (
          this.comparePermissions(userPermissions[j], permissionsToCheck[i])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  private comparePermissions(userPerm, directivePerm): boolean {
    let userPermArr = userPerm.split("P");
    let DirectivePermArr = directivePerm.split("P");

    // formId mismatch return false
    if (userPermArr[0] != DirectivePermArr[0]) {
      return false;
    }

    // compare weight if forms match
    else {
      let userPermWeight = this.calculatePermWeightage(userPerm);
      let dirPermWeight = this.calculatePermWeightage(directivePerm);
      if (userPermWeight != dirPermWeight) {
        return userPermWeight > dirPermWeight;
      } else {
        return userPermArr[1] == DirectivePermArr[1];
      }
    }
  }

  private calculatePermWeightage(perm) {
    let weight = 0;
    let permArr = perm.split("P");
    let softperms = permArr[1];
    let formId = permArr[0];
    switch (softperms) {
      case "111":
        weight = 5;
        break;
      case "110":
        weight = 3;
        break;
      case "101":
        weight = 3;
        break;
      case "100":
        weight = 1;
    }
    return weight;
  }
}
