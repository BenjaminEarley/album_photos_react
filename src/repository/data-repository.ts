import {BehaviorSubject, Observable} from "rxjs";
import {Album, Photo} from "../domain";
import {map} from "rxjs/operators";
import {Map} from "immutable";
import {dataService, IDataService} from "../network/data-service";

export interface IDataRepository {
    getAlbums(): Observable<Album[]>

    getPhotos(albumId: number): Observable<Photo[]>
}

interface State {
    albums: Album[],
    photosByAlbum: Map<number, Photo[]>
}

class DataRepository implements IDataRepository {

    readonly subject = new BehaviorSubject({albums: [], photosByAlbum: Map()} as State);

    albumsService: IDataService

    constructor(albumsService: IDataService) {
        this.albumsService = albumsService;
    }

    getAlbums(): Observable<Album[]> {
        if (this.subject.getValue().albums.length === 0) this.reloadAlbums()
        return this.subject.pipe(
            map(state => state.albums)
        )
    }

    getPhotos(albumId: number): Observable<Photo[]> {
        this.subject.getValue().photosByAlbum.get(albumId) || this.reloadPhotos(albumId)
        return this.subject.pipe(
            map(state => state.photosByAlbum.get(albumId) || [])
        )
    }

    private reloadAlbums() {
        this.albumsService
            .getAlbums()
            .then(response => response.parsedBody || [])
            .then(albums => this.subject.next({...this.subject.getValue(), albums}))
    }

    private reloadPhotos(albumId: number) {
        this.albumsService
            .getPhotos(albumId)
            .then(response => response.parsedBody || [])
            .then(photos => {
                const currentState = this.subject.getValue()
                const newPhotos = currentState.photosByAlbum.set(albumId, photos)
                this.subject.next({...this.subject.getValue(), photosByAlbum: newPhotos})
            })
    }
}

export const dataRepository: IDataRepository = new DataRepository(dataService)