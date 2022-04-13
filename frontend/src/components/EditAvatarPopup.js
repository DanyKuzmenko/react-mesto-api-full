import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            buttonName={props.buttonName}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input
                className="popup__input popup__input_type_avatar-link"
                placeholder="Ссылка на картинку"
                name="inputAvatarLink"
                required
                type="url"
                id="input-avatar-link"
                ref={avatarRef} />
            <span
                className="popup__error"
                id="input-avatar-link-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;