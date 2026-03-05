import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const HeaderPicture = '/images/BANNER.webp'

const services = [
  {
    title: 'INTERIOR VISUALIZATION',
    description: 'Photorealistic 3D rendering and design for residential and commercial spaces.',
    image: '/images/projects/lai56/render_01_thumbnail.webp',
    alt: 'Lai Street Apartment 5',
    imageLeft: false,
  },
  {
    title: '3D DIGITAL SOLUTIONS & WAYFINDING',
    description: 'Interactive 3D environments and smart navigation systems for large-scale facilities.',
    image: '/images/projects/galeria/render_01_thumbnail.webp',
    alt: 'Galeria Metropolia 3D wayfinding map',
    imageLeft: true,
  },
  {
    title: 'ARCHITECTURAL VISUALIZATION',
    description: 'High-quality exterior renders showing massing, materials, and context for residential and commercial developments.',
    image: '/images/projects/kasteheina/render_01_thumbnail.webp',
    alt: 'Kasteheina Street Terraced House exterior render',
    imageLeft: false,
  },
  {
    title: '2D DIGITAL SOLUTIONS & WAYFINDING',
    description: 'Interactive 2D environments and smart navigation systems for large-scale facilities.',
    image: '/images/projects/vilnius/render_01_thumbnail.webp',
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
      <div className='w-full flex-1 bg-white py-8 px-4 xl:px-0'>
        <h1 className='text-3xl sm:text-5xl font-bold text-amber-500 mb-5 tracking-widest'>SERVICES</h1>
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

            {/* TEXT — left-aligned on mobile, centered on md+ */}
            <div className='w-full md:w-1/2 flex flex-col justify-center items-start md:items-center pt-4 pb-8 md:py-10 bg-white'>
              <div className='w-full md:w-auto md:px-16'>
                <h2 className='text-lg sm:text-2xl xl:text-3xl font-bold text-amber-500 tracking-widest mb-1 leading-tight'>
                  {service.title}
                </h2>
                <p className='text-xs sm:text-sm xl:text-base tracking-widest text-slate-600 leading-relaxed uppercase'>
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}
