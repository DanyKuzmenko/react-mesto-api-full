import avatarChange from '../images/change-avatar.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__position">
                    <img src={avatarChange} alt="Изменить аватар." className="profile__avatar-change" />
                    <img src={currentUser.avatar} alt="Жак-Ив Кусто в центре фото, на заднем плане море." className="profile__avatar" onClick={props.onEditAvatar} />
                    <div className="profile__info">
                        <div className="profile__info-position">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__activity">{currentUser.about}</p>
                        </div>
                        <button type="button" aria-label="Редактировать профиль." className="profile__edit-button" onClick={props.onEditProfile} ></button>
                    </div>
                </div>
                <button type="button" aria-label="Добавить карточку." className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                {props.cards.map(item => (
                    <Card
                        name={item.name}
                        link={item.link}
                        likes={item.likes}
                        id={item._id}
                        ownerId={item.owner}
                        onCardDelete={props.onCardDelete}
                        onCardLike={props.onCardLike}
                        onCardClick={props.onCardClick}
                        key={item._id}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;