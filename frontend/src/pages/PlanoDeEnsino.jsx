import React, { useEffect, useState } from 'react';
import api from '../services/api';

function PlanoDeEnsino() {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlanos() {
      try {
        const response = await api.get('/diagnostico/planos/');
        // Se houver paginação, pegar os resultados
        const data = response.data.results || response.data;
        setPlanos(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o Plano de Ensino:', error);
        setError('Erro ao carregar seu plano de ensino. Verifique se você está autenticado.');
        setLoading(false);
      }
    }

    fetchPlanos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Carregando plano de ensino...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (planos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <p>Você ainda não possui um plano de ensino. Complete o diagnóstico primeiro!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-8">Seu Plano de Ensino</h1>
      <div className="grid gap-6 w-full max-w-4xl">
        {planos.map((plano) => (
          <div key={plano.id} className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
            <h2 className="text-2xl font-semibold mb-2">{plano.competencia?.codigo || 'N/A'}</h2>
            <p className="text-gray-700 mb-2">{plano.competencia?.descricao || 'Sem descrição'}</p>
            <p className="text-indigo-600 font-semibold">
              Prioridade: {plano.prioridade_display || (plano.prioridade === 1 ? 'Alta' : plano.prioridade === 2 ? 'Média' : 'Baixa')}
            </p>
            <p className="text-green-600 font-semibold mt-1">
              Status: {plano.status_display || plano.status}
            </p>
            <p className="text-gray-600 mt-2">{plano.recomendacao || 'Sem recomendação'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlanoDeEnsino;
