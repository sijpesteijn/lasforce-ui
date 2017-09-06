import {Component, ComponentFactory, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import { WidgetMetadata } from '../dashboard';

@Component({
    selector: 'widget-container',
    template: require('./widget-container.html'),
    styles: [require('./widget.scss')]
})
export class WidgetContainerComponent {
    widgetMetadata: WidgetMetadata;
    sharedService: string;
    private componentFactory: ComponentFactory<any>;
    @ViewChild('location', {read: ViewContainerRef}) location:ViewContainerRef;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetMetadata.component);
            let createdComponent  = this.location.createComponent(this.componentFactory);
            // if (this.sharedService) {
            //     createdComponent.instance.sharedService = this.location.injector.get(this.sharedService);
            // }
        }, 0);
    }


}