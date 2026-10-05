import styles from './css/Login.module.css';
import { use, useState } from 'react';
import { login, register } from './js/client';

function useForm(stateDefault, onSubmit) {
    const [dados, setDados] = useState(stateDefault);
    const [response, setResponse] = useState('');

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
            setResponse(e.response?.data?.error || 'Erro interno');
            setDados(stateDefault);
        }
    };
    return { dados, handleChange, handleSubmit, response }
}

function Form({children, handleSubmit, titulo="Formulario", troggleMsg="Trocar", msgError='', onClick}) {
    return (
        <div>
            <div className={styles.TituloFormulario}>{ titulo }</div>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <div className={styles.campos}>
                    {children}
                </div>
                <div className={styles.mudarFormulario} onClick={onClick}>{troggleMsg}</div>
                <button type="submit" className={styles.botaoEnviar}>enviar</button>
            </form>
            <div className={styles.Erro}>{msgError}</div>
        </div>
    )
}

function Campo({name, title, type, value, onChange}){
    return (
        <div>
            <input className={styles.campo} type={type} name={name} value={value} onChange={onChange} placeholder={title}/>
        </div>
    )
}

function LoginForm({onClick}) {
    const { dados, handleChange, handleSubmit, response } = useForm(({username: '', password: ''}), (dados) => {
        return login(dados.username, dados.password)
    });

    return (
        <Form titulo='Login' handleSubmit={handleSubmit} troggleMsg='Não tem uma conta?' msgError={response} onClick={onClick}>
            <Campo name='username' type='text' title='Nome de usuário' value={dados.username} onChange={handleChange}/>
            <hr />
            <Campo name='password' type='password' title='Senha' value={dados.password} onChange={handleChange}/>        
        </Form>
    )
}

function RegisterForm ({onClick}) {
    const { dados, handleChange, handleSubmit, response } = useForm(({email: '', username: '', password: ''}), (dados) => {
        return register(dados.email, dados.username, dados.password)        
    });

    return (
        <Form titulo='Cadastro' handleSubmit={handleSubmit} troggleMsg='Já tem uma conta?' msgError={response} onClick={onClick}>
            <Campo name='email' type='text' title='Email' value={dados.email} onChange={handleChange}/>
            <hr />
            <Campo name='username' type='text' title='Nome de usuário' value={dados.username} onChange={handleChange}/>
            <hr />
            <Campo name='password' type='password' title='Senha' value={dados.password} onChange={handleChange}/>
        </Form>
    )
}

function FormWrapper() { 
    const [form, switchForm] = useState(false);

    return (
            <div className={styles.formWrapper}>
                {form? <LoginForm onClick={()=>{ switchForm(!form) }}/> : 
                       <RegisterForm onClick={()=>{ switchForm(!form) }}/>}
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