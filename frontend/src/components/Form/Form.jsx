import styles from './Form.module.css';

export default function Form({children, handleSubmit, titulo="Formulario", troggleMsg="Trocar", msgError='', onClick}) {
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