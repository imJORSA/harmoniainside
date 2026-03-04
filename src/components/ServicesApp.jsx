import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const HeaderPicture = '/images/BANNER.webp'

const services = [
  {
    title: 'INTERIOR & EXTERIOR VISUALIZATION',
    description: 'Photorealistic 3D rendering and design for residential and commercial spaces.',
    image: '/images/portfolio/lai56_thumbnail.webp',
    alt: 'Interior visualization render — Lai Street Apartments',
    imageLeft: false,
  },
  {
    title: '3D DIGITAL SOLUTIONS & WAYFINDING',
    description: 'Interactive 3D environments and smart navigation systems for large-scale facilities.',
    image: '/images/portfolio/galeria_thumbnail.webp',
    alt: 'Galeria Metropolia 3D wayfinding map',
    imageLeft: true,
  },
  {
    title: 'ARCHITECTURAL VISUALIZATION',
    description: 'High-quality exterior renders showing massing, materials, and context for residential and commercial developments.',
    image: '/images/portfolio/kasteheina_thumbnail.webp',
    alt: 'Kasteheina Street Terraced House exterior render',
    imageLeft: false,
  },
  {
    title: '3D MAPPING & SPATIAL MODELS',
    description: 'Detailed 3D models of airports, hospitals, campuses, and urban areas for digital and print use.',
    image: '/images/portfolio/vilnius_thumbnail.webp',
    alt: 'Vilnius Airport 3D map',
    imageLeft: true,
  },
]

export default function ServicesApp() {
  return (
    <div name='Services' className='w-full min-h-screen bg-white flex flex-col'>
      {/* BANNER */}
      <div className='relative flex h-full m-auto bg-slate-900'>
        <img src={HeaderPicture} loading="eager" className='h-full w-full object-cover' alt='Harmonia INside banner' />
      </div>

      <Navbar />

      {/* BODY */}
      <div className='w-full flex-1 bg-white'>
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col ${service.imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} w-full min-h-[350px] sm:min-h-[450px]`}
          >
            {/* IMAGE */}
            <div className='w-full md:w-1/2 overflow-hidden'>
              <img
                src={service.image}
                alt={service.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 min-h-[250px]'
              />
            </div>

            {/* TEXT */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-12 xl:px-16 py-10 bg-white`}>
              <h2 className='text-lg sm:text-2xl xl:text-3xl font-bold text-black tracking-widest mb-5 leading-tight'>
                {service.title}
              </h2>
              <p className='text-xs sm:text-sm xl:text-base tracking-widest text-slate-600 leading-relaxed uppercase'>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
