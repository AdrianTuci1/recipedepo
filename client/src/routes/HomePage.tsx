import '../styles/homepage.scss'

function HomePage() {
  return (
    <div className="sectiune_1">
      <div className="stanga">
        <h1 className='text_big'>CAUTA <a className='strong'>RETETELE</a> TALE PREFERATE</h1>
        <h3>
        Aici gasesti cele mai bune retete de mancare!
        </h3>
        <p>
        Pagina functioneaza ca o retea sociala, 
        alege din retetele postate de utilizatori sau
        creeaza-ti propriile retete. Poti adauga la favorite
        sau gestiona retele tale si poti creea un plan de mancare
        pentru urmatoarele zile.
        </p>
        <div className='buttons'>
        <button>VEZI RETETELE</button>
        <button>ALATURA-TE</button>
        </div>
      </div>
      <div className="dreapta">
        <img src="chicken.jpg" alt="" className='img02'/>
        <img src="gogosi.avif" alt="" className='img01'/>
      </div>
    </div>
  )
}

export default HomePage