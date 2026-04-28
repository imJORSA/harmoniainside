import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import OptimizedImage from './OptimizedImage'
import '../i18n.js'

const GAP = 16

const MasonryGrid = ({ data, renderItem }) => {
  const containerRef = useRef(null)
  const [positions, setPositions] = useState([])
  const [containerHeight, setContainerHeight] = useState(0)
  const itemRefs = useRef([])
  const loadedCount = useRef(0)

  const getColCount = () => {
    const w = containerRef.current?.offsetWidth || window.innerWidth
    if (w >= 1280) return 4
    if (w >= 1024) return 3
    return 2
  }

  const recalculate = useCallback(() => {
    if (!containerRef.current) return
    const cols = getColCount()
    const containerWidth = containerRef.current.offsetWidth
    const colWidth = (containerWidth - GAP * (cols - 1)) / cols
    const colHeights = Array(cols).fill(0)
    const newPositions = data.map((item, i) => {
      const el = itemRefs.current[i]
      const itemHeight = el ? el.offsetHeight : (item.height / item.width) * colWidth
      const shortest = colHeights.indexOf(Math.min(...colHeights))
      const x = shortest * (colWidth + GAP)
      const y = colHeights[shortest]
      colHeights[shortest] += itemHeight + GAP
      return { x, y, width: colWidth }
    })
    setPositions(newPositions)
    setContainerHeight(Math.max(...colHeights))
  }, [data])

  useEffect(() => {
    const observer = new ResizeObserver(() => recalculate())
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [recalculate])

  const onImageLoad = useCallback(() => {
    loadedCount.current += 1
    if (loadedCount.current >= data.length) recalculate()
  }, [data.length, recalculate])

  useEffect(() => {
    loadedCount.current = 0
    recalculate()
  }, [data, recalculate])

  return (
    // Outer div provides the padding; inner div is the absolute-position canvas
    <div className='bg-white px-4 xl:px-0 pt-0 pb-8'>
      <div
        ref={containerRef}
        style={{ position: 'relative', height: containerHeight || 'auto' }}
      >
        {data.map((item, index) => {
          const pos = positions[index]
          return (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              style={pos ? {
                position: 'absolute',
                top: 0,
                left: 0,
                width: pos.width,
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                transition: 'transform 0.3s ease'
              } : {
                position: 'absolute',
                opacity: 0,
                width: '100%'
              }}
            >
              {renderItem(item, index, onImageLoad)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const GalleryPage = ({
  name,
  data,
  children,
  isMasonry = false,
  showText = true,
  imageObjectFit = 'object-fill'
}) => {
  const { t } = useTranslation()
  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  const handleClick = (item, index) => {
    setCurrentIndex(index)
    setClickedImg(item.full)
    setLoading(true)
  }

  const handleRotationRight = useCallback(() => {
    if (!data || data.length === 0) return
    let newIndex = currentIndex
    const totalLength = data.length
    do { newIndex = (newIndex + 1) % totalLength } while (data[newIndex].isLink)
    setCurrentIndex(newIndex)
    setClickedImg(data[newIndex].full)
    setLoading(true)
  }, [currentIndex, data])

  const handleRotationLeft = useCallback(() => {
    if (!data || data.length === 0) return
    let newIndex = currentIndex
    const totalLength = data.length
    do { newIndex = (newIndex - 1 + totalLength) % totalLength } while (data[newIndex].isLink)
    setCurrentIndex(newIndex)
    setClickedImg(data[newIndex].full)
    setLoading(true)
  }, [currentIndex, data])

  const onTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX) }
  const onTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX) }
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > minSwipeDistance) handleRotationRight()
    if (distance < -minSwipeDistance) handleRotationLeft()
  }

  useEffect(() => {
    if (currentIndex !== null && data) {
      const nextIndex = (currentIndex + 1) % data.length
      const prevIndex = (currentIndex - 1 + data.length) % data.length
      
      if (data[nextIndex]?.full) { new Image().src = data[nextIndex].full }
      if (data[prevIndex]?.full) { new Image().src = data[prevIndex].full }
    }
  }, [currentIndex, data])

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

  const renderItem = (item, index, onLoad = () => {}) => {
    if (item.isLink) {
      return (
        <div className='images relative group cursor-pointer'>
          <a href={item.href} target="_blank" rel="noreferrer">
            <OptimizedImage
              src={item.thumbnail}
              alt={t(item.alt)}
              className={`w-full ${imageObjectFit} grayscale`}
              onLoad={onLoad}
              onError={onLoad}
            />
            <div className='absolute inset-0 flex justify-center items-center'>
              <h1 className='text-lg sm:text-2xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300 drop-shadow-lg text-center'>
                {t(item.text)}
              </h1>
            </div>
          </a>
        </div>
      )
    }
    return (
      <div className='images group cursor-pointer overflow-hidden'>
        <OptimizedImage
          src={item.thumbnail}
          alt={t(item.alt)}
          className={`w-full ${imageObjectFit} grayscale group-hover:grayscale-0 transition duration-500 block`}
          onClick={() => handleClick(item, index)}
          onLoad={onLoad}
          onError={(e) => { e.target.style.display = 'none'; onLoad() }}
        />
        {showText && (
          <>
            <h2 className='pt-1 text-xs sm:text-base xl:text-lg font-bold pointer-events-none text-orange-950'>{t(item.text)}</h2>
            <h2 className='text-[8px] sm:text-xs font-thin pointer-events-none text-orange-950'>{t(item.subtext)}</h2>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div name={name} className='w-full bg-white'>
        {children}

        {isMasonry ? (
          <MasonryGrid data={data || []} renderItem={renderItem} />
        ) : (
          <div
            className={showText
              ? 'bg-white grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 pb-20 px-4 xl:px-16'
              : 'bg-white grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 pb-8 px-4 xl:px-16'
            }
            style={{ gap: `${GAP}px` }}
          >
            {data && data.map((item, index) => renderItem(item, index))}
          </div>
        )}

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
                alt={data[currentIndex] ? t(data[currentIndex].alt) : 'Gallery Image'}
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
              <h2 className='text-white text-xl md:text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                {data[currentIndex] && t(data[currentIndex].text)}
              </h2>
              <p className='text-white text-sm md:text-base font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                {data[currentIndex] && t(data[currentIndex].subtext)}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GalleryPage
