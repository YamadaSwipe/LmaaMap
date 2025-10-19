export default function TestSimple() {
  return (
    <div style={{padding: '50px', backgroundColor: 'lightgreen', minHeight: '100vh'}}>
      <h1 style={{fontSize: '48px', color: 'darkgreen'}}>✅ TEST RÉUSSI !</h1>
      <p style={{fontSize: '24px'}}>Si vous voyez cette page, Next.js fonctionne !</p>
      <hr />
      <p><a href="/hebergement" style={{color: 'blue', fontSize: '20px'}}>→ Retour à la page GreenYou</a></p>
      <p><a href="/" style={{color: 'blue', fontSize: '20px'}}>→ Accueil LmaaMap</a></p>
    </div>
  );
}
