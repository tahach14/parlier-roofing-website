
import React, { useState, useEffect  } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const field = 'w-full rounded-none border border-[#dfe4e8] bg-[#fbfcfd] px-3 py-3 text-sm text-[#1d2932] outline-none transition placeholder:text-slate-400 focus:border-[#ff0000] focus:ring-2 focus:ring-[#ff7f7f]/10'
const label = 'flex flex-col gap-1.5 text-[13px] font-bold text-[#424c54]'

export default function QuoteForm({ compact = false }) {
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)
  const { t, language } = useLanguage()

  useEffect(() => {
  if (status === 'success') {
    const timer = setTimeout(() => {
      setStatus('')
    }, 5000)

    return () => clearTimeout(timer)
  }
}, [status])

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setStatus('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const r = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!r.ok) throw new Error('Request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className={compact ? 'space-y-3' : 'space-y-4'} onSubmit={submit}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className={label}>
          {t('fullName')}
          <input className={field} name="name" placeholder={t('yourName')} required minLength="2" />
        </label>

        <label className={label}>
          {t('phoneNumber')}
          <input className={field} name="phone" type="tel" placeholder="(559) 000-0000" required />
        </label>

        <label className={label}>
          {t('emailAddress')}
          <input className={field} name="email" type="email" placeholder="you@example.com" />
        </label>

        <label className={label}>
          {t('zipCode')}
          <input className={field} name="zip" placeholder={t('zipPlaceholder')} inputMode="numeric" />
        </label>

        <label className={`${label} sm:col-span-2`}>
          {t('helpWith')}
          <select className={field} name="service" defaultValue="">
            <option value="" disabled>{t('selectService')}</option>
            <option value="Roof inspection / estimate">{t('inspection')}</option>
            <option value="TPO & PVC roofing">{t('tpo')}</option>
            <option value="Coating">{t('coating')}</option>
            <option value="Shingles">{t('shingles')}</option>
            <option value="Tile Roofs">{t('tile')}</option>
            <option value="Torch Down">{t('torch')}</option>
            <option value="Decks">{t('decks')}</option>
            <option value="Metal Roofs">{t('metal')}</option>
            <option value="Other roofing project">{t('other')}</option>
          </select>
        </label>

        <label className={label}>
          {t('appointmentDate')}
          <input className={field} name="appointmentDate" type="date" />
        </label>

        <label className={label}>
          {t('preferredTime')}
          <input className={field} name="appointmentTime" type="time" />
        </label>

        <label className={`${label} sm:col-span-2`}>
          {t('projectDetails')}
          <textarea className={field} name="message" rows="3" placeholder={t('projectPlaceholder')} />
        </label>
      </div>

      <button className="inline-flex w-full items-center justify-center gap-3 bg-roof-red px-5 py-4 text-sm font-bold text-roof-navy transition hover:-translate-y-0.5 hover:bg-[#ff0000]/80 disabled:opacity-60" disabled={busy}>
        {busy ? t('sending') : <span className="font-extrabold">{t('submitEstimate')}</span>}
        <ArrowRight size={17} />
      </button>

      <p className="m-0 text-center text-[12px] text-[#7b858d]">{t('privacy')}</p>

      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 size={17} />{t('success')}
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-700">{t('error')}</p>
      )}
    </form>
  )
}
