import Link from 'next/link';

export default function TestSimple() {
  return (
    <div style={{padding: '50px', backgroundColor: 'lightgreen', minHeight: '100vh'}}>
      <h1 style={{fontSize: '48px', color: 'darkgreen'}}>✅ TEST RÉUSSI !</h1>
      <p style={{fontSize: '24px'}}>Si vous voyez cette page, Next.js fonctionne !</p>
      <hr />
      <p>
        <Link href="/hebergement" style={{color: 'blue', fontSize: '20px'}}>
          → Retour à la page GreenYou
        </Link>
      </p>
      <p>
        <Link href="/" style={{color: 'blue', fontSize: '20px'}}>
          → Accueil LmaaMap
        </Link>
      </p>
    </div>
  );
}
