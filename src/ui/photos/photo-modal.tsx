import React from "react";
import {Modal, ModalImage, PhotoTitle} from "./photos.style";

type PhotoModalProps = {
    title: string,
    url: string
}

export default function PhotoModal(props: PhotoModalProps) {
    return (
        <Modal>
            <ModalImage src={props.url} alt={props.title}/>
            <PhotoTitle>{props.title}</PhotoTitle>
        </Modal>
    );
}