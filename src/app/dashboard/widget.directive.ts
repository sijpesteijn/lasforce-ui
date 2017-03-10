import { Directive, Input, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentFactory } from '@angular/core';

@Directive({
    selector: 'widget'
})
export class Widget implements AfterViewInit {

    @Input('component')
    component: any;

    private componentFactory: ComponentFactory<any>;

    constructor(private viewContainer: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
            let createdComponent = this.viewContainer.createComponent(this.componentFactory, 0, this.viewContainer.injector);
        }, 0);

    }
}
