import { Injectable } from "@angular/core";
import * as _moment from "moment";
import { DatePipe } from "@angular/common";
import { StateService } from "./state.service";
import { GetDataFromApiService } from "./get-data-from-api.service";
import Swal from "sweetalert2";

@Injectable()
export class CommonFunctionService {
  constructor(
    private state: StateService,
    private api: GetDataFromApiService
  ) {}

  getObjIndexInArray(arr, key, value) {
    var _foundIndex = -1;
    arr.forEach((item, index) => {
      if (item[key] === value) {
        _foundIndex = index;
        // return;
      }
    });
    return _foundIndex;
  }

  dateFormat(date: Date, format = "yyyy-MM-dd") {
    var datePipe = new DatePipe("en-US");
    return datePipe.transform(date, format);
  }

  checkGASpermissionForLocation(formId, locationId, companyId) {
    let userDetails = JSON.parse(localStorage.getItem("ngStorage-user"));
    let userId = userDetails.detail.UserId;
    let request = { formId, companyLocationId: locationId, companyId, userId };
    return this.api.post(
      { request },
      "organizationChartModule/checkIfUserAuthorisedToCreateStaffEmp",
      { module: "humanResource" }
    );
  }

  simpleSweetAlert = (
    _header: any,
    _content: any,
    _status: any = "success"
  ) => {
    Swal.fire(_header, _content, _status);
  };

  sweetAlertWithActions = (
    _title: any,
    _text: any,
    _icon: any,
    _confirmButtonText: any,
    _cancelButtonText: any,
    _showCancelButton: boolean = true
  ) => {
    return Swal.fire({
      title: _title,
      text: _text,
      icon: _icon,
      showCancelButton: _showCancelButton,
      confirmButtonText: _confirmButtonText,
      cancelButtonText: _cancelButtonText
    });
  };
}
