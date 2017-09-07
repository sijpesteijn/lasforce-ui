"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dashboard_service_1 = require("../../dashboard/dashboard.service");
var paper = require("paper");
var AnimationCanvasComponent = (function () {
    function AnimationCanvasComponent(events, animationService, historyService) {
        this.events = events;
        this.animationService = animationService;
        this.historyService = historyService;
        this.status = 'loaded';
        this.paperAni = {
            layers: []
        };
        this.zoom = 1;
    }
    AnimationCanvasComponent.prototype.onMouseDown = function (event) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseDownCanvas(event);
        }
    };
    AnimationCanvasComponent.prototype.onMouseUp = function (event) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseUpCanvas(event);
        }
    };
    AnimationCanvasComponent.prototype.onMouseMove = function (event) {
        if (this.animation && this.toolHandler) {
            this.toolHandler.onMouseMoveCanvas(event);
        }
    };
    AnimationCanvasComponent.prototype.onMouseWheelChrome = function (event) {
        this.mouseWheelFunc(event);
    };
    AnimationCanvasComponent.prototype.onMouseWheelFirefox = function (event) {
        this.mouseWheelFunc(event);
    };
    AnimationCanvasComponent.prototype.onMouseWheelIE = function (event) {
        this.mouseWheelFunc(event);
    };
    AnimationCanvasComponent.prototype.mouseWheelFunc = function (evnt) {
        var event = window.event || evnt; // old IE support
        if (event.altKey === true) {
            var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
            if (delta > 0) {
                this.zoomUp();
            }
            else if (delta < 0) {
                this.zoomDown();
            }
            this.zoom = paper.view.zoom;
            // for IE
            event.returnValue = false;
            // for Chrome and Firefox
            if (event.preventDefault) {
                event.preventDefault();
            }
        }
        else if (event.shiftKey === true) {
            var orgCenter = paper.view.center;
            console.log(orgCenter);
            // paper.view.center = new paper.Point(orgCenter.x + evnt.deltaX, orgCenter.y - evnt.deltaY);
        }
    };
    AnimationCanvasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.events.subscribe(function (event) {
            if (event.key === dashboard_service_1.ANIMATION_FRAME_SELECTED) {
                _this.switchLayers(_this.animation.current_frame, event.value);
            }
            else if (event.key === dashboard_service_1.ANIMATION_NEXT_FRAME) {
                var currentFrame = _this.animation.current_frame;
                var newFrame = 0;
                if (currentFrame < _this.animation.frames.length - 1) {
                    newFrame = currentFrame + 1;
                }
                _this.switchLayers(currentFrame, newFrame);
            }
            else if (event.key === dashboard_service_1.ANIMATION_PREV_FRAME) {
                var currentFrame = _this.animation.current_frame;
                var newFrame = _this.animation.total_frames - 1;
                if (currentFrame > 0) {
                    newFrame = currentFrame - 1;
                }
                _this.switchLayers(currentFrame, newFrame);
            }
            else if (event.key === dashboard_service_1.ANIMATION_LAST_FRAME) {
                _this.switchLayers(_this.animation.current_frame, _this.animation.total_frames - 1);
            }
            else if (event.key === dashboard_service_1.ANIMATION_FIRST_FRAME) {
                _this.switchLayers(_this.animation.current_frame, 0);
            }
        });
        this.animationService.getAnimation().subscribe(function (animation) {
            if (animation.id !== 0)
                _this.loadAnimation(animation);
        });
    };
    AnimationCanvasComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        paper.install(window);
        paper.setup(this.canvas.nativeElement);
        this.events.subscribe(function (event) {
            if (event.key === 'selectTool') {
                paper.project.activeLayer.selected = false;
                _this.setToolHandler(event.value);
            }
            if (event.key === dashboard_service_1.LOAD_ANIMATION) {
                _this.status = 'loading';
            }
        });
    };
    AnimationCanvasComponent.prototype.loadAnimation = function (animation) {
        var _this = this;
        paper.project.clear();
        this.animation = animation;
        this.animation.frames.forEach(function (frame) {
            _this.paperAni.layers.push(_this.createLayer(frame));
        });
        paper.project.layers[this.animation.current_frame].activate();
        paper.project.layers[this.animation.current_frame].visible = true;
        this.paperAni.layers[this.animation.current_frame].visible = true;
        this.sharedService.setPaperAnimation(this.paperAni);
        this.status = 'loaded';
        paper.project.view.update();
    };
    AnimationCanvasComponent.prototype.createLayer = function (frame) {
        var _this = this;
        var layer = new paper.Layer();
        var that = this;
        layer.activate();
        layer.visible = false;
        frame.segments.forEach(function (segment) {
            var path = new paper.Path();
            var color = segment.color;
            segment.coordinates.forEach(function (coordinate) {
                var point = new paper.Point(_this.convertUpCoordinate(coordinate[0]), _this.convertUpCoordinate(coordinate[1]));
                path.add(point);
            });
            path.strokeColor = new paper.Color(color[0], color[1], color[2]);
            path.strokeWidth = 5;
            path.strokeCap = 'square';
            path.closed = segment.closed;
            path.onMouseMove = function (event) {
                that.toolHandler.onMouseMovePaperObject(event);
            };
        });
        return layer;
    };
    AnimationCanvasComponent.prototype.setToolHandler = function (toolHandler) {
        var _this = this;
        this.toolHandler = toolHandler;
        this.toolHandler.itemAdded().subscribe(function (path) {
            if (path) {
                _this.historyService.add(path);
                var colorStr = path.strokeColor.toCSS(false).split(',');
                var seg_1 = {
                    closed: path.closed,
                    color: [
                        Number(colorStr[0].substring(4)),
                        Number(colorStr[1]),
                        Number(colorStr[2].substring(0, colorStr[2].length - 1))
                    ],
                    coordinates: []
                };
                path.segments.forEach(function (segment) {
                    var coordinate = [];
                    coordinate.push(_this.convertDownCoordinate(segment.point.x));
                    coordinate.push(_this.convertDownCoordinate(segment.point.y));
                    seg_1.coordinates.push(coordinate);
                });
                _this.animation.frames[0].segments.push(seg_1);
                _this.sharedService.setPaperAnimation(_this.paperAni);
                _this.animationService.saveAnimation(_this.animation);
            }
        });
    };
    AnimationCanvasComponent.prototype.convertUpCoordinate = function (nr) {
        return (nr + 32768) / 100;
    };
    AnimationCanvasComponent.prototype.convertDownCoordinate = function (nr) {
        return (nr * 100) - 32768;
    };
    AnimationCanvasComponent.prototype.getZoomPercentage = function () {
        return Math.round(this.zoom * 100);
    };
    AnimationCanvasComponent.prototype.zoomDown = function () {
        if (paper.view.zoom > 0.4) {
            paper.view.zoom = paper.view.zoom - 0.1;
            this.zoom = paper.view.zoom;
        }
    };
    AnimationCanvasComponent.prototype.zoomUp = function () {
        if (paper.view.zoom < 4) {
            paper.view.zoom = paper.view.zoom + 0.1;
            this.zoom = paper.view.zoom;
        }
    };
    AnimationCanvasComponent.prototype.switchLayers = function (currentFrame, newFrame) {
        paper.project.layers[currentFrame].visible = false;
        paper.project.layers[newFrame].visible = true;
        paper.project.layers[newFrame].activate();
        this.animation.current_frame = newFrame;
    };
    return AnimationCanvasComponent;
}());
__decorate([
    core_1.ViewChild('animation')
], AnimationCanvasComponent.prototype, "canvas", void 0);
__decorate([
    core_1.HostListener('mousedown', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseDown", null);
__decorate([
    core_1.HostListener('mouseup', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseUp", null);
__decorate([
    core_1.HostListener('mousemove', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseMove", null);
__decorate([
    core_1.HostListener('mousewheel', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseWheelChrome", null);
__decorate([
    core_1.HostListener('DOMMouseScroll', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseWheelFirefox", null);
__decorate([
    core_1.HostListener('onmousewheel', ['$event'])
], AnimationCanvasComponent.prototype, "onMouseWheelIE", null);
AnimationCanvasComponent = __decorate([
    core_1.Component({
        selector: 'animation_canvas',
        template: require('./animation_canvas.html'),
        styles: [require('./animation_canvas.scss')]
    })
], AnimationCanvasComponent);
exports.AnimationCanvasComponent = AnimationCanvasComponent;
