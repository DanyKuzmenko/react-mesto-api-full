import React from "react";
import popupSuccessImage from '../images/PopupSuccess.svg';
import popupErrorImage from '../images/PopupError.svg';

function InfoTooltip(props) {

    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" aria-label="Закрыть попап" onClick={props.onClose}></button>
                {props.popupStatus ? <img className="popup__icon" src={popupSuccessImage} /> : <img className="popup__icon" src={popupErrorImage} />}
                {props.popupStatus ? <h1 className="popup__description">Вы успешно зарегистрировались!</h1> : <h1 className="popup__description">Что-то пошло не так!
                    Попробуйте ещё раз.</h1>}
            </div>
        </div>
    )
}

export default InfoTooltip;