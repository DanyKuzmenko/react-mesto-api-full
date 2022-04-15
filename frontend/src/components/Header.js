import logo from '../images/Vector.svg';
import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

function Header(props) {
    const location = useLocation();
    const [menuStatus, setMenuStatus] = React.useState(false);
    const history = useHistory();

    function menuButtonClick() {
        menuStatus ? setMenuStatus(false) : setMenuStatus(true);
    }

    function signOut() {
        localStorage.removeItem('jwt');
        props.clearCards([]);
        props.clearUserInfo({});
        props.setLoggedIn(false);
        history.push('/signin');
    }

    function checkLinkData() {
        switch (location.pathname) {
            case '/':
                return (<Link className='header__link header__link_type_exit header__link_type_mobile' onClick={signOut} to="/signin" >Выйти</Link>)
                // пришлось добавить to в Link, не смотря на то что благодаря функции signOut нас и так перекинет на другую страницу, потому что 
                // React выводит ошибку в консоль, что в теге Link не используется to
                break;
            case '/signin':
                return (<Link className='header__link' to='/signup'>Регистрация</Link>)
                break;
            case '/signup':
                return (<Link className='header__link' to='/signin'>Войти</Link>)
                break;
        }
    }
    //функция проверки данных navbar, в зависимости от пути возвращает соответствующий Link

    return (
        <header className="header">
            {location.pathname === '/' ?
                <div className={`header__mobile-container ${menuStatus ? 'header__mobile-container_type_opened' : ''}`}>
                    {location.pathname === '/' ?
                        <>
                            <p className='header__mobile-email'>{props.email}</p>
                            <Link className='header__mobile-link' onClick={signOut} to="/signin" >Выйти</Link>
                        </>
                        : ''}
                </div> : ''}
            <div className='header__mobile-body'>
                <img src={logo} alt="Логотип Mesto." className="header__image" />
                <div className='header__navbar'>
                    {location.pathname === '/' ? <p className='header__email'>{props.email}</p> : ''}
                    {checkLinkData()}
                    {location.pathname === '/' ?
                        <button
                            className={`header__mobile-menu ${menuStatus ? 'header__mobile-menu_type_close' : 'header__mobile-menu_type_open'}`}
                            onClick={menuButtonClick} /> : ''}
                </div>
            </div>
        </header>
    )
}

export default Header;