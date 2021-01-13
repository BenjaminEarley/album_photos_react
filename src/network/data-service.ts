import {get, HttpResponse} from "../util";
import {Album, Photo} from "../domain";

export interface IDataService {
    getAlbums(): Promise<HttpResponse<Album[]>>

    getPhotos(albumId: number): Promise<HttpResponse<Photo[]>>
}

class DataService implements IDataService {

    getAlbums() {
        return get<Album[]>("https://jsonplaceholder.typicode.com/albums")
    }

    getPhotos(albumId: number) {
        return get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
    }
}

export const dataService: IDataService = new DataService()