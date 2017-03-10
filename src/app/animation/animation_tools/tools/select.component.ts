import * as paper from 'paper';
import { PaperTool } from './paper.component';

export class SelectTool implements PaperTool {
    private tool: paper.Tool = new paper.Tool();

    constructor() {
        // this.tool.activate();
        // this.tool.onMouseDown(event => {
        //     console.log('MouseDown ', event);
        // });
        // this.tool.onMouseDrag(event => {
        //     console.log('MouseDrag ', event);
        // });

    }
}