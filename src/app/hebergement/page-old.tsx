"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HebergementPage() {
  const [email, setEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setNewsletterSubmitted(false);
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-6xl animate-pulse">🌿</span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                GreenYou
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-green-50 mb-4 font-light">
              Le réseau des établissements éco-responsables
            </p>
            <p className="text-lg md:text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Rejoignez une communauté d&apos;hébergements et de restaurants engagés pour un tourisme durable. 
              Valorisez vos actions écologiques et attirez des voyageurs responsables.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/hebergement/demande-referencement"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-300 hover:scale-105 transition-all duration-300"
              >
                ✓ Je demande mon référencement →
              </Link>
              
              <Link 
                href="/hebergement/ameliorer-empreinte"
                className="bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-800 hover:scale-105 transition-all duration-300"
              >
                ✨ J&apos;améliore mon empreinte →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-4xl mb-2">📍</div>
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-sm text-green-100">Établissements</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-bold mb-1">50k+</div>
                <div className="text-sm text-green-100">Voyageurs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-3xl font-bold mb-1">30%</div>
                <div className="text-sm text-green-100">Économie d&apos;énergie</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="text-4xl mb-2">💚</div>
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm text-green-100">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pourquoi GreenYou ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La première plateforme dédiée aux établissements qui font la différence pour notre planète
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Mission</h3>
              <p className="text-gray-600 leading-relaxed">Connecter les voyageurs éco-conscients avec des établissements engagés. Ensemble, transformons le secteur du tourisme.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Engagement</h3>
              <p className="text-gray-600 leading-relaxed">Vérification rigoureuse de chaque établissement. Labels, pratiques durables et transparence garantis.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Notre Communauté</h3>
              <p className="text-gray-600 leading-relaxed">Plus de 500 établissements et 50 000 voyageurs unis par des valeurs communes de respect de l&apos;environnement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Rejoignez GreenYou en 4 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Inscrivez-vous</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Complétez notre formulaire détaillé sur vos pratiques écologiques</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Validation</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Notre équipe vérifie vos engagements et labels environnementaux</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Référencement</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Votre établissement apparaît sur notre carte interactive</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">4</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visibilité</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Attirez des voyageurs engagés qui partagent vos valeurs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les témoignages de nos partenaires
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">🌸</div>
                <div>
                  <div className="font-bold text-gray-900">Sophie Martin</div>
                  <div className="text-sm text-gray-500">Propriétaire, Éco-Gîte des Alpes</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed italic">&quot;GreenYou nous a permis d&apos;augmenter notre visibilité auprès d&apos;une clientèle qui partage nos valeurs. +40% de réservations !&quot;</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">👨‍🍳</div>
                <div>
                  <div className="font-bold text-gray-900">Jean Dupont</div>
                  <div className="text-sm text-gray-500">Gérant, Restaurant Bio de Lyon</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed italic">&quot;Une plateforme qui valorise vraiment nos efforts écologiques. Nos clients apprécient notre engagement certifié.&quot;</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">🌊</div>
                <div>
                  <div className="font-bold text-gray-900">Marie Laurent</div>
                  <div className="text-sm text-gray-500">Directrice, Hôtel Écologique Bretagne</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 leading-relaxed italic">&quot;L&apos;accompagnement GreenYou nous a aidés à améliorer nos pratiques. Un vrai partenaire pour un tourisme durable.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à rejoindre GreenYou ?
          </h2>
          <p className="text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Valorisez votre engagement écologique et développez votre activité avec une communauté qui partage vos valeurs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/hebergement/demande-referencement"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-green-300 hover:scale-105 transition-all duration-300"
            >
              ✓ Demander mon référencement →
            </Link>
            
            <Link 
              href="/hebergement/ameliorer-empreinte"
              className="bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-800 hover:scale-105 transition-all duration-300 border-2 border-white"
            >
              ✨ Améliorer mon empreinte →
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-green-400/30">
            <p className="text-green-100 mb-4">
              Vous souhaitez découvrir nos établissements ?
            </p>
            <Link 
              href="/map"
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-green-100 transition-colors"
            >
              🔍 Explorez la carte interactive →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-5xl mb-4">🌿</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Restez informé
          </h2>
          <p className="text-gray-600 mb-8">
            Recevez nos actualités, conseils et success stories
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-900"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              S&apos;inscrire
            </button>
          </form>
          
          {newsletterSubmitted && (
            <div className="mt-4 bg-green-100 border border-green-300 rounded-full px-6 py-3 inline-flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-green-700 font-semibold">Merci pour votre inscription !</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
