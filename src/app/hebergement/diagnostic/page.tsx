"use client";

export default function DiagnosticPage() {
  return (
    <div style={{padding: '40px', backgroundColor: '#e6ffe6'}}>
      <h1 style={{color: '#006600'}}>✅ Test de Diagnostic GreenYou</h1>
      <p style={{fontSize: '18px'}}>Si vous voyez cette page, votre serveur Next.js fonctionne correctement!</p>
      <hr />
      <h2>Informations:</h2>
      <ul>
        <li>Route: /hebergement/diagnostic</li>
        <li>Date: {new Date().toLocaleString('fr-FR')}</li>
        <li>Statut: Page chargée avec succès</li>
      </ul>
      <hr />
      <p><a href="/hebergement" style={{color: 'blue', textDecoration: 'underline'}}>← Retour à la page GreenYou principale</a></p>
      <p><a href="/" style={{color: 'blue', textDecoration: 'underline'}}>← Retour à l'accueil LmaaMap</a></p>
    </div>
  );
}
