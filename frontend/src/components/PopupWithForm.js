import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть форму." className="popup__close-button popup__close-button_type_card" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__form popup__form_type_card" name={`popup${props.name}Form`} onSubmit={props.onSubmit} >
                    {props.children}
                    <button type="submit" aria-label="Создать." className="popup__button">{props.buttonName}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;