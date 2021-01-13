import React, {FunctionComponent, useEffect} from "react";
import FocusLock from "react-focus-lock";
import ReactDOM from "react-dom";
import {Backdrop, Content, StyledModal, Wrapper} from "./modal.style";
export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
}

export const Modal: FunctionComponent<ModalProps> =
    ({
         isShown,
         hide,
         modalContent
     }) => {

        useEffect(() => {
            const onKeyDown = (event: KeyboardEvent) => {
                if (event.keyCode === 27 && isShown) {
                    hide();
                }
            };

            isShown
                ? (document.body.style.overflow = "hidden")
                : (document.body.style.overflow = "unset");
            document.addEventListener("keydown", onKeyDown, false);
            return () => {
                document.removeEventListener("keydown", onKeyDown, false);
            };
        }, [isShown, hide]);

        const modal = (
            <React.Fragment>
                <Backdrop onClick={hide}/>
                <FocusLock>
                    <Wrapper
                        tabIndex={-1}
                        role="dialog"
                    >
                        <StyledModal>
                            <Content>{modalContent}</Content>
                        </StyledModal>
                    </Wrapper>
                </FocusLock>
            </React.Fragment>
        );

        return isShown ? ReactDOM.createPortal(modal, document.body) : null;
    };