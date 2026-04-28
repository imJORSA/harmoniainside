import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'
import OptimizedImage from './OptimizedImage'
import '../i18n.js'

const HeaderPicture = '/images/BANNER.webp'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    const updatePathname = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/'
      setPathname(p)
    }
    updatePathname()
    document.addEventListener('astro:page-load', updatePathname)
    return () => document.removeEventListener('astro:page-load', updatePathname)
  }, [])

  const isActive = (path) => {
    if (!path || typeof path !== 'string' || path.startsWith('http')) return false
    if (path === '/') return pathname === '/' || pathname === ''
    return pathname.toLowerCase() === path.toLowerCase()
  }

  const [isContactOpen, setIsContactOpen] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const email = "harmoniainside@gmail.com"

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    sessionStorage.setItem('i18nextLng', lng)
    setLangDropdown(false)
  }

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'et', label: 'ET' },
    { code: 'it', label: 'IT' },
    { code: 'ja', label: 'JP' },
  ]

  const links = [
    { name: t('nav.portfolio'), path: '/' },
    { name: t('nav.projects'), path: '/Projects' },
    { name: t('nav.services'), path: '/Services' },
    { name: t('nav.about'), path: 'https://joonaskirsipuu.eu/about/', external: true },
    { name: t('nav.contact'), action: () => { setIsContactOpen(true); setMobileMenuOpen(false) } },
  ]

  return (
    <div className='w-full'>
      {/* BANNER SECTION */}
      <div className='relative flex h-full m-auto bg-stone-700'>
        <OptimizedImage 
          src={HeaderPicture} 
          loading="eager" 
          className='h-full w-full object-cover' 
          alt={t('banner_alt')} 
        />
      </div>

      {/* ACTUAL NAVBAR CONTAINER */}
      <div className='relative w-full h-auto px-4 py-2 bg-stone-700 text-white z-10 flex flex-col justify-center gap-1'>
        <div className='flex items-center justify-between gap-4'>
          <h1 className='cursor-default font-bold text-[10px] min-[400px]:text-xs sm:text-lg lg:text-xl tracking-[0.1em]'>
            {t('title')}
          </h1>

          {/* Language Switcher — desktop only */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="text-sm font-bold tracking-widest text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1"
            >
              LANG <FaChevronDown size={10} />
            </button>
            {langDropdown && (
              <div className="absolute right-0 top-full mt-4 bg-stone-700 border border-stone-500 shadow-xl flex flex-col min-w-[100px] z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    data-text={lang.label}
                    className={`nav-link px-4 py-3 text-sm font-bold tracking-widest text-center ${i18n.language.startsWith(lang.code) ? 'bg-orange-400 text-stone-700 shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 'text-white'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hamburger — mobile/tablet */}
          <button
            className='lg:hidden text-gray-400 hover:text-orange-400 transition-colors duration-300'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div> {/* End of TOP ROW */}

      {/* DESKTOP NAV LINKS */}
      <div className='hidden lg:flex flex-wrap w-full justify-start text-white font-bold text-sm xl:text-base items-center tracking-widest gap-y-1 gap-x-5'>
        {links.map((link) => (
          link.path ? (
            <a
              key={link.name}
              href={link.path}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              data-text={link.name}
              className={`nav-link font-black w-fit px-0 py-1 whitespace-nowrap ${
                isActive(link.path)
                  ? 'bg-orange-400 text-stone-700 shadow-[0_0_10px_rgba(251,146,60,0.5)]'
                  : ''
              }`}
            >
              {link.name}
            </a>
          ) : (
            <button
              key={link.name}
              onClick={link.action}
              data-text={link.name}
              className='nav-link font-black w-fit px-0 py-1 whitespace-nowrap'
            >
              {link.name}
            </button>
          )
        ))}
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className='lg:hidden fixed inset-0 bg-stone-700 z-40 flex flex-col px-8 pt-16 pb-12 gap-4 sm:gap-6'>
          <button
            className='absolute top-6 right-6 text-white hover:text-orange-400 transition-colors duration-300'
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes size={24} />
          </button>

          {links.map((link) => (
            link.path ? (
              <a
                key={link.name}
                href={link.path}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                data-text={link.name}
                className={`nav-link text-lg sm:text-2xl font-black tracking-widest ${
                  isActive(link.path) ? 'bg-orange-400 text-stone-700 shadow-[0_0_10px_rgba(251,146,60,0.5)] px-2' : 'text-white'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <button
                key={link.name}
                onClick={link.action}
                data-text={link.name}
                className='nav-link text-lg sm:text-2xl font-black tracking-widest text-left text-white'
              >
                {link.name}
              </button>
            )
          ))}

          {/* Language switcher in mobile menu */}
          <div className='flex gap-4 mt-2'>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false) }}
                data-text={lang.label}
                className={`nav-link text-sm sm:text-lg font-bold tracking-widest ${
                  i18n.language.startsWith(lang.code) ? 'bg-orange-400 text-stone-700 shadow-[0_0_10px_rgba(251,146,60,0.5)] px-2' : 'text-white'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="bg-stone-700 p-6 shadow-xl border border-orange-100 min-w-[300px] flex flex-col gap-4 scale-75 sm:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center">{t('contact_modal.title')}</h2>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${email}`} className="p-3 bg-stone-500 hover:bg-orange-400 hover:text-stone-700 transition-colors text-center font-semibold">
                {t('contact_modal.default_mail')}
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-stone-500 hover:bg-orange-400 hover:text-stone-700 transition-colors text-center font-semibold">
                {t('contact_modal.gmail')}
              </a>
              <a href={`https://outlook.office.com/mail/deeplink/compose?to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-stone-500 hover:bg-orange-400 hover:text-stone-700 transition-colors text-center font-semibold">
                {t('contact_modal.outlook')}
              </a>
              <a href={`https://compose.mail.yahoo.com/?to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-stone-500 hover:bg-orange-400 hover:text-stone-700 transition-colors text-center font-semibold">
                {t('contact_modal.yahoo')}
              </a>
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="mt-2 text-sm text-stone-400 hover:text-white self-center"
            >
              {t('contact_modal.close')}
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Navbar
