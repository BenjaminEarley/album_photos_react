import {Album, Photo} from "../domain";
import {IDataRepository} from "../repository/data-repository";
import {Observable, of} from "rxjs";

interface Data {
    albums: Album[],
    photos: Photo[]
}

export class TestRepository implements IDataRepository {

    readonly data: Data

    constructor(data: Data) {
        this.data = data
    }

    getAlbums(): Observable<Album[]> {
        return of(this.data.albums)
    }

    getPhotos(albumId: number): Observable<Photo[]> {
        return of(this.data.photos);
    }

}