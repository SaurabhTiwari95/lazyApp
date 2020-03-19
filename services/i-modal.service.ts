import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  ElementRef,
  ComponentFactory,
  Renderer2
} from "@angular/core";
import { IModalComponentComponent } from "src/app/shared/components/i-modal-component/i-modal-component.component";

@Injectable()
export class IModalService {
  constructor(private cfr: ComponentFactoryResolver) {}

  modalContainerselfRef: ElementRef;

  modalContainer: ViewContainerRef;

  modalBackDrop: ElementRef;

  factory: ComponentFactory<any>;

  // modalCompRef: ComponentRef<any>
  openIModal(
    containerSelf: ElementRef,
    container: ViewContainerRef,
    backdrop: ElementRef,
    renderer: Renderer2
  ) {
    this.modalContainerselfRef = containerSelf;
    this.modalContainer = container;
    this.modalBackDrop = backdrop;
    this.factory = this.cfr.resolveComponentFactory(IModalComponentComponent);
    console.log(this.factory.componentType);
    console.log(this.factory.selector);
    let compRef = this.modalContainer.createComponent(this.factory);
    renderer.removeClass(
      this.modalContainerselfRef.nativeElement,
      "hide-i-modal"
    );
    renderer.removeClass(this.modalBackDrop.nativeElement, "hide-i-modal");
    renderer.setStyle(this.modalBackDrop.nativeElement, "z-index", "900");
    renderer.setStyle(compRef.location.nativeElement, "z-index", "902");
  }

  destroyModal() {}
}
