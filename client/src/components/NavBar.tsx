import '../styles/navbar.scss';
import { useState } from 'react';
import { AlignJustify, User, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginComponent from './LoginComponent';

function NavBar() {

  const [showLoginModal, setShowLoginModal] = useState(false);

  // Implement your login logic here (e.g., send login request to server)
  const handleLoginSubmit = (username: string, password: string) => {
    console.log('Login attempted:', username, password);
    // Replace with your actual login logic
  };

  return (
    <nav className='bar'>
       <img src="./logocook.png" alt="" className='logo'/>
       <h1 className='title'>MAGAZIA DE <br /> BUCATE</h1>
        <ul className='pages'>
            <li><Link to="/" style={{textDecoration: 'none', color: 'whitesmoke'}}>ACASA</Link></li>
            <li><Link to="/retete" style={{textDecoration: 'none', color: 'whitesmoke'}}>RETETE</Link></li>
            <li>CATERING</li>
        </ul>
        <Link to="/retetele_mele" className='hidden' style={{width:'130px', height:'50px', display: 'flex', justifyContent:'center', alignItems:'center', textDecoration:'none', color:'white', marginLeft:'20%'}}><Library size={25}/></Link>
        <button className='login' onClick={() => setShowLoginModal(true)} style={{backgroundColor:'transparent', border:'none'}}><User /></button>
        {showLoginModal && (
        <LoginComponent
          onClose={() => setShowLoginModal(false)}
          onSubmit={handleLoginSubmit} // Pass your login handler
        />
      )}
        <AlignJustify size={25} className='hamburger'/>
    </nav>
  )
}

export default NavBar