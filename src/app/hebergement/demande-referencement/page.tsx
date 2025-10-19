"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function DemandeReferencementPage() {
  const [form, setForm] = useState({
    nom: "",
    type: "Hôtel",
    localisation: "",
    contact: "",
    description: "",
    actions: "",
    questionnaire: {
      ecoLabel: "",
      triSelectif: "",
      energieRenouvelable: "",
      engagementLocal: ""
    },
    preuves: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name in form.questionnaire) {
      setForm({ ...form, questionnaire: { ...form.questionnaire, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/referencement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({
          nom: "",
          type: "Hôtel",
          localisation: "",
          contact: "",
          description: "",
          actions: "",
          questionnaire: {
            ecoLabel: "",
            triSelectif: "",
            energieRenouvelable: "",
            engagementLocal: ""
          },
          preuves: ""
        });
      }
    } catch (err) {
      alert("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-4">Demande envoyée avec succès ! 🇲🇦</h1>
            <p className="text-gray-600 mb-6">
              Votre demande de référencement GreenYou Maroc a été transmise à notre équipe. 
              Nous l'examinerons dans les plus brefs délais et vous contacterons pour vous informer de la validation. Bienvenue dans le réseau marocain du tourisme durable !
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/hebergement"
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Retour à l'accueil GreenYou
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium"
              >
                Nouvelle demande
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <Link href="/hebergement" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour à GreenYou
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Demande de référencement GreenYou Maroc</h1>
          <p className="text-gray-600 mb-8">
            Inscrivez votre établissement éco-responsable au Maroc sur GreenYou : <strong>hébergement</strong>, <strong>restaurant</strong>, <strong>lieu touristique</strong> ou <strong>espace bien-être</strong>. 
            Rejoignez le premier réseau marocain d'établissements durables et bénéficiez d'une visibilité auprès des voyageurs éco-responsables.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations générales */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Informations générales</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="nom">
                    Nom de l'établissement *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="type">
                    Type d'établissement *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <optgroup label="🏨 Hébergements">
                      <option value="Hôtel">Hôtel</option>
                      <option value="Gîte">Gîte</option>
                      <option value="Chambre d'hôtes">Chambre d'hôtes</option>
                      <option value="Maison d'hôtes">Maison d'hôtes</option>
                      <option value="Camping écologique">Camping écologique</option>
                      <option value="Auberge">Auberge</option>
                      <option value="Refuge de montagne">Refuge de montagne</option>
                    </optgroup>
                    <optgroup label="🍽️ Restauration">
                      <option value="Restaurant bio">Restaurant bio</option>
                      <option value="Restaurant locavore">Restaurant locavore</option>
                      <option value="Restaurant végétarien">Restaurant végétarien</option>
                      <option value="Restaurant vegan">Restaurant vegan</option>
                      <option value="Café responsable">Café responsable</option>
                      <option value="Bar éco-responsable">Bar éco-responsable</option>
                      <option value="Food truck bio">Food truck bio</option>
                      <option value="Traiteur bio">Traiteur bio</option>
                    </optgroup>
                    <optgroup label="🏛️ Lieux Touristiques">
                      <option value="Musée">Musée</option>
                      <option value="Parc naturel">Parc naturel</option>
                      <option value="Site historique">Site historique</option>
                      <option value="Jardin botanique">Jardin botanique</option>
                      <option value="Centre d'interprétation">Centre d'interprétation</option>
                      <option value="Ferme pédagogique">Ferme pédagogique</option>
                      <option value="Écomusée">Écomusée</option>
                    </optgroup>
                    <optgroup label="🧘 Bien-être & Sport">
                      <option value="Centre de yoga">Centre de yoga</option>
                      <option value="Studio de pilates">Studio de pilates</option>
                      <option value="Spa écologique">Spa écologique</option>
                      <option value="Salle de sport éco-responsable">Salle de sport éco-responsable</option>
                      <option value="Centre de méditation">Centre de méditation</option>
                      <option value="Retraite bien-être">Retraite bien-être</option>
                      <option value="Centre de thalassothérapie">Centre de thalassothérapie</option>
                    </optgroup>
                    <optgroup label="🌱 Autre">
                      <option value="Autre">Autre</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="localisation">
                  Localisation (Adresse complète au Maroc) *
                </label>
                <input
                  type="text"
                  id="localisation"
                  name="localisation"
                  value={form.localisation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Ex: 12 Boulevard Mohammed V, Casablanca"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="contact">
                  Contact (Email ou Téléphone) *
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="contact@exemple.ma ou +212 5 22 12 34 56"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="description">
                  Description de votre établissement *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="Présentez votre établissement, son histoire, ses valeurs..."
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="actions">
                  Actions durables et éco-responsables
                </label>
                <textarea
                  id="actions"
                  name="actions"
                  value={form.actions}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Décrivez vos initiatives écologiques : produits locaux, économie d'énergie, gestion des déchets..."
                />
              </div>
            </section>

            {/* Questionnaire éco-responsable */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Questionnaire éco-responsable</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="ecoLabel">
                    Avez-vous un label écologique ?
                  </label>
                  <input
                    type="text"
                    id="ecoLabel"
                    name="ecoLabel"
                    value={form.questionnaire.ecoLabel}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex : Clef Verte, Écolabel Européen, Green Globe..."
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="triSelectif">
                    Pratiquez-vous le tri sélectif ?
                  </label>
                  <select
                    id="triSelectif"
                    name="triSelectif"
                    value={form.questionnaire.triSelectif}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                    <option value="En cours de mise en place">En cours de mise en place</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="energieRenouvelable">
                    Utilisez-vous des énergies renouvelables ?
                  </label>
                  <select
                    id="energieRenouvelable"
                    name="energieRenouvelable"
                    value={form.questionnaire.energieRenouvelable}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="Oui">Oui (panneaux solaires, éolien, etc.)</option>
                    <option value="Partiellement">Partiellement</option>
                    <option value="Non">Non</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2" htmlFor="engagementLocal">
                    Actions pour l'engagement local
                  </label>
                  <input
                    type="text"
                    id="engagementLocal"
                    name="engagementLocal"
                    value={form.questionnaire.engagementLocal}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ex : partenariats avec producteurs locaux, événements communautaires..."
                  />
                </div>
              </div>
            </section>

            {/* Preuves */}
            <section className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Documents et preuves</h2>
              <div>
                <label className="block font-semibold text-gray-700 mb-2" htmlFor="preuves">
                  Liens vers vos documents ou certifications
                </label>
                <input
                  type="text"
                  id="preuves"
                  name="preuves"
                  value={form.preuves}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Lien vers votre site web, documents PDF, photos..."
                />
                <p className="text-sm text-gray-500 mt-2">
                  Vous pouvez partager un lien vers un dossier en ligne (Google Drive, Dropbox...) contenant vos certifications, photos, etc.
                </p>
              </div>
            </section>

            {/* Note et validation */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>Note importante :</strong> Votre demande sera examinée par notre équipe dans un délai de 2 à 5 jours ouvrés. 
                Nous pourrons vous contacter pour obtenir des informations complémentaires avant validation.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Envoi en cours..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer ma demande de référencement
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
