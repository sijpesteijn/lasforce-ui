
export interface Coordinate {
    coordinate: number[];
}

export interface Segment {
    color: number[];
    coordinates: Coordinate[];
}

export interface Frame {
    id: number;
    repeat: number;
    name: string;
    total_segments: number;
    segments: Segment[];
}

export class Animation {
    id: number;
    repeat: number;
    name: string;
    last_update: number;
    total_frames: number;
    frame_time: number;
    current_frame: number;
    frames: Frame[];

    constructor() {
        this.id = 0;
        this.frames = [];
    }
}