'use client'

export function AnimatedGrid() {
  return (
    <div className="-z-10 fixed inset-0 bg-[#0D001A] w-full h-full text-white">
      <div className="absolute bg-[radial-gradient(#ffffff15_1px,transparent_1px)] w-full h-full [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#3B096C_0%,transparent_100%)]" />
    </div>
  )
}

