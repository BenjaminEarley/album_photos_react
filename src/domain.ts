export class Album {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly title: string) {
    }
}

export class Photo {
    constructor(
        public readonly id: number,
        public readonly albumId: number,
        public readonly title: string,
        public readonly url: string,
        public readonly thumbnailUrl: string) {
    }
}