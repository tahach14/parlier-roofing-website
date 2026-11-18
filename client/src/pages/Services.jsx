
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PageHero, SectionHeading, ServiceCards, CTA } from '../components/Sections'
import { useLanguage } from '../context/LanguageContext'

export default function Services() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero eyebrow={t('pageServices')} title={t('roofingServicesTitle')} description={t('servicesDescription')} />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeading eyebrow={t('ourServices')} title={t('rightSolution')} copy={t('servicesIntro')} />

          <ServiceCards />

          <div className="mt-10 flex flex-col items-start gap-5 bg-[#f4f5f4] p-6 md:flex-row md:items-center">
            <CheckCircle2 className="shrink-0 text-[#ff0000]" size={26} />
            <div className="flex-1">
              <b className="text-base text-roof-navy">{t('unsure')}</b>
              <p className="mt-1 text-sm text-[#6e7880]">{t('unsureDesc')}</p>
            </div>
            <Link className="inline-flex items-center gap-3 bg-roof-navy px-5 py-4 text-sm font-bold text-white" to="/contact">
              {t('askEstimate')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}
