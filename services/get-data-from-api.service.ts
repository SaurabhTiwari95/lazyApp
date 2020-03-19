import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEventType } from "@angular/common/http";
import { configData } from "../../config";
import { Observable, Subject } from "rxjs";
import { StateService } from "./state.service";
import { ModalService } from "./modal.service";
import { apiUrlObject, apiPubKeyObject } from "../../constants";
import { Router } from '@angular/router';

@Injectable()
export class GetDataFromApiService {
  constructor(
    private http: HttpClient,
    private state: StateService,
    private modal: ModalService,
    private router : Router
  ) {}

  post(params, paths, config?): Observable<any> {
    //
    //
    let responseSource = new Subject<any>();
    let observable = responseSource.asObservable();
    let credentials = JSON.parse(localStorage.getItem("ngStorage-user"));
    let accessToken;
    let publicKey;
    if (credentials) {
      accessToken = credentials["access_token"];

      if (config && config["module"]) {
        publicKey = apiPubKeyObject[config["module"]];
      } else {
        publicKey = credentials["publicKey"];
      }
      params["publicKey"] = publicKey;
      params["accessToken"] = accessToken;
    }

    //api path manupulation

    if (config && config["module"]) {
      let newPath = apiUrlObject[config["module"]] + paths;
      paths = newPath;
    }

    let address = paths;
    if (config && config["showAddress"])
      console.log(configData["basePathForApi"] + address);

    // request object
    let req = new HttpRequest(
      "POST",
      configData["basePathForApi"] + address,
      params,
      { reportProgress: true }
    );

    this.http.request(req).subscribe(
      e => {
        if (e.type == HttpEventType.DownloadProgress) {
          // console.log(e.loaded);
        }
        if (e.type == HttpEventType.Response) {
          let data = e.body;

          // replace access token if a new one comes

          if (credentials && data["access_token"]) {
            credentials["access_token"] = data["access_token"];

            localStorage.setItem("ngStorage-user", JSON.stringify(credentials));

            this.state.sessionState = credentials;
          } else {
            if (data["code"] == "invalid_token") {
              localStorage.clear();
              this.modal.openModal(
                "Session Expired !!!",
                "Your session has expired kindly login again!!",
                "login"
              );
              setTimeout(()=>{
                this.router.navigateByUrl('login')
              },1000)
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            } else if (data["code"] == "access_denied_no_form_access") {
              this.modal.openModal(
                "Access Denied !!!!",
                "You currently do not have access to visit this form(s).Please contact admin"
              );
            }
          }
          responseSource.next(data);
        }
      },
      err => {
        responseSource.next(err);
        // console.log("api call failed for payload", params);
        // console.log("error reported for api failure ", err);
      }
    );
    return observable;
  }

  login(params, ...path): Observable<any> {
    params["isAng7App"] = true;
    let responseSource = new Subject<any>();
    let observable = responseSource.asObservable();
    let address = path.join("/");
    this.http.post(configData["basePathForLogin"] + address, params).subscribe(
      data => {
        responseSource.next(data);
      },
      // err => {
      //   console.log("login api error", err);
      // }
    );
    return observable;
  }
}
