import data from '../data/projects.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const HeaderPicture = '/images/BANNER.webp'

export default function ProjectsApp() {
  return (
    <div name='Projects' className='w-full min-h-screen bg-white flex flex-col'>
      {/* BANNER */}
      <div className='relative flex h-full m-auto bg-slate-900'>
        <img src={HeaderPicture} loading="eager" className='h-full w-full object-cover' alt='Harmonia INside banner' />
      </div>

      <Navbar />

      {/* BODY */}
      <div className='w-full flex-1 bg-white py-10 px-4 xl:px-0'>
        <h1 className='text-3xl sm:text-5xl font-bold text-black mb-8 tracking-widest'>PROJECTS</h1>

        <div className='grid grid-cols-2 gap-4 sm:gap-6'>
          {data.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className='group block overflow-hidden'
            >
              <div className='relative overflow-hidden'>
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  className='w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                />
              </div>
              <h2 className='mt-2 text-[10px] sm:text-sm font-bold text-black tracking-widest uppercase group-hover:text-sky-500 transition-colors duration-300'>
                {item.text}
              </h2>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
