import styles from './css/Login.module.css';
import { useState } from 'react';
import { login, register } from './js/client';

function useForm(stateDefault, onSubmit) {
    const [dados, setDados] = useState(stateDefault);
    const [data, setData] = useState('');

    const handleChange = (element) => {
        const { name, value } = element.target;
        setDados((prev) => ({...prev, [name]: value}))
    };

    const handleSubmit = async (element) => {
        element.preventDefault();
        try {
            await onSubmit(dados);
            setDados(stateDefault);
        } catch(e) {
            setData(e.response?.data?.error || 'Erro interno');
            setDados(stateDefault);
        }
    };
    return { dados, handleChange, handleSubmit, data }
}

function Campo({name, title, type, value, onChange}){
    return (
        <div>
            <input className={styles.campo} type={type} name={name} value={value} onChange={onChange} placeholder={title}/>
        </div>
    )
}

function LoginForm({func}) {
    const { dados, handleChange, handleSubmit, data } = useForm(({username: '', password: ''}), (dados) => {
        return login(dados.username, dados.password)
    });

    return (
        <div>
            <div className={styles.TituloFormulario}>Login</div>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <div className={styles.campos}>
                    <Campo name='username' type='text' title='Nome de usuário' value={dados.username} onChange={handleChange}/>
                    <hr />
                    <Campo name='password' type='password' title='Senha' value={dados.password} onChange={handleChange}/>
                </div>
                <div className={styles.mudarFormulario} onClick={func}>Não tem uma conta?</div>
                <button type="submit" className={styles.botaoEnviar}>enviar</button>
            </form>
            <div className={styles.Erro}>{data}</div>
        </div>
    )
}

function RegisterForm ({ func }) {
    const { dados, handleChange, handleSubmit, data } = useForm(({email: '', username: '', password: ''}), (dados) => {
        return register(dados.email, dados.username, dados.password)        
    });

    return (
        <div>
            <div className={styles.TituloFormulario}>Cadastro</div>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <div className={styles.campos}>
                    <Campo name='email' type='text' title='Email' value={dados.email} onChange={handleChange}/>
                    <hr />
                    <Campo name='username' type='text' title='Nome de usuário' value={dados.username} onChange={handleChange}/>
                    <hr />
                    <Campo name='password' type='password' title='Senha' value={dados.password} onChange={handleChange}/>
                </div>
                <div className={styles.mudarFormulario} onClick={func}>Já tem uma conta?</div>
                <button type="submit" className={styles.botaoEnviar}>enviar</button>
            </form>
            <div className={styles.Erro}>{data}</div>
        </div>
    )
}

function FormWrapper() {
    const [form, setForm] = useState(true);

    const onClick = (element) => {
        setForm(!form);
        console.log(form);
    };

    return (
            <div className={styles.formWrapper}>
                {form? <LoginForm func={onClick}/>: <RegisterForm func={onClick}/>}
            </div>
    )
}

function Hero() {
    return (
        <div className={styles.hero}>
            <h1>Olá, seja bem vindo a <br /><span className={styles.titulo}>Biblioteca Virtual.</span></h1>
            <h2>Temos um grande acervo, <br /> de clássicos aos récem-lançados. <br />
            Descubra, discuta e avalie.</h2>
            <h3 className={styles.alerta}>Conteudo 100% gratuito</h3>
            <h4>Não perca. <br /> Logue ou cadastre-se para ter acesso ao conteudo.</h4>
        </div>
    )
}

function Login() {
    return (
        <div className={styles.body}>
            <main className={styles.main}>
                <FormWrapper />
                <Hero />
            </main>
        </div>
    )
}

export default Login;