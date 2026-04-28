import { useTranslation } from 'react-i18next'
import data from '../data/portfolio.js'
import GalleryPage from './GalleryPage.jsx'
import '../i18n.js'

export default function PortfolioApp() {
  const { t } = useTranslation()
  return (
    <>
      <GalleryPage
        name='Portfolio'
        data={data}
        isMasonry={true}
        showText={false}
      >
        <h1 className='text-3xl sm:text-5xl font-bold text-orange-500 mb-5 tracking-widest px-4 xl:px-0 pt-8'>{t('nav.portfolio')}</h1>
      </GalleryPage>
    </>
  )
}
