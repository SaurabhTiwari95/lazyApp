import { Injectable } from "@angular/core";
import { configData } from "../../config";

@Injectable()
export class AngOneCallerService {
  constructor() {
    this.ng7Window = window;
  }

  ng7Window;

  openForm(link) {
    window.location.href = link;
    window.location.reload();
  }

  fetchLink(hashlink) {
    return configData["basePathForProduction"] + hashlink;
  }

  OpenNgOneWithToken(url) {
    return this.openAngOneWindow(
      url,
      "ngStorage-user",
      JSON.parse(localStorage.getItem("ngStorage-user"))
    );
  }

  sendDataToNgOne(window, keyForData: string, dataToSend: Object) {
    let sendObj = JSON.stringify(dataToSend);
    let messageToSend = keyForData + "-->ngSevenToOneData-->" + sendObj;
    window.postMessage(messageToSend, origin);
  }

  openAngOneWindow(url: string, keyForData: string, dataToSend: Object) {
    let newWindow = window.open(url);
    let origin = url.split("#")[0] + "/";
    console.log("url.split gave", origin);

    let sendObj = JSON.stringify(dataToSend);
    let messageToSend =
      keyForData +
      "-->ngSevenToOneData-->" +
      sendObj +
      "-->ngSevenToOneData-->" +
      url;

    setTimeout(() => {
      newWindow.postMessage(messageToSend, origin);
      console.log(dataToSend);
    }, 900);
    return newWindow;
  }
}
