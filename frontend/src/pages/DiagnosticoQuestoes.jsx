import React, { useState } from 'react';
import api from '../services/api';

function DiagnosticoQuestoes() {
  const questoesTeste = [
    {
      pergunta: "Qual é o resultado de 2 + 2?",
      alternativas: ["2", "4", "6", "8"],
      correta: 1,
    },
    {
      pergunta: "Qual é a capital do Brasil?",
      alternativas: ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"],
      correta: 1,
    },
    {
      pergunta: "Quem escreveu 'Dom Casmurro'?",
      alternativas: ["Machado de Assis", "Clarice Lispector", "Graciliano Ramos", "Monteiro Lobato"],
      correta: 0,
    },
  ];

  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState(Array(questoesTeste.length).fill(null));

  const selecionarResposta = (indiceResposta) => {
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = indiceResposta;
    setRespostas(novasRespostas);
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoesTeste.length - 1) {
      setQuestaoAtual(questaoAtual + 1);
    }
  };

  const anteriorQuestao = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(questaoAtual - 1);
    }
  };

  const finalizarDiagnostico = async () => {
    try {
      console.log("Respostas enviadas:", respostas);
      await api.post('/diagnostico/enviar-respostas/', {
        respostas: respostas,
      });
      alert('Diagnóstico concluído e respostas enviadas com sucesso! Vamos gerar seu plano de estudo.');
    } catch (error) {
      console.error('Erro ao enviar respostas:', error);
      alert('Erro ao enviar respostas. Verifique se você está autenticado.');
    }
  };

  const questao = questoesTeste[questaoAtual];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Questão {questaoAtual + 1} de {questoesTeste.length}
        </h2>

        <h3 className="text-xl mb-4">{questao.pergunta}</h3>

        <div className="flex flex-col space-y-4 mb-6">
          {questao.alternativas.map((alternativa, index) => (
            <button
              key={index}
              onClick={() => selecionarResposta(index)}
              className={`py-2 px-4 rounded-lg ${
                respostas[questaoAtual] === index
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {alternativa}
            </button>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={anteriorQuestao}
            disabled={questaoAtual === 0}
            className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
          >
            Anterior
          </button>

          {questaoAtual === questoesTeste.length - 1 ? (
            <button
              onClick={finalizarDiagnostico}
              className="py-2 px-6 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Finalizar
            </button>
          ) : (
            <button
              onClick={proximaQuestao}
              className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DiagnosticoQuestoes;
