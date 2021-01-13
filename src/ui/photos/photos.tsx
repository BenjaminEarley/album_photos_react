import React from "react";
import {Photo} from "../../domain";
import {useParams} from "react-router-dom";
import usePhotosState from "./photos.hook";
import {Modal} from "../common/modal/modal";
import PhotoModal from "./photo-modal";
import {useModal} from "../common/modal/modal.hook";
import {dataRepository} from "../../repository/data-repository";
import {Card, Grid, Header, Page} from "../app.style";
import {PhotoTitle} from "./photos.style";

export default Photos

interface ParamTypes {
    albumId: string
}

function Photos() {
    let {albumId} = useParams<ParamTypes>();
    const {albumTitle, photos} = usePhotosState(dataRepository, parseInt(albumId, 10))

    return (
        <Page>
            <Header>{albumTitle}</Header>
            <PhotoGrid photos={photos} onClick={(photo) => null}/>
        </Page>
    );
}

type PhotoGridProps = {
    photos: Photo[]
    onClick: (photo: Photo) => void;
}

function PhotoGrid(props: PhotoGridProps) {

    function renderPhoto(photo: Photo) {
        return (
            <PhotoCard
                key={photo.id}
                title={photo.title}
                thumbnailUrl={photo.thumbnailUrl}
                url={photo.url}
                onClick={() => props.onClick(photo)}/>
        );
    }

    const photoCards = props.photos.map(photo => renderPhoto(photo))

    return (
        <Grid>{photoCards}</Grid>
    );
}

type PhotoProps = {
    title: string,
    thumbnailUrl: string,
    url: string,
    onClick: () => void;
}

function PhotoCard(props: PhotoProps) {
    const {isShown, toggle} = useModal();

    return (
        <React.Fragment>
            <div onClick={toggle}>
                <Card onClick={props.onClick}>
                    <img src={props.thumbnailUrl} alt={props.title}/>
                </Card>
                <PhotoTitle>{props.title}</PhotoTitle>
            </div>
            <Modal
                isShown={isShown}
                hide={toggle}
                modalContent={
                    <PhotoModal
                        title={props.title}
                        url={props.url}
                    />
                }
            />
        </React.Fragment>
    );
}