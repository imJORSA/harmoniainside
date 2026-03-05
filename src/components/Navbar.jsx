import { useState, useEffect } from 'react'

const Navbar = () => {
  const [pathname, setPathname] = useState('')
  useEffect(() => { setPathname(window.location.pathname) }, [])
  const [isContactOpen, setIsContactOpen] = useState(false)
  const email = "harmonia.insideou@gmail.com"

  const links = [
    { name: 'PORTFOLIO', path: '/' },
    { name: 'PROJECTS', path: '/Projects' },
    { name: 'SERVICES', path: '/Services' },
    { name: 'ABOUT', href: 'https://joonaskirsipuu.eu/about/', external: true },
    { name: 'CONTACT', action: () => setIsContactOpen(true) },
  ]

  return (
    <div className='relative w-full h-auto px-4 py-2 bg-slate-900 text-white z-10 flex flex-col justify-center gap-1'>

      {/* TOP ROW — title */}
      <div className='flex items-center justify-between gap-4'>
        <h1 className='cursor-default font-bold text-[7px] min-[400px]:text-xs sm:text-lg lg:text-xl tracking-[0.1em]'>
          3D DESIGN STUDIO
        </h1>
      </div>

      {/* BOTTOM ROW — nav links */}
      <div className='flex flex-wrap w-full justify-start text-white font-bold text-[7px] min-[400px]:text-xs sm:text-sm xl:text-base items-center tracking-widest gap-y-1 gap-x-5'>
        {links.map((link) => {
          if (link.external) {
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className='font-black w-fit px-0 py-1 whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-300 hover:text-slate-900 hover:shadow-[0_0_10px_rgba(125,211,252,0.5)]'
              >
                {link.name}
              </a>
            )
          }
          if (link.path) {
            return (
              <a key={link.name} href={link.path}
                className={`font-black w-fit px-0 py-1 whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 ${
                  pathname === link.path
                    ? 'bg-amber-300 text-slate-900 shadow-[0_0_10px_rgba(125,211,252,0.5)]'
                    : 'hover:bg-amber-300 hover:text-slate-900 hover:shadow-[0_0_10px_rgba(125,211,252,0.5)]'
                }`}
              >
                {link.name}
              </a>
            )
          }
          return (
            <button
              key={link.name}
              onClick={link.action}
              className='font-bold w-fit px-0 py-1 whitespace-nowrap transition-all duration-300 ease-in-out hover:scale-105 hover:bg-amber-300 hover:text-slate-900 hover:shadow-[0_0_10px_rgba(125,211,252,0.5)]'
            >
              {link.name}
            </button>
          )
        })}
      </div>

      {/* CONTACT MODAL */}
      {isContactOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="bg-slate-900 p-6 shadow-xl border border-blue-100 min-w-[300px] flex flex-col gap-4 scale-75 sm:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center">CONTACT</h2>
            <div className="flex flex-col gap-2">
              <a href={`mailto:${email}`} className="p-3 bg-slate-700 hover:bg-amber-300 hover:text-slate-900 transition-colors text-center font-semibold">
                Open Default Mail
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-700 hover:bg-amber-300 hover:text-slate-900 transition-colors text-center font-semibold">
                Open Gmail
              </a>
              <a href={`https://outlook.office.com/mail/deeplink/compose?to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-700 hover:bg-amber-300 hover:text-slate-900 transition-colors text-center font-semibold">
                Open Outlook
              </a>
              <a href={`https://compose.mail.yahoo.com/?to=${email}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-700 hover:bg-amber-300 hover:text-slate-900 transition-colors text-center font-semibold">
                Open Yahoo Mail
              </a>
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="mt-2 text-sm text-slate-400 hover:text-white self-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
