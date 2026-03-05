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
      >
        <h1 className='text-3xl sm:text-5xl font-bold text-amber-500 mb-5 tracking-widest px-4 xl:px-0 pt-8'>PORTFOLIO</h1>
      </GalleryPage>
      <Footer />
    </>
  )
}
