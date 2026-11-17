
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, House, Building2, ClipboardCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const services = [
  ['tpoTitle', 'tpoDesc', '/tpo&pvc.jpg'],
  ['torchTitle', 'torchDesc', '/torch-down-roofing.jpg'],
  ['coatingsTitle', 'coatingsDesc', '/roof-coatings.jpg'],
  ['shingleTitle', 'shingleDesc', '/Shingle-roofing.jpg'],
  ['tileTitle', 'tileDesc', '/Tile-roofs.jpg'],
  ['metalTitle', 'metalDesc', '/Metal-roofing.jpg'],
  ['decksTitle', 'decksDesc', '/roof-decks.jpg']
]

const defaultHero = '/roofing-services.jpg'

export function PageHero({ eyebrow, title, description, image }) {
  return (
    <section
      className="relative flex min-h-[300px] items-center overflow-hidden bg-cover bg-center py-16 text-white md:min-h-[360px]"
      style={{ backgroundImage: `linear-gradient(90deg,rgba(9,20,30,.93),rgba(9,20,30,.5)),url(${image || defaultHero})` }}
    >
      <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
        <span className="text-[13px] font-bold tracking-[.22em] text-roof-red">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl font-display text-6xl font-extrabold leading-[.92] md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-[600px] text-base leading-7 text-[#d0d7dc]">{description}</p>
      </div>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, copy, center = false }) {
  return (
    <div className={`mb-9 max-w-[660px] ${center ? 'mx-auto text-center' : ''}`}>
      <span className="text-[14px] font-bold tracking-[.22em] text-[#ff0000]">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl font-bold leading-none text-roof-navy md:text-[54px]">{title}</h2>
      {copy && <p className="mt-4 text-[16px] leading-7 text-[#68737c]">{copy}</p>}
    </div>
  )
}

export function ServiceCards({ limit }) {
  const { t } = useLanguage()

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.slice(0, limit || services.length).map(([nameKey, descKey, img], i) => (
        <article className="group overflow-hidden border border-[#e7eaed] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl" key={nameKey}>
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={img} alt={t(nameKey)} />
            <span className="absolute bottom-3 left-4 font-display text-2xl text-white drop-shadow">0{i + 1}</span>
            <div className="absolute inset-0 bg-gradient-to-t from-[#101c28]/50 to-transparent" />
          </div>
          <div className="p-5">
            <h3 className="font-display text-2xl font-bold text-roof-navy">{t(nameKey)}</h3>
            <p className="mt-2 min-h-10 text-sm leading-6 text-[#707b83]">{t(descKey)}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

export function TrustStrip() {
  const { t } = useLanguage()

  const items = [
    [ShieldCheck, 'trustCommercial', 'trustCommercialDesc'],
    [ClipboardCheck, 'trustEstimates', 'trustEstimatesDesc'],
    [House, 'trustLocal', 'trustLocalDesc'],
    [Building2, 'trustSystems', 'trustSystemsDesc']
  ]

  return (
    <div className="grid grid-cols-2 gap-5 bg-[#f5f6f6] px-5 py-7 md:grid-cols-4 md:px-[max(24px,calc((100%-1180px)/2))]">
      {items.map(([Icon, title, desc]) => (
        <div className="grid grid-cols-[30px_1fr] items-center gap-x-3" key={title}>
          <Icon className="row-span-2 text-[#ff0000]" size={25} />
          <b className="text-[12px] md:text-sm">{t(title)}</b>
          <span className="mt-1 text-[12px] text-[#75808a]">{t(desc)}</span>
        </div>
      ))}
    </div>
  )
}

export function CTA() {
  const { t } = useLanguage()

  return (
    <section className="bg-roof-navy py-12 text-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-40px))] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
        <div>
          <span className="text-[13px] font-bold tracking-[.22em] text-roof-red">{t('let\'sTalk')}</span>
          <h2 className="mt-2 font-display text-4xl font-bold">{t('nextStep')}</h2>
          <p className="mt-2 text-sm text-[#c0c9d0]">{t('nextStepDesc')}</p>
        </div>
        <Link className="inline-flex items-center gap-3 bg-roof-red px-6 py-4 text-sm font-bold text-roof-navy transition hover:-translate-y-0.5 hover:bg-[#ff0000]/80" to="/contact">
          {t('freeQuoteButton')} <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}
