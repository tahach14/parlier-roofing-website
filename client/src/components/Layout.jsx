
import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Phone, MapPin, Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react'
import Brand from './Brand'
import { useLanguage } from '../context/LanguageContext'

const navClass = ({ isActive }) =>
  `text-[16px] font-semibold transition-colors hover:text-[#ff0000] ${
    isActive ? 'text-[#ff0000]' : 'text-[#39434b]'
  }`

export function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const links = [
    [t('home'), '/'],
    [t('works'), '/our-works'],
    [t('gallery'), '/gallery'],
    [t('services'), '/services'],
    [t('contact'), '/contact']
  ]

  const serviceLinks = [
  ['tpoTitle', '/services/tpoTitle'],
  ['torchTitle', '/services/torchTitle'],
  ['coatingsTitle', '/services/coatingsTitle'],
  ['shingleTitle', '/services/shingleTitle'],
  ['tileTitle', '/services/tileTitle'],
  ['metalTitle', '/services/metalTitle'],
  ['decksTitle', '/services/decksTitle']
]

  return (
    <>
      <div className="bg-roof-deep text-[#dce2e6] text-[13px] tracking-wide">
        <div className="mx-auto flex min-h-[42px] w-[min(1180px,calc(100%-40px))] flex-wrap items-center justify-between gap-3 py-2 relative">
          <span className="flex items-center gap-2">
            <MapPin size={18} className="text-roof-red" />
            <span className="hidden sm:inline">{t('serving')}</span>
            <span className="sm:hidden">Parlier, CA</span>
          </span>

          <span className="hidden lg:flex items-center justify-center gap-2 absolute left-1/2 -translate-x-1/2">
  {t('freeEstimates')}
  <i className="not-italic text-roof-red">•</i>
  {t('spanishSpoken')}
</span>

          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center rounded border border-white/20 p-1 text-[12px] font-bold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 transition ${language === 'en' ? 'bg-roof-red text-roof-navy' : 'text-white hover:bg-white/10'}`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 transition ${language === 'es' ? 'bg-roof-red text-roof-navy' : 'text-white hover:bg-white/10'}`}
                aria-pressed={language === 'es'}
              >
                ES
              </button>
            </div>

            <a href="tel:5595723526" className="flex items-center gap-2">
              <Phone size={18} className="text-roof-red" />
              <span className="hidden sm:inline">(559) 572-3526</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </div>

      <header className="relative z-30 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-[82px] w-[min(1180px,calc(100%-40px))] items-center justify-between">
          <Brand />

          <button
            className="rounded border border-slate-200 p-2 text-roof-navy md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>

          <nav className={`${open ? 'absolute left-0 right-0 top-full flex flex-col border-t border-slate-100 bg-white px-6 py-4 shadow-xl' : 'hidden'} items-stretch gap-0 md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
            {links.map(([label, path]) => (
  path === '/services' ? (
    <div
  key={path}
  className="relative group border-b border-slate-100 md:border-0"
  onMouseEnter={() => setServicesOpen(true)}
  onMouseLeave={() => setServicesOpen(false)}
>
      <div className="flex items-center justify-between md:justify-start">
        <NavLink
          to={path}
          className={({ isActive }) => `${navClass({ isActive })} py-3 md:py-0`}
          onClick={() => setOpen(false)}
        >
          {label}
        </NavLink>

        <button
          type="button"
          className="p-3 text-roof-navy md:p-2"
          aria-label="Toggle services menu"
          onClick={() => setServicesOpen(!servicesOpen)}
        >
          <ChevronDown
            size={17}
            className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div
  className={`${
    servicesOpen ? 'block' : 'hidden'
  } static w-full bg-white py-2 md:absolute md:left-0 md:top-full md:w-[260px] md:border md:border-slate-100 md:shadow-xl`}
>
        {serviceLinks.map(([key, servicePath]) => (
  <Link
    key={key}
    to={servicePath}
    onClick={() => {
  setServicesOpen(false)
  setOpen(false)
}}
    className="block px-5 py-2.5 text-[14px] font-medium text-[#39434b] transition hover:bg-slate-50 hover:text-[#ff0000]"
  >
    {t(key)}
  </Link>
))}
      </div>
    </div>
  ) : (
    <NavLink
      key={path}
      to={path}
      end={path === '/'}
      className={({ isActive }) => `${navClass({ isActive })} border-b border-slate-100 py-3 md:border-0 md:py-0`}
      onClick={() => setOpen(false)}
    >
      {label}
    </NavLink>
  )
))}

            <Link
              className="mt-3 inline-flex items-center justify-center gap-3 bg-roof-navy px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#23394b] md:mt-0"
              to="/contact"
              onClick={() => setOpen(false)}
            >
              {t('freeQuote')} <ArrowUpRight size={16} className="text-roof-red" />
            </Link>

            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 md:hidden">
              <span className="mr-2 text-sm font-semibold text-slate-600">Language:</span>
              <button onClick={() => setLanguage('en')} className={`border px-4 py-2 text-sm font-bold ${language === 'en' ? 'border-roof-red bg-roof-red text-roof-navy' : 'border-slate-200'}`}>English</button>
              <button onClick={() => setLanguage('es')} className={`border px-4 py-2 text-sm font-bold ${language === 'es' ? 'border-roof-red bg-roof-red text-roof-navy' : 'border-slate-200'}`}>Español</button>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-roof-deep pt-14 text-[#d9e0e5]">
      <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_1fr_.9fr] lg:gap-12">
        <div>
          <div className="inline-flex items-center rounded-sm bg-white px-4 py-1">
  <Brand />
</div>
          <p className="mt-5 max-w-[270px] text-[16px] leading-7 text-[#aeb9c1]">{t('footerIntro')}</p>
          <span className="text-[12px] text-roof-red">{t('freeEstimates')} · {t('spanishSpoken')}</span>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h4 className="mb-2 font-display text-xl text-white">{t('explore')}</h4>
          <Link className="text-md text-[#aeb9c1] hover:text-roof-red" to="/our-works">{t('works')}</Link>
          <Link className="text-md text-[#aeb9c1] hover:text-roof-red" to="/gallery">{t('gallery')}</Link>
          <Link className="text-md text-[#aeb9c1] hover:text-roof-red" to="/services">{t('roofingServices')}</Link>
          <Link className="text-md text-[#aeb9c1] hover:text-roof-red" to="/contact">{t('contact')}</Link>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h4 className="mb-2 font-display text-xl text-white">{t('roofingServices')}</h4>
          {[
    ['tpoTitle', 'TPO & PVC Roofing'],
    ['shingleTileTitle', 'Shingle & Tile Roofs'],
    ['metalTitle', 'Metal Roofing'],
    ['coatingsTitle', 'Roof Coatings']
  ].map(([key, fallback]) => (
    <Link
      key={key}
      className="text-md text-[#aeb9c1] hover:text-roof-red"
      to="/services"
    >
      {t(key)}
    </Link>
  ))}
        </div>

        <div className="flex flex-col items-start gap-3">
          <h4 className="mb-2 font-display text-xl text-white">{t('getInTouch')}</h4>
          <a href="tel:5595723526" className="flex items-center gap-2 text-base transition hover:text-roof-red">
            <Phone size={18} className="shrink-0" /> <span>(559) 572-3526</span>
          </a>
          <a href="tel:5594260829" className="flex items-center gap-2 text-base transition hover:text-roof-red">
            <Phone size={18} className="shrink-0" /> <span>(559) 426-0829</span>
          </a>
          <span className="text-md text-[#aeb9c1]">Parlier, CA</span>
          <Link className="mt-2 inline-flex items-center gap-2 text-md font-bold text-roof-red" to="/contact">
            {t('requestEstimate')} <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-[min(1180px,calc(100%-40px))] flex-col justify-between gap-2 border-t border-white/10 py-5 text-[13px] text-[#8d9aa4] sm:flex-row">
        <span>© {new Date().getFullYear()} Parlier Roofing Co. {t('allRights')}</span>
        <span>{t('commercialResidential')}</span>
      </div>

      <a href="tel:5595723526" className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 bg-roof-red px-4 py-3 text-md font-bold text-roof-navy shadow-xl md:hidden">
        <Phone size={18} />{t('callNow')}
      </a>
    </footer>
  )
}

export default function Layout({ children }) {
  return <><Header />{children}<Footer /></>
}
