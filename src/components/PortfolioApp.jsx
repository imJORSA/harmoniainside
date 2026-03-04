import data from '../data/portfolio.js'
import GalleryPage from './GalleryPage.jsx'
import Footer from './Footer.jsx'

const HeaderPicture = '/images/BANNER.webp'

export default function PortfolioApp() {
  return (
    <>
      <GalleryPage
        name='Portfolio'
        data={data}
        headerImage={HeaderPicture}
        isMasonry={true}
        showText={false}
      />
      <Footer />
    </>
  )
}
