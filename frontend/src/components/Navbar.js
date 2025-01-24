import React from "react";

const Navbar = ({ onLogout }) => {
    return (
        <header>
            {/* Navbar principal */}
            <nav
                className="navbar"
                style={{
                    backgroundColor: "#fff", // Substitua pelo código exato da cor extraída da imagem
                    color: "white",
                }}
            >
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <img
                        src="https://www.levesaude.com.br/build/assets/logo-menu-leve-5752d94b.png" // Substitua pelo caminho correto da logo
                        alt="LEVE SAÚDE"
                        style={{
                            height: "60px", // Ajuste de altura da logo
                            maxWidth: "100%",
                        }}
                    />
                    {/* Botão de logout */}
                    <button
                        className="btn btn-danger"
                        style={{
                            padding: "5px 15px",
                            fontSize: "14px",
                            fontWeight: "bold",
                        }}
                        onClick={onLogout}
                    >
                        Sair
                    </button>
                </div>
            </nav>
            {/* Subtítulo */}
            <div
                className="text-center py-2"
                style={{
                    backgroundColor: "#451e44", // Um tom complementar ao laranja
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "500",
                }}
            >
                Controle de Ativos Infraestrutura
            </div>
        </header>
    );
};

export default Navbar;
