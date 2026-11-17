
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import pg from 'pg'
import { Resend } from 'resend'

const { Pool } = pg
const app = express()

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}))

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
}))

app.use(express.json({ limit: '30kb' }))

// PostgreSQL connection
const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined
    })
  : null

// Resend connection
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

// Escape user-provided content before adding it to HTML
function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[char])
}

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    if (pool) await pool.query('SELECT 1')

    res.json({
      ok: true,
      database: pool ? 'connected' : 'not_configured',
      email: resend ? 'configured' : 'not_configured'
    })
  } catch {
    res.status(503).json({
      ok: false,
      database: 'unavailable'
    })
  }
})

// Submit lead
app.post('/api/leads', async (req, res) => {
  const {
    name,
    phone,
    email = '',
    zip = '',
    service = '',
    appointmentDate = '',
    appointmentTime = '',
    message = ''
  } = req.body || {}

  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    typeof phone !== 'string' ||
    phone.trim().length < 7
  ) {
    return res.status(400).json({
      error: 'Please provide a valid name and phone number.'
    })
  }

  if (!pool) {
    return res.status(503).json({
      error: 'Lead storage is not configured. Please call the business directly.'
    })
  }

  try {
    // 1. Save lead in PostgreSQL
    const result = await pool.query(
      `INSERT INTO leads
      (name, phone, email, zip, service, appointment_date, appointment_time, message)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING id, created_at`,
      [
        name.trim(),
        phone.trim(),
        String(email).trim(),
        String(zip).trim(),
        String(service).trim(),
        appointmentDate || null,
        appointmentTime || null,
        String(message).trim()
      ]
    )

    const lead = result.rows[0]

    // 2. Send notification email through Resend
    if (resend && process.env.LEADS_NOTIFICATION_EMAIL && process.env.RESEND_FROM_EMAIL) {
      try {
        const fields = [
          ['Name', name],
          ['Phone', phone],
          ['Email', email],
          ['ZIP Code', zip],
          ['Service', service],
          ['Appointment Date', appointmentDate],
          ['Preferred Time', appointmentTime],
          ['Project Details', message]
        ]

        const emailHtml = `
          <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#263442;">
            <div style="background:#101d2b;padding:25px;color:white;">
              <h1 style="margin:0;font-size:24px;">New Roofing Inquiry</h1>
              <p style="margin:8px 0 0;color:#d7dce2;">Parlier Roofing Co.</p>
            </div>

            <div style="padding:25px;border:1px solid #e5e7eb;">
              <p>A new quote request has been submitted through your website.</p>

              <table style="width:100%;border-collapse:collapse;">
                ${fields.map(([label, value]) => `
                  <tr>
                    <td style="padding:12px 8px;border-bottom:1px solid #eee;font-weight:bold;width:38%;">
                      ${escapeHtml(label)}
                    </td>
                    <td style="padding:12px 8px;border-bottom:1px solid #eee;">
                      ${escapeHtml(value || 'Not provided')}
                    </td>
                  </tr>
                `).join('')}
              </table>

              <p style="margin-top:22px;color:#777;font-size:12px;">
                Lead ID: ${escapeHtml(lead.id)}
              </p>
            </div>
          </div>
        `

        const emailOptions = {
          from: process.env.RESEND_FROM_EMAIL,
          to: [process.env.LEADS_NOTIFICATION_EMAIL],
          subject: `New Roofing Inquiry - ${name.trim()}`,
          html: emailHtml
        }

        // Allow replying directly to the customer's email
        if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
          emailOptions.replyTo = email.trim()
        }

        const { data, error } = await resend.emails.send(emailOptions)

        if (error) {
          console.error('Resend email failed:', error)
        } else {
          console.log('Lead notification email sent:', data?.id)
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError.message)
      }
    } else {
      console.log('Email notification skipped: Resend configuration missing.')
    }

    // 3. Return successful response
    return res.status(201).json({
      ok: true,
      lead,
      message: 'Your request has been received.'
    })

  } catch (err) {
    console.error('Lead insert failed:', err.message)

    return res.status(500).json({
      error: 'Unable to save your request right now.'
    })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Parlier Roofing API listening on ${port}`)
})
