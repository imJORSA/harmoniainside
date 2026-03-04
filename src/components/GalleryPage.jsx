import { useState, useEffect, useCallback, useRef } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Navbar from './Navbar'
import OptimizedImage from './OptimizedImage'

const GAP = 16 // px — change this one value to adjust all spacing

// Splits items into N columns, always placing next item in shortest column
function buildColumns(items, count) {
  const columns = Array.from({ length: count }, () => [])
  const heights = Array(count).fill(0)
  items.forEach((item, index) => {
    const shortest = heights.indexOf(Math.min(...heights))
    columns[shortest].push({ item, index })
    // Use aspect ratio as a proxy for rendered height
    heights[shortest] += (item.height / item.width)
  })
  return columns
}

const MasonryGrid = ({ data, renderItem }) => {
  const containerRef = useRef(null)
  const [colCount, setColCount] = useState(2)

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth || window.innerWidth
      if (w >= 1280) setColCount(4)
      else if (w >= 1024) setColCount(3)
      else setColCount(2)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const columns = buildColumns(data, colCount)

  return (
    <div
      ref={containerRef}
      className='bg-white px-4 xl:px-0 pt-4 pb-4'
      style={{ display: 'flex', gap: `${GAP}px` }}
    >
      {columns.map((col, ci) => (
        <div
          key={ci}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}
        >
          {col.map(({ item, index }) => renderItem(item, index))}
        </div>
      ))}
    </div>
  )
}

const GalleryPage = ({
  headerImage,
  name,
  data,
  children,
  isMasonry = false,
  showText = true,
  imageObjectFit = 'object-fill'
}) => {
  const [clickedImg, setClickedImg] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const preloaded = useRef(false)
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
    if (clickedImg && !loading && !preloaded.current) {
      data.forEach((item) => {
        if (item.full && !item.isLink) { const img = new Image(); img.src = item.full }
      })
      preloaded.current = true
    }
  }, [clickedImg, loading, data])

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

  const renderItem = (item, index) => {
    if (item.isLink) {
      return (
        <div key={index} className='images relative group cursor-pointer'>
          <a href={item.href} target="_blank" rel="noreferrer">
            <OptimizedImage
              className={`text-transparent w-full ${imageObjectFit} grayscale`}
              src={item.thumbnail}
              alt={item.alt}
              width={item.width}
              height={item.height}
            />
            <div className='absolute inset-0 flex justify-center items-center'>
              <h1 className='text-lg sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300 drop-shadow-lg text-center'>
                {item.text}
              </h1>
            </div>
          </a>
        </div>
      )
    }
    return (
      <div key={index} className='images group cursor-pointer overflow-hidden'>
        <OptimizedImage
          className={`text-transparent w-full ${imageObjectFit} grayscale group-hover:grayscale-0 transition-all duration-500`}
          src={item.thumbnail}
          alt={item.alt}
          width={item.width}
          height={item.height}
          onClick={() => handleClick(item, index)}
        />
        {showText && (
          <>
            <h2 className='pt-1 text-xs sm:text-base xl:text-lg font-bold pointer-events-none text-cyan-950'>{item.text}</h2>
            <h2 className='text-[8px] sm:text-xs font-thin pointer-events-none text-cyan-950'>{item.subtext}</h2>
          </>
        )}
      </div>
    )
  }

  return (
    <>
      <div name={name} className='w-full min-h-screen bg-white'>
        {headerImage && (
          <div className='relative flex h-full m-auto bg-slate-900'>
            <img src={headerImage} loading="eager" className='h-full w-full object-cover' alt='Harmonia INside' />
          </div>
        )}

        <Navbar />

        {children}

        {isMasonry ? (
          <MasonryGrid data={data || []} renderItem={renderItem} />
        ) : (
          <div
            className={showText
              ? 'bg-white grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 pb-20 px-4 xl:px-0'
              : 'bg-white grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4 pb-4 px-4 xl:px-0'
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
                  <div className="overlay-arrows_left" onClick={handleRotationLeft}><FaChevronLeft /></div>
                  <div className="overlay-arrows_right" onClick={handleRotationRight}><FaChevronRight /></div>
                </>
              )}
              {loading && <div className="scifi-loader"></div>}
              <img
                src={clickedImg}
                alt={data[currentIndex] ? data[currentIndex].alt : 'Gallery Image'}
                onLoad={() => setLoading(false)}
                style={{ display: loading ? 'none' : 'block' }}
              />
            </div>
            <div className='absolute bottom-0 left-0 w-full text-center p-4 bg-gradient-to-t from-sky-900 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'>
              <h2 className='text-white text-xl md:text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                {data[currentIndex] && data[currentIndex].text}
              </h2>
              <p className='text-white text-sm md:text-base font-light drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>
                {data[currentIndex] && data[currentIndex].subtext}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GalleryPage
