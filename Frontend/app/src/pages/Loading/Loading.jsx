import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importando axios para fazer requisições HTTP
import { DotLottieReact} from "@lottiefiles/dotlottie-react"
import './Loading.css';
import { baseURL } from "../../services/config";

function Loading() {
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
    const navigate = useNavigate(); // Hook para navegar entre páginas

    // Função para chamar o backend e processar filmes
    const processarFilmes = async () => {
        try {
            const response = await axios.get(`${baseURL}/processar-filmes`);
            const { data_dict, processamento_concluido } = response.data; // Acessa o dicionário de filmes e o status

            // Verifica se o processamento foi concluído com sucesso
            if (processamento_concluido) {
                console.log("Filmes processados com sucesso:", data_dict);
                navigate("/seleção");// Armazena os filmes recebidos
            } else {
                console.error("Erro no processamento dos filmes.");
                // Tratar falha de processamento aqui
            }
        } catch (error) {
            console.error("Erro ao processar os filmes:", error);
            // Tratar erro de requisição
        } finally {
            setIsLoading(false); // Finaliza o carregamento após a resposta
        }
    };

    useEffect(() => {
        // Inicia a requisição assim que o componente for montado
        processarFilmes();
    }, []);

    return (
        <div className="loading-container">
            <DotLottieReact 
                src="https://lottie.host/290b2fdf-b678-4d82-9f24-4049f9488dc7/2gdST0218I.lottie" 
                loop 
                autoplay 
                style={{ width: 400, height: 400 }} 
            />
            <br></br>
        </div>
    );
}

export default Loading; 