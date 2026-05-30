'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CreditCard, Check } from 'lucide-react'
import { useState } from 'react'

const membershipPlans = [
  {
    id: 'month_to_month',
    name: 'MONTH TO MONTH',
    price: 799,
    period: '/month',
    description: 'No long-term commitment, renew anytime',
  },
  {
    id: '3_month',
    name: '3 MONTH CONTRACT',
    price: 699,
    period: '/month',
    originalPrice: 799,
    description: 'Save R100/month with debit order',
  },
  {
    id: '6_month',
    name: '6 MONTH CONTRACT',
    price: 599,
    period: '/month',
    originalPrice: 799,
    description: 'Save R200/month - most popular',
  },
  {
    id: '12_month',
    name: '12 MONTH CONTRACT',
    price: 499,
    period: '/month',
    originalPrice: 799,
    description: 'Best value! Save R300/month',
  },
]

export default function MembershipsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelectPlan = (planId: string) => {
    const plan = membershipPlans.find((p) => p.id === planId)
    if (plan) {
      const formData = {
        merchant_id: process.env.PAYFAST_MERCHANT_ID || 'placeholder',
        merchant_key: process.env.PAYFAST_MERCHANT_KEY || 'placeholder',
        return_url: `${window.location.origin}/dashboard?payment=success`,
        cancel_url: `${window.location.origin}/memberships?cancelled=true`,
        notify_url: `${window.location.origin}/api/payfast/notify`,
        email_address: 'user@example.com',
        amount: plan.price,
        item_name: `KFIT ${plan.name} Membership`,
        m_payment_id: `${Date.now()}-${planId}`,
      }

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://www.payfast.co.za/eng/process'
      Object.entries(formData).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
      })
      document.body.appendChild(form)
      form.submit()
    }
  }

  return (
    <div className="min-h-screen bg-black pt-32">
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.kfit.co.za/wp-content/uploads/2026/04/Stretching-section-768x422.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-9xl font-black text-white text-center"
          >
            MEMBERSHIP <span className="text-orange-500">PLANS</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-40 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-b from-zinc-900 to-black border-2 border-orange-700/30 rounded-3xl p-8 flex flex-col"
              >
                {plan.originalPrice && (
                  <div className="absolute -top-4 right-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-black text-sm">
                    SAVE R{plan.originalPrice - plan.price}/MONTH
                  </div>
                )}

                <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 mb-8">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-6xl font-black text-orange-500">R{plan.price}</span>
                  <span className="text-white/60">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {[
                    'Full gym access',
                    'Group classes included',
                    plan.id === '6_month' || plan.id === '12_month' ? 'Personal trainer sessions' : null,
                    plan.id === '12_month' ? 'Free fitness assessment' : null,
                  ]
                    .filter(Boolean)
                    .map((feature) => (
                      <li key={feature} className="flex items-center text-white">
                        <Check className="w-5 h-5 text-orange-500 mr-3" />
                        {feature}
                      </li>
                    ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-black rounded-full text-lg"
                >
                  SELECT PLAN
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-orange-950 to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            PAYMENT <span className="text-orange-500">INFORMATION</span>
          </h2>
          <p className="text-white/70 mb-12">
            All payments processed securely through PayFast. Join instantly online or visit our
            premises for in-person registration.
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <p className="text-white font-bold">Credit/Debit Cards</p>
                </div>
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <p className="text-white font-bold">Instant Activation</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}