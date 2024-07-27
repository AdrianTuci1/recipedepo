import React from 'react';
import '../styles/notauthenticated.scss';
import { useNavigate } from 'react-router-dom';

const NonAuthenticatedPage: React.FC = () => {

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/inregistrare')
  };

  const handleViewPublicRecipes = () => {
    navigate('/retete')
  };

  return (
    <div className="non-authenticated-page">
      <div className="content">
        <h1>Trebuie sa fii inregistrat pentru a adauga retete sau creea un plan saptamanal.</h1>
        <div className="buttons zap">
          <button className="btn btn-primary" onClick={handleViewPublicRecipes}>
            Vezi retetele publice
          </button>
          <button className="btn btn-secondary" onClick={handleCreateAccount}>
            Creaza un cont
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonAuthenticatedPage;
