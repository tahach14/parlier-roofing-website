
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { PageHero, CTA } from '../components/Sections'
import { useLanguage } from '../context/LanguageContext'

const serviceDetails = {
  tpoTitle: {
    image: '/tpo&pvc.jpg',
    shortDescription: 'tpoDesc',
    description: 'tpoDetail',
    suitable: 'tpoSuitable',
    benefits: 'tpoBenefits',
    process: 'tpoProcess'
  },
  torchTitle: {
    image: '/torch-down-roofing.jpg',
    shortDescription: 'torchDesc',
    description: 'torchDetail',
    suitable: 'torchSuitable',
    benefits: 'torchBenefits',
    process: 'torchProcess'
  },
  coatingsTitle: {
    image: '/roof-coatings.jpg',
    shortDescription: 'coatingsDesc',
    description: 'coatingsDetail',
    suitable: 'coatingsSuitable',
    benefits: 'coatingsBenefits',
    process: 'coatingsProcess'
  },
  shingleTitle: {
    image: '/Shingle-roofing.jpg',
    shortDescription: 'shingleDesc',
    description: 'shingleDetail',
    suitable: 'shingleSuitable',
    benefits: 'shingleBenefits',
    process: 'shingleProcess'
  },
  tileTitle: {
    image: '/Tile-roofs.jpg',
    shortDescription: 'tileDesc',
    description: 'tileDetail',
    suitable: 'tileSuitable',
    benefits: 'tileBenefits',
    process: 'tileProcess'
  },
  metalTitle: {
    image: '/Metal-roofing.jpg',
    shortDescription: 'metalDesc',
    description: 'metalDetail',
    suitable: 'metalSuitable',
    benefits: 'metalBenefits',
    process: 'metalProcess'
  },
  decksTitle: {
    image: '/roof-decks.jpg',
    shortDescription: 'decksDesc',
    description: 'decksDetail',
    suitable: 'decksSuitable',
    benefits: 'decksBenefits',
    process: 'decksProcess'
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { t } = useLanguage()

  const service = serviceDetails[slug]

  if (!service) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-roof-navy">
          Service Not Found
        </h1>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center gap-2 font-bold text-roof-red"
        >
          <ArrowLeft size={17} /> {t('backToServices')}
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHero
        eyebrow={t('pageServices')}
        title={t(slug)}
        description={t(service.shortDescription)}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.2em] text-roof-red">
                {t('serviceOverview')}
              </span>

              <h2 className="mt-3 font-display text-3xl font-bold text-roof-navy md:text-4xl">
                {t(slug)}
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                {t(service.description)}
              </p>
            </div>

            <div className="h-[300px] overflow-hidden bg-slate-100 md:h-[380px]">
              <img
                src={service.image}
                alt={t(slug)}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <div className="border border-slate-200 bg-roof-deep p-7">
              <h3 className="font-display text-2xl font-bold text-white">
                {t('suitableFor')}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/80">
                {t(service.suitable)}
              </p>
            </div>

            <div className="border border-slate-200 bg-roof-deep p-7">
              <h3 className="font-display text-2xl font-bold text-white">
                {t('serviceBenefits')}
              </h3>
              <div className="mt-4 flex items-start gap-3">
                <CheckCircle2 className="mt-1 shrink-0 text-roof-red" size={20} />
                <p className="text-sm leading-7 text-white/80">
                  {t(service.benefits)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-[#f4f5f4] p-7 md:p-10">
            <h3 className="font-display text-3xl font-bold text-roof-navy">
              {t('serviceProcess')}
            </h3>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600">
              {t(service.process)}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-bold text-roof-red"
            >
              <ArrowLeft size={17} />
              {t('backToServices')}
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-roof-red px-7 py-4 text-sm font-bold text-white transition hover:bg-[#b91f2b]"
            >
              {t('freeQuoteButton')}
              <ArrowRight size={17} />
            </Link>
          </div>

        </div>
      </section>

      <CTA />
    </>
  )
}
