'use client'

import { motion } from 'framer-motion'
import { CreditCard } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useState } from 'react'
import { generatePayFastFormData } from '@/lib/payfast'

const membershipPlans = [
  {
    id: 'month_to_month',
    name: 'MONTH TO MONTH',
    price: 799,
    period: 'month',
    description: 'No long-term commitment. Renew anytime.',
    features: ['Full gym access', 'Group classes included', '24/7 secure entry'],
  },
  {
    id: '3_month',
    name: '3 MONTH CONTRACT',
    price: 699,
    period: 'month',
    originalPrice: 799,
    description: 'Save R100/month with debit order',
    features: ['Full gym access', 'Group classes included', 'Personal trainer sessions (2/month)', '24/7 secure entry'],
  },
  {
    id: '6_month',
    name: '6 MONTH CONTRACT',
    price: 599,
    period: 'month',
    originalPrice: 799,
    description: 'Save R200/month with debit order',
    features: ['Full gym access', 'Group classes included', 'Personal trainer sessions (4/month)', '24/7 secure entry', 'Supplement discount'],
  },
  {
    id: '12_month',
    name: '12 MONTH CONTRACT',
    price: 499,
    period: 'month',
    originalPrice: 799,
    description: 'Save R300/month - Best value!',
    features: ['Full gym access', 'Group classes included', 'Personal trainer sessions (8/month)', '24/7 secure entry', 'Supplement discount', 'Free fitness assessment'],
  },
]

export default function MembershipsPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePayment = async (planId: string) => {
    if (!user?.email) return

    const plan = membershipPlans.find(p => p.id === planId)
    if (!plan) return

    const formData = generatePayFastFormData({
      email: user.email,
      amount: plan.price,
      item_name: `KFIT ${plan.name} Membership`,
      return_url: `${window.location.origin}/dashboard?payment=success`,
      cancel_url: `${window.location.origin}/memberships?cancelled=true`,
      notify_url: `${window.location.origin}/api/payfast/notify`,
      user_id: user.id,
      membership_type: planId,
    })

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://www.payfast.co.za/eng/process'
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="min-h-screen bg-black pt-32 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-4">
            MEMBERSHIP <span className="text-kfit-500">PLANS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Flexible options for every lifestyle. Join the KFIT community today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -20, scale: 1.02 }}
              className="relative bg-gradient-to-br from-kfit-900/30 to-black border border-kfit-700 rounded-3xl p-8 flex flex-col"
            >
              {plan.originalPrice && (
                <div className="absolute -top-4 right-4 bg-kfit-600 text-white px-4 py-1 rounded-full font-bold">
                  SAVE R{plan.originalPrice - plan.price}/mo
                </div>
              )}

              <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>

              <div className="mb-6">
                <span className="text-5xl font-display font-bold text-kfit-500">R{plan.price}</span>
                <span className="text-gray-400">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <span className="w-2 h-2 bg-kfit-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePayment(plan.id)}
                className="w-full py-4 bg-kfit-600 text-white font-display font-bold rounded-full"
              >
                SELECT PLAN
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}