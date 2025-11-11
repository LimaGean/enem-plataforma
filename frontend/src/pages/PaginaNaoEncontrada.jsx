import { Link } from 'react-router-dom';

function PaginaNaoEncontrada() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Ops! Página não encontrada.</p>
      <Link
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Voltar para Início
      </Link>
    </div>
  );
}

export default PaginaNaoEncontrada;
