import React from "react";
import { useNavigate } from "react-router-dom"; // Importar o hook para redirecionamento
import AtivoForm from "../components/AtivoForm";
import AtivoList from "../components/AtivoList";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate = useNavigate(); // Hook para navegação

    const handleLogout = () => {
        // Limpar informações de autenticação
        localStorage.clear(); // Remover tokens/sessão armazenados
        sessionStorage.clear(); // Opcional: limpar sessão
        alert("Você saiu com sucesso!"); // Mensagem de feedback (opcional)
        
        // Redirecionar para a página de login
        navigate("/login");
    };

    return (
        <div>
            {/* Passar a função handleLogout como prop para o Navbar */}
            <Navbar onLogout={handleLogout} />
            <AtivoForm />
            <AtivoList />
        </div>
    );
};

export default Home;
