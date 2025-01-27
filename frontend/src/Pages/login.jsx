import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/');
    } catch (err) {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 animate-fade-in">
        <div className="flex justify-center mb-6">
          <img
            src="https://www.levesaude.com.br/build/assets/logo-menu-leve-5752d94b.png"
            alt="Leve Saúde"
            className="h-20 transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        <h1 className="custom-title text-2xl font-bold text-center text-gray-800 mb-6">
          Acesse a sua Conta
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
  {/* Campo Usuário */}
  <div className="input-group mb-3">
    <span className="input-group-text">
      <i className="fas fa-user"></i> {/* Ícone de usuário */}
    </span>
    <input
      id="username"
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="form-control"
      placeholder="Digite seu usuário"
      required
    />
  </div>

  {/* Campo Senha */}
  <div className="input-group mb-3">
    <span className="input-group-text">
      <i className="fas fa-lock"></i> {/* Ícone de cadeado */}
    </span>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="form-control"
      placeholder="Digite sua senha"
      required
    />
  </div>


  {/* Mensagem de erro */}
  {error && (
    <div className="animate-shake">
      <p className="text-danger text-sm text-center bg-light p-3 rounded border border-danger">
        {error}
      </p>
    </div>
  )}

  {/* Botão de Login */}
  <button
    type="submit"
    className="btn btn-dark mx-auto block py-2 px-6 rounded font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-transform duration-300"
    style={{ display: 'block', margin: '0 auto' }}
  >
    Entrar
  </button>
</form>

      </div>
    </div>
  );
}



export default Login;
