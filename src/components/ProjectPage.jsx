import { useState, useEffect, useCallback, useRef } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa'
import Navbar from './Navbar'

const HeaderPicture = '/images/BANNER.webp'

/**
 * Reusable project detail page.
 * Props:
 *   title       {string}   — project name
 *   subtitle    {string}   — category / type
 *   description {string}   — body text
 *   images      {Array}    — [{ src, thumbnail, alt, width, height }]
 */
const ProjectPage = ({ title, subtitle, description, images = [] }) => {
  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const preloaded = useRef(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const handleClick = (item, index) => {
    setCurrentIndex(index)
    setClickedImg(item.src)
    setLoading(true)
  }

  const handleRotationRight = useCallback(() => {
    if (!images.length) return
    const newIndex = (currentIndex + 1) % images.length
    setCurrentIndex(newIndex)
    setClickedImg(images[newIndex].src)
    setLoading(true)
  }, [currentIndex, images])

  const handleRotationLeft = useCallback(() => {
    if (!images.length) return
    const newIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(newIndex)
    setClickedImg(images[newIndex].src)
    setLoading(true)
  }, [currentIndex, images])

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) handleRotationRight()
    if (distance < -minSwipeDistance) handleRotationLeft()
  }

  useEffect(() => {
    if (clickedImg && !loading && !preloaded.current) {
      images.forEach((item) => { const img = new Image(); img.src = item.src })
      preloaded.current = true
    }
  }, [clickedImg, loading, images])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!clickedImg) return
      if (e.key === 'Escape') setClickedImg(null)
      else if (e.key === 'ArrowRight') handleRotationRight()
      else if (e.key === 'ArrowLeft') handleRotationLeft()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [clickedImg, handleRotationRight, handleRotationLeft])

  useEffect(() => {
    document.body.style.overflow = clickedImg ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [clickedImg])

  return (
    <div className='w-full min-h-screen bg-white flex flex-col'>
      {/* BANNER */}
      <div className='relative flex h-full m-auto bg-slate-900'>
        <img src={HeaderPicture} loading="eager" className='h-full w-full object-cover' alt='Harmonia INside banner' />
      </div>

      <Navbar />

      {/* BODY */}
      <div className='w-full flex-1 bg-white py-10 px-4 xl:px-0'>
        {/* Back button */}
        <a
          href='/Projects'
          className='inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-sky-500 transition-colors duration-300 mb-8 tracking-widest'
        >
          <FaArrowLeft /> BACK TO PROJECTS
        </a>

        {/* Title block */}
        <div className='mb-10'>
          <p className='text-xs sm:text-sm text-blue-500 font-bold tracking-widest uppercase mb-1'>{subtitle}</p>
          <h1 className='text-2xl sm:text-4xl xl:text-5xl font-bold text-black tracking-widest uppercase'>{title}</h1>
          {description && (
            <p className='mt-6 text-sm sm:text-base leading-7 text-slate-700 max-w-3xl'>{description}</p>
          )}
        </div>

        {/* Image grid */}
        <div className='columns-1 sm:columns-2 xl:columns-3 gap-4'>
          {images.map((item, index) => (
            <div
              key={index}
              className='break-inside-avoid mb-4 group cursor-pointer overflow-hidden'
              onClick={() => handleClick(item, index)}
            >
              <img
                src={item.thumbnail || item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading={index < 3 ? 'eager' : 'lazy'}
                className='w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
              />
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {clickedImg && (
        <div
          className="overlay"
          onClick={(e) => { if (e.target.classList.contains('overlay')) setClickedImg(null) }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="modal-wrapper">
            {!loading && (
              <>
                <span onClick={() => setClickedImg(null)}><FaTimes /></span>
                <div className="overlay-arrows_left" onClick={handleRotationLeft}><FaChevronLeft /></div>
                <div className="overlay-arrows_right" onClick={handleRotationRight}><FaChevronRight /></div>
              </>
            )}
            {loading && <div className="scifi-loader"></div>}
            <img
              src={clickedImg}
              alt={images[currentIndex]?.alt || 'Project image'}
              onLoad={() => setLoading(false)}
              style={{ display: loading ? 'none' : 'block' }}
            />
          </div>
          <div className='absolute bottom-0 left-0 w-full text-center p-4 bg-gradient-to-t from-sky-900 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
            <h2 className='text-white text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
              {images[currentIndex]?.alt}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPage
