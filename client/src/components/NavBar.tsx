import '../styles/navbar.scss';
import { useState } from 'react';
import { AlignJustify, User, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function NavBar() {

  const [showLoginModal, setShowLoginModal] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  const [dropdownOpen, setDropdownOpen] = useState(false);


  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation(); // Prevent event from bubbling up to document
    setDropdownOpen(!dropdownOpen);
};


  return (
    <nav className='bar'>
      <div className="firstpart">
          <button className="hamburger" onClick={toggleDropdown}>
            <AlignJustify size={24} />
          </button>
          <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <a href="/">Acasa</a>
              <a href="/retete">Retete</a>
              <a href="/catering">Meniu Digital</a>
          </div>
          <img src="/logocook.png" alt="favicon" className='logo'/>
          <h1 className='title'>MAGAZIA DE <br /> BUCATE</h1>
      </div>
      <div className="pges">
              <div className="pag"><Link to="/" style={{textDecoration: 'none', color: 'whitesmoke'}}>ACASA</Link></div>
              <div className="pag"><Link to="/retete" style={{textDecoration: 'none', color: 'whitesmoke'}}>RETETE</Link></div>
              <div className="pag"><Link to="/menu" style={{textDecoration: 'none', color: 'whitesmoke'}}>MENIU</Link></div>
      </div>
      <div className="buttonz" style={{ height:'50px', display:'flex'}}>
        <Link to="/retetele-mele/retete" className='hidden login' style={{minWidth:'50px', height:'50px', display: 'flex', justifyContent:'center', alignItems:'center', textDecoration:'none', color:'white', marginLeft:'20%',}}><Library className='lib'/></Link>
        {isAuthenticated ? (
        <Link to="/setari" className='login' style={{ backgroundColor: 'transparent', border: 'none', minWidth:'50px', height:'50px' }}>
          <User className='lib'/>
        </Link>
      ) : (
        <button className='login' onClick={() => setShowLoginModal(true)} style={{ backgroundColor: 'transparent', border: 'none', minWidth:'50px' }}>
          <User className='lib'/>
        </button>
      )}
      {showLoginModal && (
        <LoginComponent
          onClose={() => setShowLoginModal(false)}
        />
      )}
      </div>
    </nav>
  )
}

export default NavBar