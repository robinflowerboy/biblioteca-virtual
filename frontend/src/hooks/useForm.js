import { useState } from "react";

export default function useForm(stateDefault, onSubmit) {
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