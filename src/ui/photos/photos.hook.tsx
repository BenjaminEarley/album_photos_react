import {Photo} from "../../domain";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../util";
import {map} from "rxjs/operators";
import {IDataRepository} from "../../repository/data-repository";

interface PhotosState {
    albumTitle: string,
    photos: Photo[];
}

export default function usePhotosState(dataRepository: IDataRepository, albumId: number) {

    const [state, setState] = useState({albumTitle: "", photos: []} as PhotosState);

    useEffect(() => {

        const getAlbumTitle = dataRepository.getAlbums().pipe(
            map(albums => albums.find(album => album.id === albumId)?.title ?? "")
        )

        const get15Photos = dataRepository.getPhotos(albumId).pipe(
            map(albums => albums.slice(0, 15))
        )

        const subscriptions: Subscription[] = [
            onEmit<string>(getAlbumTitle, albumTitle => setState(state => ({...state, albumTitle}))),
            onEmit<Photo[]>(get15Photos, photos => setState(state => ({...state, photos})))
        ];

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [dataRepository, albumId]);

    return state
}