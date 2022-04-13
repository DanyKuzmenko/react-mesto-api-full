import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard();
    }

    return (
        <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonName={props.buttonName}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} />
    )
}

export default DeleteCardPopup;