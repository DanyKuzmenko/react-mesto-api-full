import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import apiClass from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, addCard] = React.useState([]);
    const [selectedDeleteCard, setSelectedDeleteCard] = React.useState({});
    const [addPlaceButtonName, setAddPlaceButtonName] = React.useState('Создать');
    const [userPopupButtonName, setUserPopupButtonName] = React.useState('Сохранить');
    const [deleteCardPopupButtonName, setDeleteCardPopupButtonName] = React.useState('Да');
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [infoTooltipStatus, setInfoTooltipStatus] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        if(!loggedIn)
            return;
        apiClass.getUserApiInfo()
            .then(res => {
                setCurrentUser(res);
            })
            .catch(err => console.log(err));
        apiClass.getInitialCards()
            .then((res) => {
                addCard(res.data);
            })
            .catch(error => console.log(error));
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEscape);
        return () => document.removeEventListener('keydown', closeByEscape);
    }, [loggedIn]);

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt');
            auth.checkToken(jwt)
                .then(res => {
                    setEmail(res.email);
                    setLoggedIn(true);
                    history.push('/');
                })
                .catch(err => console.log(err));
        }
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        apiClass.changeLikeCardStatus(card.id, isLiked).
            then((newCard) => {
                addCard((cards) => cards.map(c => c._id === card.id ? newCard : c))
            })
            .catch(err => console.log(err))
    }

    function handleCardDelete(card) {
        setIsDeleteCardPopupOpen(true);
        setSelectedDeleteCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(props) {
        setSelectedCard(props);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsDeleteCardPopupOpen(false);
        setSelectedCard({});
        setIsInfoTooltipOpen(false);
    }

    function handleUpdateUser({ name, about }) {
        setUserPopupButtonName('Сохранение...');
        apiClass.sendUserApiInfo(name, about)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setUserPopupButtonName('Сохранить');
            })
    }

    function handleUpdateAvatar({ avatar }) {
        setUserPopupButtonName('Сохранение...');
        apiClass.updateAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setUserPopupButtonName('Сохранить');
            })
    }

    function handleAddPlaceSubmit({ name, link }) {
        setAddPlaceButtonName('Создание...');
        apiClass.sendCardInfo(name, link)
            .then((newCard) => {
                addCard([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setAddPlaceButtonName('Создать');
            })
    }

    function handleDeleteCardSubmit() {
        setDeleteCardPopupButtonName('Удаление...');
        apiClass.deleteApiCard(selectedDeleteCard.id)
            .then(() => {
                addCard((cards) => cards.filter(item => item._id !== selectedDeleteCard.id));
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => {
                setDeleteCardPopupButtonName('Да');
            })
    }

    function handleInfoTooltip(status) {
        setIsInfoTooltipOpen(true);
        setInfoTooltipStatus(status);
    }

    function handleLoginSubmit(password, email, clearFormData) {
        auth.authorize(password, email)
            .then(res => {
                localStorage.setItem('jwt', res.message);
                setLoggedIn(true);
                setEmail(email);
                clearFormData();
                history.push('/');
            })
            .catch(err => console.log(err))
    }

    function handleRegisterSubmit(password, email) {
        auth.register(password, email)
            .then(res => {
                if (res.statusCode !== 400) {
                    handleInfoTooltip(true);
                    history.push('/signin');
                }
            })
            .catch(err => {
                console.log(err);
                handleInfoTooltip(false);
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header
                email={email}
                clearCards={addCard}
                clearUserInfo={setCurrentUser}
                setLoggedIn={setLoggedIn}
            />
            <Switch>
                <Route path="/signup">
                    <Register
                        onRegister={handleRegisterSubmit} />
                </Route>
                <Route path="/signin">
                    <Login
                        onLogin={handleLoginSubmit} />
                </Route>
                <ProtectedRoute
                    path="/"
                    loggedIn={loggedIn}
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
            </Switch>
            <Footer />
            <InfoTooltip
                isOpen={isInfoTooltipOpen}
                popupStatus={infoTooltipStatus}
                onClose={closeAllPopups} />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                buttonName={userPopupButtonName} />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                buttonName={userPopupButtonName} />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onUpdateCard={handleAddPlaceSubmit}
                buttonName={addPlaceButtonName} />
            <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleDeleteCardSubmit}
                buttonName={deleteCardPopupButtonName} />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
    );
}

export default App;
