import {
    Component, ComponentFactory, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import { WidgetMetadata } from '../../dashboard';

@Component({
    selector: 'widget-header',
    template: require('./widget-header.html'),
    styles: [require('./widget-header.scss')]
})
export class WidgetHeaderComponent {
    @Input('widgetMetadata')
    widgetMetadata: WidgetMetadata;
    @Input('sharedService')
    sharedService: string;

    private componentFactory: ComponentFactory<any>;
    @ViewChild('location', {read: ViewContainerRef}) location:ViewContainerRef;

    constructor(private viewContainer: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngAfterViewInit() {
        // setTimeout(() => {
        //     this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
        //     let createdComponent = this.location.createComponent(this.componentFactory);
        // }, 0);
    }
}