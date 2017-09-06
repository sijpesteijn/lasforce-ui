import { Injectable } from '@angular/core';
import * as paper from 'paper';

@Injectable()
export class HistoryService {
    private history: paper.Item[] = [];
    private historyIndex: number = 0;

    clear() {
        this.history = [];
        this.historyIndex = 0;
    }

    add(item: paper.Item) {
        if (this.historyIndex < this.history.length) {
            this.history = this.history.slice(this.historyIndex, this.history.length);
        }
        this.historyIndex = this.history.push(item);
    }

    undo() {
        if (this.historyIndex > 0) {
            let item = this.history[this.historyIndex - 1];
            item.remove();
            this.historyIndex--;
        }
    }

    redo() {
        if (this.historyIndex < this.history.length) {
            let item = this.history[this.historyIndex++];
            paper.project.activeLayer.addChild(item);
        }
    }

    canUndo(): boolean {
        return this.historyIndex > 0;
    }

    canRedo(): boolean {
        return this.historyIndex < this.history.length;
    }
}