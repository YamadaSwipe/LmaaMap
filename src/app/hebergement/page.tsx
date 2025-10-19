"use client";

import Link from "next/link";

// Icônes SVG inline
const LeafIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

export default function HebergementPage() {
  return (
    <div style={{
      background: 'linear-gradient(to bottom, #f0fdf4 0%, #dcfce7 100%)',
      minHeight: '100vh'
    }}>
      {/* Navigation fixe */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 50,
        padding: '16px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logos avec bouton accueil */}
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <Link href="/" style={{
              fontSize: '18px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #2563eb, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              ← ParenteseYou
            </Link>
            <span style={{color: '#d1d5db', fontSize: '20px'}}>|</span>
            <Link href="/lmaamap" style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#2563eb',
              textDecoration: 'none'
            }}>
              LmaaMap
            </Link>
            <span style={{color: '#d1d5db', fontSize: '20px'}}>|</span>
            <Link href="/hebergement" style={{
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#15803d',
              textDecoration: 'none'
            }}>
              GreenYou
            </Link>
          </div>

          {/* Navigation links */}
          <div style={{display: 'flex', alignItems: 'center', gap: '24px'}}>
            <Link href="/map" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none'
            }}>
              Carte
            </Link>
            <Link href="/greenyou/annuaire" style={{
              color: '#374151',
              fontWeight: '500',
              textDecoration: 'none'
            }}>
              Annuaire
            </Link>
            <Link href="/hebergement/demande-referencement" style={{
              backgroundColor: '#16a34a',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: '500',
              textDecoration: 'none'
            }}>
              Rejoindre GreenYou
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu principal avec padding-top pour navbar fixe */}
      <div style={{paddingTop: '80px', padding: '80px 20px 60px'}}>
      <div style={{maxWidth: '1000px', margin: '0 auto'}}>
        {/* Hero Section */}
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          {/* Badge Maroc supprimé */}
          <div style={{display: 'inline-flex', marginBottom: '20px', color: '#166534'}}>
            <LeafIcon />
          </div>
          <h1 style={{
            fontSize: '56px',
            color: '#166534',
            marginBottom: '20px',
            fontWeight: '800',
            letterSpacing: '-0.02em'
          }}>
            GreenYou
          </h1>
          <p style={{
            fontSize: '24px',
            color: '#15803d',
            marginBottom: '40px',
            fontWeight: '500'
          }}>
            Le réseau marocain des établissements éco-responsables
          </p>
          
          <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link 
              href="/greenyou/annuaire"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#16a34a',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(22, 163, 74, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
              }}
            >
              <MapPinIcon />
              Voir l'annuaire
            </Link>
            
            <Link 
              href="/hebergement/demande-referencement"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#15803d',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(21, 128, 61, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 128, 61, 0.3)';
              }}
            >
              <CheckCircleIcon />
              Je demande mon référencement
            </Link>
            
            <Link 
              href="/hebergement/ameliorer-empreinte"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#059669',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '18px',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
              }}
            >
              <SparklesIcon />
              J&apos;améliore mon empreinte
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}>
            <div style={{color: '#16a34a', marginBottom: '12px', display: 'flex', justifyContent: 'center'}}>
              <MapPinIcon />
            </div>
            <div style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px'}}>500+</div>
            <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>Établissements</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}>
            <div style={{color: '#16a34a', marginBottom: '12px', display: 'flex', justifyContent: 'center'}}>
              <UsersIcon />
            </div>
            <div style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px'}}>50k+</div>
            <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>Voyageurs</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}>
            <div style={{color: '#16a34a', marginBottom: '12px', display: 'flex', justifyContent: 'center'}}>
              <TrendingUpIcon />
            </div>
            <div style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px'}}>30%</div>
            <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>Économie d&apos;énergie</div>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '16px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}>
            <div style={{color: '#16a34a', marginBottom: '12px', display: 'flex', justifyContent: 'center'}}>
              <HeartIcon />
            </div>
            <div style={{fontSize: '36px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px'}}>95%</div>
            <div style={{fontSize: '14px', color: '#6b7280', fontWeight: '500'}}>Satisfaction</div>
          </div>
        </div>

        {/* About Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '36px',
            color: '#166534',
            marginBottom: '24px',
            fontWeight: '700'
          }}>
            Pourquoi GreenYou ?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#374151',
            lineHeight: '1.8',
            marginBottom: '24px'
          }}>
            Rejoignez le premier réseau marocain d&apos;établissements éco-responsables : <strong>hébergements</strong>, <strong>restaurants</strong>, <strong>lieux touristiques</strong> et <strong>espaces de bien-être et sport</strong>. 
            Du Nord au Sud, de Tanger à Laâyoune, valorisez vos actions écologiques et attirez des visiteurs engagés pour un tourisme durable au Maroc.
          </p>

          {/* Types d'établissements */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              borderLeft: '4px solid #16a34a'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🏨</div>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#166534'}}>Hébergements</div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              borderLeft: '4px solid #16a34a'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🍽️</div>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#166534'}}>Restaurants</div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              borderLeft: '4px solid #16a34a'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🏛️</div>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#166534'}}>Lieux Touristiques</div>
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#f0fdf4',
              borderRadius: '12px',
              borderLeft: '4px solid #16a34a'
            }}>
              <div style={{fontSize: '24px', marginBottom: '8px'}}>🧘</div>
              <div style={{fontSize: '14px', fontWeight: '600', color: '#166534'}}>Bien-être & Sport</div>
            </div>
          </div>

          <ul style={{
            fontSize: '16px',
            color: '#4b5563',
            lineHeight: '2',
            listStyle: 'none',
            padding: 0
          }}>
            <li style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
              <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '20px'}}>✓</span>
              <span>Visibilité accrue auprès de visiteurs éco-conscients</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
              <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '20px'}}>✓</span>
              <span>Conseils personnalisés pour réduire votre empreinte écologique</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
              <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '20px'}}>✓</span>
              <span>Certification reconnue et valorisation de vos efforts durables</span>
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <span style={{color: '#16a34a', fontWeight: 'bold', fontSize: '20px'}}>✓</span>
              <span>Économies réalisées grâce aux pratiques éco-responsables</span>
            </li>
          </ul>
        </div>

        {/* CTA Footer */}
        <div style={{textAlign: 'center', marginTop: '60px'}}>
          <Link 
            href="/"
            style={{
              color: '#16a34a',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              padding: '10px 20px',
              borderRadius: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(22, 163, 74, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ← Retour à l&apos;accueil LmaaMap
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
