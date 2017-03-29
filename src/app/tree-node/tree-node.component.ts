import { Component, Input } from '@angular/core';
import { TreeNode } from 'angular-tree-component/dist/models/tree-node.model';

@Component({
    selector: 'custom-tree-node',
    template: require('./tree-node.html')
})
export class CustomTreeNodeComponent {
    @Input('node') node: any;
    private editMode: boolean = false;
}