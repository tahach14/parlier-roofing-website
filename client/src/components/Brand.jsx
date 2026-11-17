
import React from 'react'

export default function Brand({ light = false }) {
  return (
    <a
      className={`inline-flex min-w-[190px] items-center gap-2.5 ${
        light ? 'text-white' : 'text-roof-navy'
      }`}
      href="/"
      aria-label="Parlier Roofing Co. home"
    >
      <img
        src="/logo.png"
        alt="Parlier Roofing Co."
        className="h-60 w-auto max-w-[220px] object-contain"
      />
    </a>
  )
}
