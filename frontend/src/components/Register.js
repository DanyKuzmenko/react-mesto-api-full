import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
    const [formData, setFormData] = React.useState({});

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(formData.password, formData.email);
    }

    return (
        <section className="register">
            <div className="register__container">
                <h1 className="register__title">Регистрация</h1>
                <form className="register__form" onSubmit={handleSubmit}>
                    <input
                        className="register__input"
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handleInputChange}
                        value={formData.email || ''} />
                    <input
                        className="register__input"
                        type="password"
                        placeholder="Пароль"
                        required
                        minLength='8'
                        maxLength='16'
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password || ''} />
                    <button
                        className="register__button"
                        type="submit"
                        aria-label="Зарегистрироваться." >Зарегистрироваться</button>
                    <p className="register__caption">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
                </form>
            </div>
        </section>
    )
}

export default Register;