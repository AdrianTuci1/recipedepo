import ImageGallery from "./ImageGallery"
import '../styles/legenda.scss'


const images = [
    { url: '/easy.png', description: 'Description for image 1' },
    { url: '/price.png', description: 'Description for image 2' },
    { url: '/prepare.png', description: 'Description for image 3' },
    { url: '/cook.png', description: 'Description for image 4' },
    { url: '/maincourse.png', description: 'Description for image 4' },
    { url: '/desert.png', description: 'Description for image 5' },
    { url: '/salad.png', description: 'Description for image 6' },
    { url: '/supe.png', description: 'Description for image 7' },
    { url: '/sushi.png', description: 'Description for image 8' },
    { url: '/protein.png', description: 'Description for image 8' },
    { url: '/vegan.png', description: 'Description for image 8' },
    { url: '/traditional.png', description: 'Description for image 8' },
    { url: '/balanced.png', description: 'Description for image 8' },
  ];


function LegendaIcn() {
  return (
    <div className="stil-icn">
        <div className="stil-desc">
            <div className="stil-desc-wr">
                <h2> <img src="/traditionalmain.png" alt="dao" style={{width:'70px', height:'70px'}} />SIMBOLURI INTUITIVE</h2>
                <span>
                    FOLOSIM SIMBOLURI INTUITIVE SI UN SISTEM DE FILTRARE COMPLEX CA RETELE NOASTRE SA FIE MAI USOR DE RECUNOSCUT SI GASIT.
                </span>
            </div>
        </div>
        <div className="stil-comp">
            <ImageGallery images={images} />
        </div>
    </div>
  )
}

export default LegendaIcn