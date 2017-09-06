import {
    Component, ComponentFactory, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef
} from '@angular/core';
import { PlayerComponent } from '../../../player/player.component';
import { WidgetMetadata } from '../../dashboard';

@Component({
    selector: 'widget-content',
    template: require('./widget-content.html'),
    styles: [require('../widget.scss')]
})
export class WidgetContentComponent {
    // @Input('widgetMetadata')
    // widgetMetadata: WidgetMetadata;
    // @Input('sharedService')
    // sharedService: string;
    // private componentFactory: ComponentFactory<any>;
    // @ViewChild('location', {read: ViewContainerRef}) location:ViewContainerRef;
    //
    // constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    // }
    //
    // ngAfterViewInit() {
    //     setTimeout(() => {
    //         this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widgetMetadata.component);
    //         let createdComponent  = this.location.createComponent(this.componentFactory);
    //         // if (this.sharedService) {
    //         //     createdComponent.instance.sharedService = this.location.injector.get(this.sharedService);
    //         // }
    //     }, 0);
    // }
    //
}