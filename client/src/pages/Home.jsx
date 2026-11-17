
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, MapPin, ChevronDown, Phone,
  ShieldCheck, CheckCircle2
} from 'lucide-react'
import QuoteForm from '../components/QuoteForm'
import { CTA, SectionHeading, ServiceCards, TrustStrip } from '../components/Sections'
import { useLanguage } from '../context/LanguageContext'

const heroImage = '/hero-image.jpg'

export default function Home() {
  const { t } = useLanguage()

  const [openFaq, setOpenFaq] = useState(0)

const faqs = [
  ['faqQ1', 'faqA1'],
  ['faqQ2', 'faqA2'],
  ['faqQ3', 'faqA3'],
  ['faqQ4', 'faqA4'],
  ['faqQ5', 'faqA5'],
  ['faqQ6', 'faqA6'],
  ['faqQ7', 'faqA7']
]

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#111e2a] text-white">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay muted loop playsInline poster={heroImage}
          >
            <source src="/roofing-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,18,27,.75)_0%,rgba(8,18,27,.65)_42%,rgba(8,18,27,.35)_100%)]" />
        </div>

        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-center gap-12 py-16 md:grid-cols-[1.12fr_.78fr] md:gap-16 md:py-20 lg:gap-20">
          <div className="max-w-[650px]">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-bold tracking-[.22em] text-[#ff0000]">
              <i className="h-0.5 w-6 bg-roof-gold" />
              PARLIER, CALIFORNIA · {t('roofingServicesTitle').toUpperCase()}
            </span>

            <h1 className="mt-6 font-display text-[clamp(58px,8vw,100px)] font-extrabold leading-[.9] tracking-wide">
              {t('heroBuilt')}<br />
              <em className="not-italic text-roof-red">{t('heroProtect')}</em>
            </h1>

            <p className="mt-7 max-w-[520px] text-base leading-7 text-[#d1d8de] md:text-xl">
              {t('heroDescription')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link className="inline-flex items-center gap-3 bg-roof-gold px-6 py-4 text-sm font-bold text-roof-navy transition hover:-translate-y-0.5 hover:bg-[#e3b968]" to="/contact">
                {t('requestQuote')} <ArrowUpRight size={17} />
              </Link>

              <a className="inline-flex items-center gap-3 text-sm font-bold text-white" href="tel:5595723526">
                <Phone className="text-roof-red" size={20} />
                <span className="flex flex-col gap-1">
                  <small className="text-[12px] font-semibold tracking-[.15em] text-[#aeb9c2]">{t('callTeam')}</small>
                  (559) 572-3526
                </span>
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#cbd3d9]">
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-roof-red" />{t('freeEstimates')}</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-roof-red" />{t('commercialResidential')}</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-roof-red" />{t('spanishSpoken')}</span>
            </div>
          </div>

          <div className="bg-white p-6 text-[#18232d] shadow-2xl md:p-7">
            <div className="mb-5 border-b border-[#e5e8eb] pb-5">
              <span className="text-[11px] font-bold tracking-[.2em] text-[#ff0000]">{t('startProject')}</span>
              <h2 className="mt-2 font-display text-3xl font-bold leading-none">{t('estimateTitle')}</h2>
              <p className="mt-2 text-[13px] text-[#66717a]">{t('estimateIntro')}</p>
            </div>
            <QuoteForm compact />
          </div>
        </div>

        <div className="border-t border-white/15 bg-[#0c1721]/80">
          <div className="mx-auto flex min-h-12 w-[min(1180px,calc(100%-40px))] items-center justify-between gap-3 text-[11px] font-bold tracking-[.14em] text-[#c5cdd3]">
            <span>{t('commercial')}</span>
            <span className="hidden sm:inline">{t('residential')}</span>
            <span>PARLIER, CA & SURROUNDING AREAS</span>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeading
            eyebrow={t('whatWeDo')}
            title={t('everyProperty')}
            copy={t('everyPropertyDesc')}
          />
          <ServiceCards limit={6} />
          <div className="mt-8 text-center">
            <Link className="inline-flex items-center gap-2 text-base font-bold text-[#ff0000]" to="/services">
              {t('viewServices')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid bg-[#151B54] md:grid-cols-2">
        <div
          className="min-h-[300px] bg-cover bg-center md:min-h-[500px]"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        <div className="self-center px-6 py-14 md:px-12 lg:px-20">
          <span className="text-[13px] font-bold tracking-[.22em] text-[#ff0000]">{t('localSupport')}</span>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-bold leading-none text-white md:text-[52px]">
            {t('clearPlan')}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#ffffff]/70">{t('clearPlanDesc')}</p>

          <ul className="my-6 space-y-3 text-sm text-[#ffffff]/80">
            <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-[#ff0000]" />{t('residentialCommercialOptions')}</li>
            <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-[#ff0000]" />{t('multipleSystems')}</li>
            <li className="flex items-center gap-3"><ShieldCheck size={16} className="text-[#ff0000]" />{t('freeEstimateStart')}</li>
          </ul>

          <Link className="inline-flex items-center gap-2 text-base font-bold text-[#ff0000]" to="/our-works">
            {t('learnApproach')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="bg-[#fafafa] py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeading
            eyebrow={t('ourWork')}
            title={t('closerLook')}
            copy={t('closerLookDesc')}
          />

          <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_1fr] md:grid-rows-[260px]">
            <div className="group relative min-h-[220px] overflow-hidden">
              <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={heroImage} alt="Residential property" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-[10px] font-bold tracking-widest text-white">{t('residential')}</span>
            </div>

            <div className="group relative min-h-[180px] overflow-hidden">
              <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src="/flat-roof.jpg" alt="Commercial building" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-[10px] font-bold tracking-widest text-white">{t('flatSystems')}</span>
            </div>

            <div className="group relative min-h-[180px] overflow-hidden">
              <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src="/home-improvement.jpg" alt="Property exterior" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-16 text-[10px] font-bold tracking-widest text-white">{t('improvements')}</span>
            </div>
          </div>

          <div className="mt-7 text-center">
            <Link className="inline-flex items-center gap-2 text-base font-bold text-[#ff0000]" to="/gallery">
              {t('exploreGallery')} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <div className="mb-8 text-center">
            <span className="text-[14px] font-bold tracking-[.22em] text-[#ff0000]">{t('serviceArea')}</span>
            <h2 className="mt-3 font-display text-4xl font-bold text-roof-navy md:text-5xl">{t('proudlyServing')}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-7 text-[#68737c]">{t('mapDescription')}</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 shadow-lg">
            <iframe
              title="Parlier Roofing Co. Location - Parlier California"
              src="https://www.google.com/maps?q=Parlier%2C%20California&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-roof-navy">
            <MapPin size={18} className="text-[#ff0000]" />
            Parlier, California
          </div>
        </div>
      </section>


<section className="bg-[#f3f4f3] py-16 md:py-24">
  <div className="mx-auto w-[min(900px,calc(100%-40px))]">
    <div className="mb-10 text-center">
      <span className="text-[13px] font-bold tracking-[.22em] text-[#ff0000]">
        {t('faqEyebrow')}
      </span>

      <h2 className="mt-3 font-display text-4xl font-bold text-roof-navy md:text-5xl">
        {t('faqTitle')}
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#68737c]">
        {t('faqDescription')}
      </p>
    </div>

    <div className="space-y-3">
      {faqs.map(([question, answer], index) => (
        <div
          key={question}
          className="overflow-hidden border border-slate-200 bg-white"
        >
          <button
            type="button"
            onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-7"
          >
            <span className="text-base font-bold text-roof-navy md:text-lg">
              {t(question)}
            </span>

            <ChevronDown
              size={21}
              className={`shrink-0 text-[#ff0000] transition-transform duration-300 ${
                openFaq === index ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ${
              openFaq === index
                ? 'grid-rows-[1fr]'
                : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-7 text-[#68737c] md:px-7">
                {t(answer)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      <CTA />
    </>
  )
}
