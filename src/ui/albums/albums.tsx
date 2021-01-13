import React from "react";
import {Album} from "../../domain";
import useAlbumsState from "./albums.hook";
import {useHistory} from "react-router-dom";
import {dataRepository} from "../../repository/data-repository";
import {AlbumTitle} from "./albums.style";
import {Card, Grid, Header, Page} from "../app.style";

export default Albums

function Albums() {
    const history = useHistory();
    const {albums} = useAlbumsState(dataRepository)

    return (
        <Page>
            <Header>Photo Albums</Header>
            <AlbumGrid albums={albums} onClick={(album) => history.push(`/album/${album.id}`)}/>
        </Page>
    );
}

type AlbumGridProps = {
    albums: Album[]
    onClick: (album: Album) => void;
}

function AlbumGrid(props: AlbumGridProps) {

    function renderAlbum(album: Album) {
        return (
            <AlbumCard key={album.id} title={album.title} onClick={() => props.onClick(album)}/>
        );
    }

    const albumCards = props.albums.map(album => renderAlbum(album))

    return (
        <Grid>{albumCards}</Grid>
    );
}

type AlbumProps = {
    title: string,
    onClick: () => void;
}

function AlbumCard(props: AlbumProps) {
    return (
        <Card onClick={props.onClick}>
            <AlbumTitle>{props.title}</AlbumTitle>
        </Card>
    );
}