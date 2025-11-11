import { Routes, Route } from 'react-router-dom';
import InicioDiagnostico from '../pages/InicioDiagnostico';
import DiagnosticoQuestoes from '../pages/DiagnosticoQuestoes';
import PlanoDeEnsino from '../pages/PlanoDeEnsino';
import Login from '../pages/Login';
import PaginaNaoEncontrada from '../pages/PaginaNaoEncontrada';
import PrivateRoute from './PrivateRoute'; // esse está na mesma pasta!

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<InicioDiagnostico />} />
      <Route path="/diagnostico/questoes" element={<DiagnosticoQuestoes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plano-de-ensino" element={
        <PrivateRoute>
          <PlanoDeEnsino />
        </PrivateRoute>
      } />
      {/* Rota coringa para qualquer página não encontrada */}
      <Route path="*" element={<PaginaNaoEncontrada />} />
    </Routes>
  );
}

export default AppRoutes;
