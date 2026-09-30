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
        login(dados.username, dados.password); // Tentar fazer esse login pelo exios
        setDados({username: '', password: ''});
    }

    return (
            <div className='rectangle' id='formWrapper'>
                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <div id='submit-options'>
                            <button  className='optFormBtn'id='form-login' autoFocus> Login </button>
                            <button className='optFormBtn' id='form-register'> Register </button>
                        </div>
                        <div className='campus'>
                            <label htmlFor="username">Username:</label>
                            <input type="text" name='username' value={dados.username} onChange={handleChange} /> 
                        </div>
                        <hr />
                        <div className='campus'>
                            <label htmlFor="password">Password:</label>
                            <input type="password" name='password' value={dados.password} onChange={handleChange} />
                        </div>
                        <button type="submit" id='submit'>Enviar</button>
                    </form>
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
                <LoginForm />
                <Hero />
            </main>
        </div>
    )
}

export default Login;