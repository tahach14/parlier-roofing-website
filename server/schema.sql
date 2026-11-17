CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  email VARCHAR(255),
  zip VARCHAR(20),
  service VARCHAR(120),
  appointment_date DATE,
  appointment_time TIME,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
