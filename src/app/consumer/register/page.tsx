'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { COUNTRIES, POPULAR_COUNTRIES } from '@/lib/countries'

export default function ConsumerRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    country: 'MA', // Maroc par défaut
    engagement: '',
    paymentMethod: 'credits', // 'credits' ou 'onsite'
    creditAmount: 20 // Montant par défaut en euros
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Info, 2: Payment, 3: Confirmation
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [userQRCode, setUserQRCode] = useState('')

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.password) newErrors.password = 'Mot de passe requis'
    if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mots de passe différents'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePayment = async () => {
    if (formData.paymentMethod === 'credits') {
      // Redirection vers Stripe
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: formData.creditAmount,
            userEmail: formData.email,
            userName: `${formData.firstName} ${formData.lastName}`
          })
        })
        
        const { url } = await response.json()
        if (url) {
          window.location.href = url
        }
      } catch (error) {
        console.error('Erreur paiement:', error)
        alert('Erreur lors du paiement')
      }
    } else {
      // Inscription directe sans crédits
      handleSubmit()
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/consumer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          credits: formData.paymentMethod === 'credits' ? formData.creditAmount : 0
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setUserQRCode(data.qrCode)
        setSubmitted(true)
        setCurrentStep(3)
      } else {
        const errorData = await response.json()
        alert(errorData.error || 'Erreur lors de l\'inscription. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'inscription. Veuillez réessayer.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inscription réussie !</h2>
          <p className="text-gray-600 mb-6">
            Votre compte a été créé avec succès. Vous rejoignez notre réseau de lutte 
            contre la pollution plastique.
          </p>
          
          {userQRCode && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Votre QR Code Personnel</h3>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4 inline-block">
                <img src={userQRCode} alt="QR Code utilisateur" className="w-32 h-32" />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Utilisez ce QR code aux fontaines pour accéder à l'eau
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <Link
              href="/map"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Découvrir la carte
            </Link>
            <Link
              href="/consumer/login"
              className="block w-full text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Rejoindre la révolution anti-plastique</h1>
          <p className="text-gray-600 mt-2">
            Accédez aux fontaines connectées et mesurez votre impact environnemental en temps réel
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep >= 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Informations</span>
            </div>
            <div className={`mx-4 w-12 h-1 ${currentStep > 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep >= 2 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Paiement</span>
            </div>
            <div className={`mx-4 w-12 h-1 ${currentStep > 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep >= 3 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            
            {/* Step 1: Informations */}
            {currentStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                
                {/* Nom et Prénom */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Votre prénom"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Votre nom"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Mots de passe */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Minimum 6 caractères"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirmer le mot de passe *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Confirmer le mot de passe"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Téléphone et Ville */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+212 6XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre ville"
                    />
                  </div>
                </div>

                {/* Pays */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <optgroup label="Pays populaires">
                      {POPULAR_COUNTRIES.map(countryCode => {
                        const country = COUNTRIES.find(c => c.code === countryCode)
                        return country ? (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.name}
                          </option>
                        ) : null
                      })}
                    </optgroup>
                  </select>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continuer
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Mode de paiement</h2>
                
                <div className="space-y-4">
                  {/* Option Crédits */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${formData.paymentMethod === 'credits' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'credits'})}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credits"
                          checked={formData.paymentMethod === 'credits'}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        <div>
                          <h3 className="font-semibold">Acheter des crédits</h3>
                          <p className="text-gray-600 text-sm">Rechargez votre compte et payez automatiquement aux fontaines</p>
                        </div>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'credits' && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Montant des crédits (€)
                        </label>
                        <select
                          name="creditAmount"
                          value={formData.creditAmount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={10}>10€ de crédits</option>
                          <option value={20}>20€ de crédits</option>
                          <option value={50}>50€ de crédits</option>
                          <option value={100}>100€ de crédits</option>
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                          Les crédits servent à payer l'accès aux fontaines (généralement 0,10€ à 0,50€ par utilisation)
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Option Sur place */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${formData.paymentMethod === 'onsite' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'onsite'})}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="onsite"
                        checked={formData.paymentMethod === 'onsite'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div>
                        <h3 className="font-semibold">Payer sur place</h3>
                        <p className="text-gray-600 text-sm">Payez directement à chaque fontaine (carte bancaire, espèces ou mobile)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6">
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Traitement...' : 
                     formData.paymentMethod === 'credits' ? `Payer ${formData.creditAmount}€` : 'Finaliser l\'inscription'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
