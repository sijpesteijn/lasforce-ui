"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var paper = require("paper");
var rxjs_1 = require("rxjs");
var AbstractToolHandler = (function () {
    function AbstractToolHandler() {
        this.color = '#ff0000';
        this.strokeWidth = 3;
        this.item = new rxjs_1.BehaviorSubject(undefined);
    }
    AbstractToolHandler.prototype.notifyItemAdd = function (item) {
        this.item.next(item);
    };
    AbstractToolHandler.prototype.itemAdded = function () {
        return this.item;
    };
    AbstractToolHandler.prototype.setColor = function (color) {
        this.color = color;
    };
    AbstractToolHandler.prototype.activate = function () {
        throw new Error('Method not implemented.');
    };
    AbstractToolHandler.prototype.getName = function () {
        throw new Error('Method not implemented.');
    };
    AbstractToolHandler.prototype.onMouseDownCanvas = function (event) {
        throw new Error('Method not implemented.');
    };
    AbstractToolHandler.prototype.onMouseUpCanvas = function (event) {
        throw new Error('Method not implemented.');
    };
    AbstractToolHandler.prototype.onMouseMoveCanvas = function (event) {
        throw new Error('Method not implemented.');
    };
    AbstractToolHandler.prototype.onMouseMovePaperObject = function (event) {
        console.log('Not implemented');
    };
    return AbstractToolHandler;
}());
exports.AbstractToolHandler = AbstractToolHandler;
var SelectToolHandler = (function (_super) {
    __extends(SelectToolHandler, _super);
    function SelectToolHandler(historyService) {
        var _this = _super.call(this) || this;
        _this.historyService = historyService;
        _this.mouseDown = false;
        _this.hitOptions = {
            segments: true,
            stroke: true,
            fill: false,
            tolerance: 5
        };
        return _this;
    }
    SelectToolHandler.prototype.getName = function () {
        return 'select';
    };
    SelectToolHandler.prototype.onMouseUpCanvas = function (event) {
        this.mouseDown = false;
        this.historyService.add(this.selectedPath);
    };
    SelectToolHandler.prototype.onMouseMoveCanvas = function (event) {
        paper.project.activeLayer.selected = false;
        event.target.style.cursor = 'crosshair';
        if (this.mouseDown === true) {
            var point = new paper.Point(event.offsetX, event.offsetY);
            if (this.selectedSegment) {
                this.selectedSegment.point = point;
                // this.selectedPath.smooth();
            }
            else if (this.selectedPath) {
                this.selectedPath.position = point;
            }
        }
    };
    SelectToolHandler.prototype.onMouseDownCanvas = function (event) {
        this.mouseDown = true;
        var _a = this.getHitResult(event), hitResult = _a.hitResult, point = _a.point;
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
            this.selectedPath = hitResult.item;
            if (hitResult.type == 'segment') {
                this.selectedSegment = hitResult.segment;
            }
            else if (hitResult.type == 'stroke') {
                var location_1 = hitResult.location;
                this.selectedSegment = this.selectedPath.insert(location_1.index + 1, point);
                // path.smooth();
            }
            hitResult.item.bringToFront();
        }
    };
    SelectToolHandler.prototype.getHitResult = function (event) {
        var point = new paper.Point(event.offsetX, event.offsetY);
        var hitResult = paper.project.hitTest(point, this.hitOptions);
        return { hitResult: hitResult, point: point };
    };
    SelectToolHandler.prototype.onMouseMovePaperObject = function (event) {
        paper.project.activeLayer.selected = false;
        var hitResult = this.getHitResult(event.event).hitResult;
        if (hitResult) {
            if (event.event.altKey) {
                event.event.target.style.cursor = 'url(\'assets/img/eraser.png\'), auto';
            }
            else {
                event.event.target.style.cursor = 'move';
            }
            event.target.selected = true;
        }
    };
    return SelectToolHandler;
}(AbstractToolHandler));
exports.SelectToolHandler = SelectToolHandler;
var LineToolHandler = (function (_super) {
    __extends(LineToolHandler, _super);
    function LineToolHandler(selectToolHandler) {
        var _this = _super.call(this) || this;
        _this.selectToolHandler = selectToolHandler;
        _this.mouseDown = false;
        return _this;
    }
    LineToolHandler.prototype.getName = function () {
        return 'line';
    };
    LineToolHandler.prototype.onMouseMoveCanvas = function (event) {
        if (this.mouseDown === true) {
            var point = new paper.Point(event.offsetX, event.offsetY);
            this.line.segments[1].point = point;
        }
    };
    LineToolHandler.prototype.onMouseDownCanvas = function (event) {
        var that = this;
        this.mouseDown = true;
        var point = new paper.Point(event.offsetX, event.offsetY);
        this.line = paper.Path.Line(point, new paper.Point(point.x + 2, point.y + 2));
        this.line.data.name = 'Line';
        this.line.strokeColor = this.color;
        this.line.strokeWidth = this.strokeWidth;
        this.line.onMouseMove = function (event) {
            that.selectToolHandler.onMouseMovePaperObject(event);
        };
    };
    LineToolHandler.prototype.onMouseUpCanvas = function (event) {
        this.mouseDown = false;
        this.notifyItemAdd(this.line);
    };
    return LineToolHandler;
}(AbstractToolHandler));
exports.LineToolHandler = LineToolHandler;
var RectangleToolHandler = (function (_super) {
    __extends(RectangleToolHandler, _super);
    function RectangleToolHandler(selectToolHandler) {
        var _this = _super.call(this) || this;
        _this.selectToolHandler = selectToolHandler;
        _this.mouseDown = false;
        return _this;
    }
    RectangleToolHandler.prototype.getName = function () {
        return 'rectangle';
    };
    RectangleToolHandler.prototype.onMouseDownCanvas = function (event) {
        var that = this;
        this.mouseDown = true;
        var point = new paper.Point(event.offsetX, event.offsetY);
        this.rectangle = paper.Path.Rectangle(point, new paper.Point(point.x + 2, point.y + 2));
        this.rectangle.data.name = 'Rectangle';
        this.rectangle.strokeColor = this.color;
        this.rectangle.strokeWidth = this.strokeWidth;
        this.rectangle.onMouseMove = function (event) {
            that.selectToolHandler.onMouseMovePaperObject(event);
        };
    };
    RectangleToolHandler.prototype.onMouseUpCanvas = function (event) {
        this.mouseDown = false;
        this.notifyItemAdd(this.rectangle);
    };
    RectangleToolHandler.prototype.onMouseMoveCanvas = function (event) {
        if (this.mouseDown === true) {
            var point = new paper.Point(event.offsetX, event.offsetY);
            this.rectangle.segments[1].point.y = point.y;
            this.rectangle.segments[2].point = point;
            this.rectangle.segments[3].point.x = point.x;
        }
    };
    return RectangleToolHandler;
}(AbstractToolHandler));
exports.RectangleToolHandler = RectangleToolHandler;
