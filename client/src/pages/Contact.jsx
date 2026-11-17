
import React from 'react'
import { PageHero } from '../components/Sections'
import QuoteForm from '../components/QuoteForm'
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function ContactMethod({ Icon, label, value, href }) {
  const inner = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-white text-[#ff0000]"><Icon size={19} /></span>
      <span className="flex flex-col gap-1">
        <small className="text-[12px] font-bold tracking-[.16em] text-[#818b93]">{label}</small>
        <b className="text-base text-[#1a2833]">{value}</b>
      </span>
    </>
  )
  return href
    ? <a className="my-6 flex items-center gap-4" href={href}>{inner}</a>
    : <div className="my-6 flex items-center gap-4">{inner}</div>
}

export default function Contact() {
  const { t } = useLanguage()

  return (
    <>
      <PageHero eyebrow={t('pageContact')} title={t('talkRoof')} description={t('contactDescription')} />

      <section className="bg-[#f7f8f8] py-16 md:py-24">
        <div className="mx-auto grid w-[min(1180px,calc(100%-40px))] items-start gap-10 lg:grid-cols-[.8fr_1.1fr] lg:gap-20">
          <div>
            <span className="text-[13px] font-bold tracking-[.22em] text-[#ff0000]">{t('getInTouchLabel')}</span>
            <h2 className="mt-3 max-w-lg font-display text-4xl font-bold leading-none text-roof-navy md:text-5xl">{t('readyToHear')}</h2>
            <p className="mt-4 text-base leading-7 text-[#68737c]">{t('contactInstructions')}</p>

            <ContactMethod Icon={Phone} label={t('callUs')} value="(559) 572-3526" href="tel:5595723526" />
            <ContactMethod Icon={Phone} label={t('alternatePhone')} value="(559) 426-0829" href="tel:5594260829" />
            <ContactMethod Icon={MapPin} label={t('location')} value={t('parlier')} />
            <ContactMethod Icon={MessageCircle} label={t('language')} value={t('spanishSpoken')} />

            <div className="mt-7 flex items-center gap-3 border-t border-[#e5e8eb] pt-5 text-[13px] leading-6 text-[#6d7880]">
              <Clock className="shrink-0 text-[#ff0000]" />
              <span>{t('followUp')}</span>
            </div>
          </div>

          <div className="bg-white p-6 shadow-[0_10px_35px_rgba(22,38,52,.06)] md:p-9">
            <span className="text-[13px] font-bold tracking-[.22em] text-[#ff0000]">{t('freeEstimate')}</span>
            <h3 className="mt-2 font-display text-3xl font-bold text-roof-navy">{t('tellProject')}</h3>
            <p className="mb-6 mt-2 text-sm text-[#77818a]">{t('formIntro')}</p>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  )
}
