import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.name && props.card.link ? 'popup_opened' : ''}`}>
            <div className="popup__body">
                <button type="button" aria-label="Закрыть картинку" className="popup__close-button popup__close-button_type_image" onClick={props.onClose}></button>
                <img src={props.card.link} alt={props.card.name} className="popup__image" />
                <h2 className="popup__figcaption popup__figcaption_type_image">{props.card.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;