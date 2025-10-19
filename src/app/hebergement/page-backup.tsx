"use client";

import Link from "next/link";

export default function HebergementPage() {
  return (
    <div style={{padding: '40px', backgroundColor: '#f0fdf4', minHeight: '100vh'}}>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{fontSize: '48px', color: '#166534', marginBottom: '20px'}}>
            🌿 GreenYou
          </h1>
          <p style={{fontSize: '20px', color: '#15803d', marginBottom: '30px'}}>
            Le réseau des établissements éco-responsables
          </p>
          
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link 
              href="/hebergement/demande-referencement"
              style={{
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              ✓ Je demande mon référencement
            </Link>
            
            <Link 
              href="/hebergement/ameliorer-empreinte"
              style={{
                backgroundColor: '#15803d',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              ✨ J&apos;améliore mon empreinte
            </Link>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{fontSize: '32px', color: '#166534', marginBottom: '20px'}}>
            Pourquoi GreenYou ?
          </h2>
          <p style={{fontSize: '18px', color: '#374151', lineHeight: '1.6'}}>
            Rejoignez une communauté d&apos;hébergements et de restaurants engagés pour un tourisme durable. 
            Valorisez vos actions écologiques et attirez des voyageurs responsables.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '36px', marginBottom: '10px'}}>📍</div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#16a34a'}}>500+</div>
            <div style={{fontSize: '14px', color: '#6b7280'}}>Établissements</div>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '36px', marginBottom: '10px'}}>👥</div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#16a34a'}}>50k+</div>
            <div style={{fontSize: '14px', color: '#6b7280'}}>Voyageurs</div>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '36px', marginBottom: '10px'}}>📈</div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#16a34a'}}>30%</div>
            <div style={{fontSize: '14px', color: '#6b7280'}}>Économie d&apos;énergie</div>
          </div>
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center'}}>
            <div style={{fontSize: '36px', marginBottom: '10px'}}>💚</div>
            <div style={{fontSize: '28px', fontWeight: 'bold', color: '#16a34a'}}>95%</div>
            <div style={{fontSize: '14px', color: '#6b7280'}}>Satisfaction</div>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '40px'}}>
          <Link 
            href="/"
            style={{
              color: '#16a34a',
              textDecoration: 'underline',
              fontSize: '16px'
            }}
          >
            ← Retour à l&apos;accueil LmaaMap
          </Link>
        </div>
      </div>
    </div>
  );
}
