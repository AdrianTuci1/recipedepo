import React from 'react';
import '../styles/notauthenticated.scss';

const NonAuthenticatedPage: React.FC = () => {

  const handleCreateAccount = () => {
    console.log('catre cont')
  };

  const handleViewPublicRecipes = () => {
    console.log('catre retete')
  };

  return (
    <div className="non-authenticated-page">
      <div className="content">
        <h1>Trebuie sa fii inregistrat pentru a adauga retete sau creea un plan saptamanal.</h1>
        <div className="buttons">
          <button className="btn btn-primary" onClick={handleCreateAccount}>
            Creaza un cont
          </button>
          <button className="btn btn-secondary" onClick={handleViewPublicRecipes}>
            Vezi retetele publice
          </button>
        </div>
      </div>
    </div>
  );
};

export default NonAuthenticatedPage;
