import { useTranslation } from 'react-i18next'
import '../i18n.js'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <div className='w-full h-[85px] px-4 py-2 bg-stone-700 text-white z-10 flex flex-col items-center justify-center'>
      <h1 className='cursor-default font-bold text-[10px] sm:text-sm lg:text-lg'>{t('footer.title')}</h1>
      <p className='text-[8px] sm:text-xs lg:text-sm mt-2'>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
    </div>
  )
}

export default Footer
