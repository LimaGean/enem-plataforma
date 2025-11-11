import React from 'react';
import { useNavigate } from 'react-router-dom';

function InicioDiagnostico() {
  const navigate = useNavigate();

  const iniciarDiagnostico = () => {
    navigate('/diagnostico/questoes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
        Bem-vindo ao Diagnóstico Inicial!
      </h1>
      <p className="text-white text-lg md:text-2xl mb-10 text-center max-w-2xl">
        Vamos descobrir seu nível atual para criar um plano de estudo sob medida para você! 🚀
      </p>
      <button
        onClick={iniciarDiagnostico}
        className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
      >
        Iniciar Diagnóstico
      </button>
    </div>
  );
}

export default InicioDiagnostico;

