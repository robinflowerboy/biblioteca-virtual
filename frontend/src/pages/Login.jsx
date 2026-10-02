import './css/Login.css';
import { useState } from 'react';
import { login } from './js/client';

function LoginForm() {
    const [dados, setDados] = useState({ username: '', password: ''});

    const handleChange = (element) => {
        const { name, value } = element.target;
        setDados({...dados, [name]: value})
    }

    const handleSubmit = (element) => {
        element.preventDefault();
        login(dados.username, dados.password); // Tenta fazer esse login pelo axios
        setDados({username: '', password: ''});
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='campus'>
                <label htmlFor="username">Username:</label>
                <input type="text" name='username' value={dados.username} onChange={handleChange} /> 
            </div>
            <hr />
            <div className='campus'>
                <label htmlFor="password">Password:</label>
                <input type="password" name='password' value={dados.password} onChange={handleChange} />
            </div>
            <button type="submit" id='submit'>Login</button>
        </form>
    )
}

function WrapperForm() {
    return (
            <div id='formWrapper'>
                <fieldset>
                    <div id='submit-options'>
                        <button  className='optFormBtn'id='form-login' autoFocus> Login </button>
                        <button className='optFormBtn' id='form-register'> Register </button>
                    </div>
                    <LoginForm />
                </fieldset>
            </div>
    )
}

function Hero() {
    return (
        <div id='hero'>
            <h1>Olá, seja bem vindo a <br /><span id='bbv'>Biblioteca Virtual.</span></h1>
            <h2>Temos um grande acervo, <br /> de clássicos aos récem-lançados. <br />
            Descubra, discuta e avalie.</h2>
            <h3>Conteudo 100% gratuito</h3>
            <h4>Não perca. <br /> Logue ou cadastre-se para ter acesso ao conteudo.</h4>
        </div>
    )
}

function Login() {
    return (
        <div>
            <main>
                <WrapperForm />
                <Hero />
            </main>
        </div>
    )
}

export default Login;