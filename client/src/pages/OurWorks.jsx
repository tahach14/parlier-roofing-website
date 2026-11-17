
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PageHero, SectionHeading, CTA } from '../components/Sections'
import { useLanguage } from '../context/LanguageContext'

const items = [
  ['residentialRoofing', 'residentialDesc', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=85'],
  ['commercialRoofing', 'commercialDesc', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1100&q=85'],
  ['propertyDetails', 'propertyDesc', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85']
]

export default function OurWorks() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero eyebrow={t('pageWorks')} title={t('builtAround')} description={t('worksDescription')} />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-40px))]">
          <SectionHeading eyebrow={t('projectTypes')} title={t('planWork')} copy={t('worksNote')} />

          <div className="grid gap-6 md:grid-cols-3">
            {items.map(([titleKey, descKey, img], i) => (
              <article className="border border-[#e5e8eb] bg-white" key={titleKey}>
                <img className="h-56 w-full object-cover" src={img} alt={t(titleKey)} />
                <div className="p-6">
                  <span className="text-[12px] font-bold tracking-[.15em] text-[#ff0000]">0{i + 1} / {t('projectType')}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-roof-navy">{t(titleKey)}</h3>
                  <p className="mt-2 min-h-14 text-sm leading-6 text-[#707b83]">{t(descKey)}</p>
                  <Link className="mt-4 inline-flex items-center gap-2 text-[13px] font-bold text-[#ff0000]" to="/contact">
                    {t('discussProject')} <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
