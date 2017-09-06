import { Directive, Input, ViewContainerRef, AfterViewInit, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { WidgetMetadata } from './dashboard';

@Directive({
    selector: 'widget'
})
export class WidgetDirective implements AfterViewInit {

    @Input('widgetMetadata')
    widgetMetadata: WidgetMetadata;
    @Input('sharedService')
    sharedService: string;

    private componentFactory: ComponentFactory<any>;

    constructor(private viewContainer: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(WidgetContainerComponent);
            let createdComponent = this.viewContainer.createComponent(this.componentFactory, 0, this.viewContainer.injector);
            createdComponent.instance.widgetMetadata = this.widgetMetadata;
            // if (this.sharedService) {
            //     createdComponent.instance.sharedService = this.viewContainer.injector.get(this.sharedService);
            // }
        }, 0);

    }
}
