import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTimes, FaChevronLeft, FaChevronRight, FaArrowLeft } from 'react-icons/fa'
import OptimizedImage from './OptimizedImage'
import '../i18n.js'

const ProjectPage = ({ title, subtitle, description, images = [], maxColumns = 3 }) => {
  const { t } = useTranslation()
  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [loading, setLoading] = useState(false)
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
    if (currentIndex !== null && images.length > 0) {
      const nextIndex = (currentIndex + 1) % images.length
      const prevIndex = (currentIndex - 1 + images.length) % images.length
      
      new Image().src = images[nextIndex].src
      new Image().src = images[prevIndex].src
    }
  }, [currentIndex, images])

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
    <div className='w-full bg-white'>

      {/* BODY */}
      <div className='w-full flex-1 bg-white py-10 px-4 xl:px-0'>

        {/* Title block */}
        <div className='mb-10'>
          <p className='text-xs sm:text-sm text-black font-bold tracking-widest uppercase mb-1'>{t(subtitle)}</p>
          <h1 className='text-2xl sm:text-4xl xl:text-5xl font-bold text-orange-500 tracking-widest uppercase'>{t(title)}</h1>
          {description && (
            <p className='mt-6 text-sm sm:text-base leading-7 text-slate-700 max-w-3xl'>{t(description)}</p>
          )}
        </div>

        {/* Image grid */}
        <div className={`columns-1 sm:columns-2 ${maxColumns >= 3 ? 'xl:columns-3' : ''} gap-4`}>
          {images.map((item, index) => (
            <div
              key={index}
              className='break-inside-avoid mb-4 group cursor-pointer overflow-hidden'
              onClick={() => handleClick(item, index)}
            >
              <OptimizedImage
                src={item.thumbnail || item.src}
                alt={t(item.alt)}
                width={item.width}
                height={item.height}
                loading={index < 3 ? 'eager' : 'lazy'}
                className='w-full h-auto object-cover grayscale group-hover:grayscale-0 transition duration-500'
              />
            </div>
          ))}
        </div>

        {/* Back button */}
        <a
          href='/Projects'
          className='inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-orange-300 transition-colors duration-300 mt-12 tracking-widest'
        >
          <FaArrowLeft /> {t('nav.projects')}
        </a>
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
              </>
            )}
            {loading && <div className="scifi-loader"></div>}
            <OptimizedImage
              src={clickedImg}
              alt={t(images[currentIndex]?.alt) || 'Project image'}
              onLoad={() => setLoading(false)}
              style={{ display: loading ? 'none' : 'block' }}
            />
            {!loading && (
              <div className="overlay-nav">
                <div className="overlay-arrows_left" onClick={handleRotationLeft}><FaChevronLeft /></div>
                <div className="overlay-arrows_right" onClick={handleRotationRight}><FaChevronRight /></div>
              </div>
            )}
          </div>
          <div className='absolute bottom-0 left-0 w-full text-center p-4 bg-gradient-to-t from-orange-900 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
            <h2 className='text-white text-xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
              {t(images[currentIndex]?.alt)}
            </h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPage
