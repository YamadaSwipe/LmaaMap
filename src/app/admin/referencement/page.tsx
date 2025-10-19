"use client";

import { useEffect, useState } from "react";

export default function ReferencementAdminPage() {
  const [demandes, setDemandes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    type: "Hébergement",
    localisation: "",
    contact: "",
    description: "",
    actions: "",
    ecoLabel: "",
    triSelectif: "",
    energieRenouvelable: "",
    engagementLocal: "",
    preuves: ""
  });

  async function fetchDemandes() {
    setLoading(true);
    try {
      const res = await fetch("/api/referencement");
      if (res.ok) {
        const data = await res.json();
        setDemandes(data);
      }
    } catch (err) {}
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/referencement/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchDemandes();
  }

  async function handleAdminCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/referencement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "VALIDE", questionnaire: {
          ecoLabel: form.ecoLabel,
          triSelectif: form.triSelectif,
          energieRenouvelable: form.energieRenouvelable,
          engagementLocal: form.engagementLocal
        } }),
      });
      setForm({
        nom: "",
        type: "Hébergement",
        localisation: "",
        contact: "",
        description: "",
        actions: "",
        ecoLabel: "",
        triSelectif: "",
        energieRenouvelable: "",
        engagementLocal: "",
        preuves: ""
      });
      setShowForm(false);
      fetchDemandes();
    } catch (err) {
      alert("Erreur lors de la création");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Demandes de référencement</h1>
      <button className="bg-green-700 text-white px-4 py-2 rounded mb-6" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Annuler" : "Créer une demande (admin)"}
      </button>
      {showForm && (
        <form className="bg-green-50 border border-green-200 rounded p-4 mb-6 max-w-xl" onSubmit={handleAdminCreate}>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="nom">Nom de l'établissement</label>
            <input type="text" id="nom" name="nom" value={form.nom} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="type">Type</label>
            <select id="type" name="type" value={form.type} onChange={handleChange} className="w-full border rounded px-2 py-1">
              <option value="Hébergement">Hébergement</option>
              <option value="Restauration">Restauration</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="localisation">Localisation</label>
            <input type="text" id="localisation" name="localisation" value={form.localisation} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="contact">Contact</label>
            <input type="text" id="contact" name="contact" value={form.contact} onChange={handleChange} className="w-full border rounded px-2 py-1" required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="description">Description</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-2 py-1" rows={2} required />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="actions">Actions durables / éco-responsables</label>
            <textarea id="actions" name="actions" value={form.actions} onChange={handleChange} className="w-full border rounded px-2 py-1" rows={2} />
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="ecoLabel">Label écologique</label>
            <input type="text" id="ecoLabel" name="ecoLabel" value={form.ecoLabel} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="triSelectif">Tri sélectif</label>
            <select id="triSelectif" name="triSelectif" value={form.triSelectif} onChange={handleChange} className="w-full border rounded px-2 py-1">
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="energieRenouvelable">Énergies renouvelables</label>
            <select id="energieRenouvelable" name="energieRenouvelable" value={form.energieRenouvelable} onChange={handleChange} className="w-full border rounded px-2 py-1">
              <option value="">Sélectionner</option>
              <option value="Oui">Oui</option>
              <option value="Non">Non</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1" htmlFor="engagementLocal">Engagement local</label>
            <input type="text" id="engagementLocal" name="engagementLocal" value={form.engagementLocal} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1" htmlFor="preuves">Preuves (liens, fichiers, etc.)</label>
            <input type="text" id="preuves" name="preuves" value={form.preuves} onChange={handleChange} className="w-full border rounded px-2 py-1" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded font-bold mt-2">Créer et valider</button>
        </form>
      )}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="space-y-4">
          {demandes.map((d) => (
            <li key={d.id} className="border rounded p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-green-700">{d.nom}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${d.status === "VALIDE" ? "bg-green-200 text-green-800" : d.status === "REFUSE" ? "bg-red-200 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>{d.status}</span>
              </div>
              <div className="text-sm mb-2">{d.type} | {d.localisation} | {d.contact}</div>
              <div className="text-xs text-gray-600 mb-2">{d.description}</div>
              <div className="mb-2">
                <span className="font-semibold">Actions durables :</span> {d.actions}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Questionnaire :</span> Label : {d.ecoLabel}, Tri : {d.triSelectif}, Énergie : {d.energieRenouvelable}, Engagement local : {d.engagementLocal}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Preuves :</span> {d.preuves}
              </div>
              {d.status === "EN_ATTENTE" && (
                <div className="flex gap-2 mt-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(d.id, "VALIDE")}>Valider</button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(d.id, "REFUSE")}>Refuser</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
