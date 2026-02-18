-- Create orders table for storing intake submissions and payment status
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  intake_data JSONB NOT NULL,
  output_format TEXT NOT NULL DEFAULT 'personal_letter',
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for looking up orders by stripe session
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);

-- Index for looking up orders by email
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
