import { Directive, Input, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { Control } from './control.component';

@Directive({
    selector: 'widget-control'
})
export class WidgetControlDirective implements AfterViewInit {
    @Input('control')
    control: any;
    private componentFactory: ComponentFactory<any>;

    constructor(private viewContainer: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.control);
            let createdComponent = this.viewContainer.createComponent(this.componentFactory);
        }, 0);
    }
}
