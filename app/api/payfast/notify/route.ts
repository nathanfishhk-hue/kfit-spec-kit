import { NextRequest, NextResponse } from 'next/server'
import { verifyPayFastItn } from '@/lib/payfast'
import { supabase } from '@/lib/supabase/client'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const payload: Record<string, string> = {}
  
  formData.forEach((value, key) => {
    payload[key] = value.toString()
  })

  const isValid = await verifyPayFastItn(payload)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid ITN' }, { status: 400 })
  }

  const { m_payment_id, pf_payment_id, amount_gross, user_id, membership_type } = payload

  if (user_id && membership_type) {
    const duration = getDurationFromMembership(membership_type)
    const startDate = new Date().toISOString()
    const endDate = new Date(Date.now() + duration).toISOString()

    await supabase.from('payments').insert({
      user_id,
      amount: parseFloat(amount_gross),
      payment_method: 'payfast',
      status: 'completed',
      payfast_payment_id: pf_payment_id,
    })

    await supabase.from('users').update({
      membership_type,
      membership_start: startDate,
      membership_end: endDate,
    }).eq('id', user_id)
  }

  return NextResponse.json({ received: true })
}

function getDurationFromMembership(type: string): number {
  switch (type) {
    case 'month_to_month': return 30 * 24 * 60 * 60 * 1000
    case '3_month': return 90 * 24 * 60 * 60 * 1000
    case '6_month': return 180 * 24 * 60 * 60 * 1000
    case '12_month': return 365 * 24 * 60 * 60 * 1000
    default: return 30 * 24 * 60 * 60 * 1000
  }
}