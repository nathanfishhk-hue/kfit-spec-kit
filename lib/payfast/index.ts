const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID!
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY!
const PAYFAST_URL = process.env.NODE_ENV === 'production' 
  ? 'https://www.payfast.co.za/eng/process' 
  : 'https://sandbox.payfast.co.za/eng/process'

interface PayFastPaymentData {
  email: string
  amount: number
  item_name: string
  item_description?: string
  return_url: string
  cancel_url: string
  notify_url: string
  user_id?: string
  membership_type?: string
}

export function generatePayFastFormData(data: PayFastPaymentData): Record<string, string> {
  const paymentId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  const formData: Record<string, string> = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: data.return_url,
    cancel_url: data.cancel_url,
    notify_url: data.notify_url,
    email_address: data.email,
    amount: data.amount.toFixed(2),
    item_name: data.item_name,
    item_description: data.item_description || 'KFIT Membership Payment',
    m_payment_id: paymentId,
    passphrase: process.env.PAYFAST_PASSPHRASE || '',
  }

  if (data.user_id) formData.user_id = data.user_id
  if (data.membership_type) formData.membership_type = data.membership_type

  formData.signature = generateSignature(formData)
  
  return formData
}

function generateSignature(data: Record<string, string>): string {
  const passphrase = process.env.PAYFAST_PASSPHRASE || ''
  const signatureString = Object.entries(data)
    .filter(([_, v]) => v !== '')
    .map(([k, v]) => `${k}=${v}`)
    .join('&') + `&passphrase=${passphrase}`
  
  return btoa(signatureString)
}

export async function verifyPayFastItn(payload: Record<string, string>): Promise<boolean> {
  const { signature, ...data } = payload
  
  const expectedSignature = generateSignature(data)
  if (signature !== expectedSignature) return false
  
  return data.payment_status === 'COMPLETE'
}