import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonName={props.buttonName}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit} >
            <input
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Жак-Ив Кусто"
                name="inputName"
                required
                minLength="2"
                maxLength="40"
                id="input-name"
                value={name || ''}
                onChange={handleNameChange} />
            <span
                className="popup__error"
                id="input-name-error"></span>
            <input
                type="text"
                className="popup__input popup__input_type_activity"
                placeholder="Исследователь океана"
                name="inputActivity"
                required
                minLength="2"
                maxLength="200"
                id="input-activity"
                value={description || ''}
                onChange={handleDescriptionChange} />
            <span
                className="popup__error"
                id="input-activity-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;