import * as paper from 'paper';
import { HistoryService } from '../../history/history.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface ToolHandler {
    activate(): void;
    getName(): string;
    onMouseDownCanvas(event: any);
    onMouseUpCanvas(event: any);
    onMouseMoveCanvas(event: any);
    onMouseMovePaperObject(event: any);
    setColor(color: string);
    itemAdded(): Observable<paper.Item>;
    itemUpdated(): Observable<paper.Item>;
}

export abstract class AbstractToolHandler implements ToolHandler {
    protected color: string                   = '#ff0000';
    protected strokeWidth: number             = 5;
              addItem: Subject<paper.Path>    = new BehaviorSubject<paper.Path>(undefined);
              updateItem: Subject<paper.Path> = new BehaviorSubject<paper.Path>(undefined);

    protected notifyAddItem(item: paper.Path) {
        this.addItem.next(item);
    }

    protected notifyUpdateItem(item: paper.Path) {
        this.updateItem.next(item);
    }

    itemAdded(): Observable<paper.Path> {
        return this.addItem;
    }

    itemUpdated(): Observable<paper.Path> {
        return this.updateItem;
    }

    setColor(color: string) {
        this.color = color;
    }

    activate(): void {
        throw new Error('Method not implemented.');
    }

    getName(): string {
        throw new Error('Method not implemented.');
    }

    onMouseDownCanvas(event: any) {
        throw new Error('Method not implemented.');
    }

    onMouseUpCanvas(event: any) {
        throw new Error('Method not implemented.');
    }

    onMouseMoveCanvas(event: any) {
        throw new Error('Method not implemented.');
    }

    onMouseMovePaperObject(event: any) {
        console.log('Not implemented');
    }

}

export class SelectToolHandler extends AbstractToolHandler {
    private selectedSegment: paper.Segment;
    private selectedPath: paper.Path;
    private mouseDown: boolean = false;
    private hitOptions         = {
        segments : true,
        stroke   : true,
        fill     : false,
        tolerance: 5
    };

    constructor(private historyService: HistoryService) {
        super()
    }

    getName(): string {
        return 'select';
    }

    onMouseUpCanvas(event: any) {
        this.mouseDown = false;
        this.notifyUpdateItem(this.selectedPath);
        this.historyService.add(this.selectedPath);
    }

    onMouseMoveCanvas(event: any) {
        paper.project.activeLayer.selected = false;
        event.target.style.cursor          = 'crosshair';
        if (this.mouseDown === true) {
            let point = new paper.Point(event.offsetX, event.offsetY);
            if (this.selectedSegment) {
                this.selectedSegment.point = point;
                // this.selectedPath.smooth();
            } else if (this.selectedPath) {
                this.selectedPath.position = point;
            }
        }
    }

    onMouseDownCanvas(event: any) {
        this.mouseDown                     = true;
        let { hitResult, point }           = this.getHitResult(event);
        paper.project.activeLayer.selected = false;
        if (hitResult && hitResult.item)
            hitResult.item.selected = true;
        if (event.altKey === true) {
            if (hitResult.type == 'segment') {
                hitResult.segment.remove();
            }
            return;
        }

        if (hitResult) {
            this.selectedPath = hitResult.item as paper.Path;
            if (hitResult.type == 'segment') {
                this.selectedSegment = hitResult.segment;
            } else if (hitResult.type == 'stroke') {
                let location         = hitResult.location;
                this.selectedSegment = this.selectedPath.insert(location.index + 1, point);
                // path.smooth();
            }
            hitResult.item.bringToFront();
        }
    }

    private getHitResult(event: any) {
        let point     = new paper.Point(event.offsetX, event.offsetY);
        let hitResult = paper.project.hitTest(point, this.hitOptions);
        return { hitResult, point };
    }

    onMouseMovePaperObject(event: any) {
        paper.project.activeLayer.selected = false;
        let { hitResult }                  = this.getHitResult(event.event);
        if (hitResult) {
            if (event.event.altKey) {
                event.event.target.style.cursor = 'url(\'assets/img/eraser.png\'), auto';
            } else {
                event.event.target.style.cursor = 'move';
            }
            event.target.selected = true;
        }
    }

}

export class LineToolHandler extends AbstractToolHandler {
    private mouseDown: boolean = false;
    private line: paper.Path;

    constructor(private selectToolHandler: SelectToolHandler) {
        super();
    }

    getName(): string {
        return 'line';
    }

    onMouseMoveCanvas(event: any) {
        if (this.mouseDown === true) {
            let point                   = new paper.Point(event.offsetX, event.offsetY);
            this.line.segments[1].point = point;
        }
    }

    onMouseDownCanvas(event: any) {
        let that              = this;
        this.mouseDown        = true;
        let point             = new paper.Point(event.offsetX, event.offsetY);
        this.line             = new paper.Path.Line(point, new paper.Point(point.x + 2, point.y + 2));
        console.log(paper.project);
        this.line.data.name   = 'Line';
        this.line.data.id     = 'line_' + new Date().getTime();
        this.line.strokeColor = this.color;
        this.line.strokeWidth = this.strokeWidth;
        this.line.onMouseMove = function (event) {
            that.selectToolHandler.onMouseMovePaperObject(event);
        }
    }

    onMouseUpCanvas(event: any) {
        this.mouseDown = false;
        this.notifyAddItem(this.line);
    }
}

export class RectangleToolHandler extends AbstractToolHandler {
    private mouseDown: boolean = false;
    private rectangle: paper.Path;

    constructor(private selectToolHandler: SelectToolHandler) {
        super();
    }

    getName(): string {
        return 'rectangle';
    }

    onMouseDownCanvas(event: any) {
        let that                   = this;
        this.mouseDown             = true;
        let point                  = new paper.Point(event.offsetX, event.offsetY);
        this.rectangle             = new paper.Path.Rectangle(point, new paper.Point(point.x + 2, point.y + 2));
        this.rectangle.data.name   = 'Rectangle';
        this.rectangle.data.id     = 'rectangle_' + new Date().getTime();
        this.rectangle.strokeColor = this.color;
        this.rectangle.strokeWidth = this.strokeWidth;
        this.rectangle.onMouseMove = function (event) {
            that.selectToolHandler.onMouseMovePaperObject(event);
        }
    }

    onMouseUpCanvas(event: any) {
        this.mouseDown = false;
        this.notifyAddItem(this.rectangle);
    }

    onMouseMoveCanvas(event: any) {
        if (this.mouseDown === true) {
            let point                          = new paper.Point(event.offsetX, event.offsetY);
            this.rectangle.segments[1].point.y = point.y;
            this.rectangle.segments[2].point   = point;
            this.rectangle.segments[3].point.x = point.x;
        }
    }

}
