import { useTranslation } from 'react-i18next'
import OptimizedImage from './OptimizedImage.jsx'
import '../i18n.js'

const services = [
  {
    key: 'interior',
    image: '/images/projects/lai56/render_01_thumbnail.webp',
    alt: 'projects.lai56.alt',
    imageLeft: false,
  },
  {
    key: 'architectural',
    image: '/images/projects/kasteheina/render_01_thumbnail.webp',
    alt: 'projects.kasteheina.alt',
    imageLeft: true,
  },
]

export default function ServicesApp() {
  const { t } = useTranslation()

  return (
    <div name='Services' className='w-full bg-white'>

      {/* BODY */}
      <div className='w-full flex-1 bg-white py-8 px-4 xl:px-0'>
        <h1 className='text-3xl sm:text-5xl font-bold text-orange-500 mb-5 tracking-widest'>{t('nav.services')}</h1>
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col ${service.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} w-full min-h-[350px] sm:min-h-[450px]`}
          >
            {/* IMAGE */}
            <div className='w-full md:w-1/2 overflow-hidden'>
              <OptimizedImage
                src={service.image}
                alt={t(service.alt)}
                loading={index === 0 ? 'eager' : 'lazy'}
                className='w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500 min-h-[250px]'
              />
            </div>

            {/* TEXT — left-aligned on mobile, centered on md+ */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-start md:items-center pt-4 pb-8 md:py-10 bg-white'>
              <div className='w-full md:w-auto md:px-16'>
                <h2 className='text-lg sm:text-2xl xl:text-3xl font-bold text-orange-500 tracking-widest mb-1 leading-tight'>
                  {t(`services.${service.key}.title`)}
                </h2>
                <p className='text-xs sm:text-sm xl:text-base tracking-widest text-slate-600 leading-relaxed uppercase'>
                  {t(`services.${service.key}.description`)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
