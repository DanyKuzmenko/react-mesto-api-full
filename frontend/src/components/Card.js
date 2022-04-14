import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.ownerId === currentUser._id;
    const cardDeleteButtonClassName = (`${isOwn ? 'card__delete-icon' : 'card__delete-icon_hidden'}`);
    const isLiked = props.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : 'card__like'}`);

    function handleClick() {
        props.onCardClick(props);
    }

    function handleLikeClick() {
        props.onCardLike(props);
    }

    function handleDeleteClick() {
        props.onCardDelete(props);
    }

    return (
        <article className="card">
            <img src={props.link} alt={props.name} className="card__image" onClick={handleClick} />
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку." onClick={handleDeleteClick}></button>
            <div className="card__body">
                <h2 className="card__title">{props.name}</h2>
                <div className="card__like-body">
                    <button type="button" aria-label="Добавить в любимые." className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-number">{props.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;