import React from 'react';
import '../styles/Footer.scss'; // Make sure to create the corresponding SCSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <ul>
            <li className='tip'>HARTA SITE</li>
            <li>ACASA</li>
            <li>RETETE</li>
            <li>MENIU DIGITAL</li>
          </ul>
        </div>
        <div className="footer-section">
          <ul>
            <li className='tip'>SERVICII</li>
            <li>SETARI</li>
            <li>RETELE MELE</li>
            <li>PLAN ALIMENTAR</li>
          </ul>
        </div>
        <div className="footer-section get-in-touch">
          <h2>SPUNE-NE PAREREA</h2>
          <p>Parerea ta este importantanta pentru a ne imbunatatii serviciile.</p>
          <button>TRIMITE UN MESAJ</button>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="bottom-section">
            <h2> DEVELOPER </h2>
        </div>
        <div className="bottom-section">
            <h2>X (TWITTER)</h2>
        </div>
        <div className="bottom-section stylez">
            <div className="footer-logo">
            <div className="logo-good">
                <h1 className='top-foo'>
                    <img src="/logocook.png" alt="logo" style={{width:'80px'}}/>
                    MAGAZIA DE  <br /> BUCATE
                </h1>
            </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
