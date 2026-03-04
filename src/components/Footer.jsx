const Footer = () => {
  return (
    <div className='w-full h-[85px] px-4 py-2 bg-slate-900 text-white z-10 flex flex-col items-center justify-center'>
      <h1 className='cursor-default font-bold text-[10px] sm:text-sm lg:text-lg'>HARMONIA INSIDE</h1>
      <p className='text-[8px] sm:text-xs lg:text-sm mt-2'>© {new Date().getFullYear()} Harmonia INside. All rights reserved.</p>
    </div>
  )
}

export default Footer
