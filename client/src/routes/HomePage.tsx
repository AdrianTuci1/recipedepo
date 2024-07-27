import { useNavigate } from 'react-router-dom'
import RecipeSlider from '../components/RecipeSlider'
import '../styles/homepage.scss'

function HomePage() {

  const navigate = useNavigate();
  return (
    <>
    <div className="pagina">
    <div className="sectiune_1">
      <div className="stanga">
        <h1 className='text_big'>CAUTA <a className='strong'>RETETELE</a> TALE PREFERATE</h1>
        <h2>
        AICI GASESTI CELE MAI BUNE RETETE DE MANCARE!
        </h2>
        <p>
                PAGINA FUNCȚIONEAZĂ CA O RETEA SOCIALA,
        ALEGE DIN RETELELE POSTATE DE UTILIZATORI SAU
        CREAZĂ-ȚI PROPRIILE RETETE. POȚI ADAUGA LA FAVORITE
        SAU GESTIONA RETELE TALE ȘI POȚI CREA UN PLAN DE MÂNCARE
        PENTRU URMATOARELE ZILE.
        </p>
        <div className='buttons'>
        <button className='btn btn-primary' onClick={(e) => navigate('/retete')}>VEZI RETETELE</button>
        <button className='btn btn-secondary' onClick={(e) => navigate('/inregistrare')}>ALATURA-TE</button>
        </div>
      </div>
      <div className="dreapta">
        <img src="chicken.jpg" alt="" className='img02'/>
        <img src="gogosi.avif" alt="" className='img01'/>
      </div>
    </div>
    <div className="sectiune_2">
      <RecipeSlider />
    </div>
    <div className="sectiune_3">
      
    </div>
    </div>
    </>
  )
}

export default HomePage