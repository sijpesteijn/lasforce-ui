
export interface Coordinate {
    coordinate: number[];
}

export interface Path {
    closed: boolean;
    color: number[];
    coordinates: Coordinate[];
}

export interface Frame {
    id: number;
    repeat: number;
    name: string;
    total_paths: number;
    paths: Path[];
}

export class Animation {
    id: number;
    repeat: number;
    name: string;
    last_update: number;
    total_frames: number;
    frame_time: number;
    current_frame = 0;
    frames: Frame[];

    constructor() {
        this.id = 0;
        this.frames = [];
    }
}