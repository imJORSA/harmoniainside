import { useState, useEffect, useRef, useCallback } from 'react'
import data from '../data/projects.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const HeaderPicture = '/images/BANNER.webp'
const GAP = 24

const MasonryGrid = ({ data }) => {
  const containerRef = useRef(null)
  const [positions, setPositions] = useState([])
  const [containerHeight, setContainerHeight] = useState(0)
  const itemRefs = useRef([])
  const loadedCount = useRef(0)

  const recalculate = useCallback(() => {
    if (!containerRef.current) return
    const containerWidth = containerRef.current.offsetWidth
    const cols = 2
    const colWidth = (containerWidth - GAP) / cols
    const colHeights = [0, 0]
    const newPositions = data.map((item, i) => {
      const el = itemRefs.current[i]
      const itemHeight = el ? el.offsetHeight : (item.height / item.width) * colWidth + 32
      const shortest = colHeights[0] <= colHeights[1] ? 0 : 1
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
              left: pos.x,
              top: pos.y,
              width: pos.width,
              transition: 'top 0.3s ease, left 0.3s ease'
            } : {
              position: 'absolute',
              opacity: 0,
              width: '100%'
            }}
          >
            <a href={item.href} className='group block overflow-hidden'>
              <div className='relative w-full overflow-hidden'>
                <img
                  src={item.thumbnail}
                  alt={item.alt}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  className='w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                  onLoad={onImageLoad}
                  onError={onImageLoad}
                />
              </div>
              <h2 className='mt-2 mb-4 text-[10px] sm:text-sm font-bold text-black tracking-widest uppercase'>
                {item.text}
              </h2>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default function ProjectsApp() {
  return (
    <div name='Projects' className='w-full min-h-screen bg-white flex flex-col'>
      {/* BANNER */}
      <div className='relative flex h-full m-auto bg-slate-900'>
        <img src={HeaderPicture} loading="eager" className='h-full w-full object-cover' alt='Harmonia INside banner' />
      </div>

      <Navbar />

      {/* BODY */}
      <div className='w-full flex-1 bg-white py-8 px-4 xl:px-0'>
        <h1 className='text-3xl sm:text-5xl font-bold text-amber-500 mb-5 tracking-widest'>PROJECTS</h1>
        <MasonryGrid data={data} />
      </div>

      <Footer />
    </div>
  )
}
