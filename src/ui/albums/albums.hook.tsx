import {Album} from "../../domain";
import {useEffect, useState} from "react";
import {Subscription} from "rxjs";
import {onEmit} from "../../util";
import {map} from "rxjs/operators";
import {IDataRepository} from "../../repository/data-repository";

interface AlbumsState {
    albums: Album[];
}

export default function useAlbumsState(dataRepository: IDataRepository) {

    const [state, setState] = useState({albums: []} as AlbumsState);

    useEffect(() => {

        const get12Albums = dataRepository.getAlbums().pipe(
            map(albums => albums.slice(0, 12))
        )

        const subscriptions: Subscription[] = [
            onEmit<Album[]>(get12Albums, albums => setState(state => ({...state, albums})))
        ];

        return () => {
            subscriptions.map(it => it.unsubscribe())
        };
    }, [dataRepository]);

    return state
}