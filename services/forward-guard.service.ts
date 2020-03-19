import { Injectable } from "@angular/core";
import { StateService } from "./state.service";
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ForwardGuardService
  implements CanActivate, CanActivateChild, CanLoad {
  constructor(private state: StateService) {}

  canActivate() {
    console.log();
    return this.state.checkLogInStatus();
  }
  canActivateChild() {
    return this.state.checkLogInStatus();
  }
  canLoad() {
    return this.state.checkLogInStatus();
  }
}
