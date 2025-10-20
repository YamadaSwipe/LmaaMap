'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ReferencementRequest {
  id: string
  nom: string
  type: string
  email: string
  telephone: string
  adresse: string
  codePostal: string
  ville: string
  pays: string
  description: string
  pratiquesEco: string
  labelsCertifications: string
  siteWeb?: string
  reseauxSociaux?: string
  status: 'EN_ATTENTE' | 'VALIDE' | 'REFUSE'
  createdAt: string
}

interface Stats {
  total: number
  enAttente: number
  valides: number
  refuses: number
}

export default function AdminGreenYou() {
  const router = useRouter()
  const [requests, setRequests] = useState<ReferencementRequest[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, enAttente: 0, valides: 0, refuses: 0 })
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [filter, setFilter] = useState<'ALL' | 'EN_ATTENTE' | 'VALIDE' | 'REFUSE'>('EN_ATTENTE')
  const [selectedRequest, setSelectedRequest] = useState<ReferencementRequest | null>(null)
  const [placeCoordinates, setPlaceCoordinates] = useState({ latitude: '', longitude: '' })

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check-auth')
      if (response.ok) {
        setAuthorized(true)
        fetchRequests()
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/referencement')
      const data = await response.json()
      
      if (data.success) {
        setRequests(data.requests)
        
        // Calculer les stats
        const stats = data.requests.reduce((acc: Stats, req: ReferencementRequest) => {
          acc.total++
          if (req.status === 'EN_ATTENTE') acc.enAttente++
          else if (req.status === 'VALIDE') acc.valides++
          else if (req.status === 'REFUSE') acc.refuses++
          return acc
        }, { total: 0, enAttente: 0, valides: 0, refuses: 0 })
        
        setStats(stats)
      }
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: 'VALIDE' | 'REFUSE', createPlace: boolean = false) => {
    try {
      const payload: any = { id, status, createPlace }
      
      // Si on crée un lieu, ajouter les coordonnées
      if (createPlace && placeCoordinates.latitude && placeCoordinates.longitude) {
        payload.latitude = placeCoordinates.latitude
        payload.longitude = placeCoordinates.longitude
      }
      
      const response = await fetch('/api/referencement', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (data.success) {
        if (createPlace && data.place) {
          alert(`✅ Établissement validé et ajouté à la carte !\n\n📍 ${data.place.nom}\n🗺️ Coordonnées: ${data.place.latitude}, ${data.place.longitude}`)
        }
        fetchRequests()
        setSelectedRequest(null)
        setPlaceCoordinates({ latitude: '', longitude: '' })
      } else {
        alert('Erreur lors de la mise à jour')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la mise à jour')
    }
  }

  const filteredRequests = filter === 'ALL' 
    ? requests 
    : requests.filter(r => r.status === filter)

  if (!authorized || loading) {
    return (
      <div style={{padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          <div style={{fontSize: '18px', color: '#6b7280', marginBottom: '12px'}}>Vérification de l&apos;accès...</div>
          <div style={{fontSize: '14px', color: '#9ca3af'}}>Redirection en cours...</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{padding: '40px', maxWidth: '1400px', margin: '0 auto'}}>
      {/* Header */}
      <div style={{marginBottom: '40px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
          <Link href="/admin/dashboard" style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ← Retour au dashboard
          </Link>
        </div>
        <h1 style={{fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px'}}>
          🌿 GreenYou - Gestion des Référencements
        </h1>
        <p style={{color: '#6b7280', fontSize: '16px'}}>
          Gérez les demandes de référencement des établissements éco-responsables
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #3b82f6'
        }}>
          <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>Total</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#111827'}}>{stats.total}</div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #f59e0b',
          cursor: 'pointer'
        }}
        onClick={() => setFilter('EN_ATTENTE')}>
          <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>En Attente</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#f59e0b'}}>{stats.enAttente}</div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #16a34a',
          cursor: 'pointer'
        }}
        onClick={() => setFilter('VALIDE')}>
          <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>Validés</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#16a34a'}}>{stats.valides}</div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #ef4444',
          cursor: 'pointer'
        }}
        onClick={() => setFilter('REFUSE')}>
          <div style={{fontSize: '14px', color: '#6b7280', marginBottom: '8px'}}>Refusés</div>
          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#ef4444'}}>{stats.refuses}</div>
        </div>
      </div>

      {/* Graphiques de répartition */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Répartition par statut */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px'}}>
            📊 Répartition par statut
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {/* Barre En Attente */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                <span style={{fontSize: '14px', color: '#6b7280'}}>En Attente</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#f59e0b'}}>
                  {stats.total > 0 ? Math.round((stats.enAttente / stats.total) * 100) : 0}%
                </span>
              </div>
              <div style={{height: '12px', backgroundColor: '#fef3c7', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  height: '100%',
                  width: `${stats.total > 0 ? (stats.enAttente / stats.total) * 100 : 0}%`,
                  backgroundColor: '#f59e0b',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>
            
            {/* Barre Validés */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                <span style={{fontSize: '14px', color: '#6b7280'}}>Validés</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#16a34a'}}>
                  {stats.total > 0 ? Math.round((stats.valides / stats.total) * 100) : 0}%
                </span>
              </div>
              <div style={{height: '12px', backgroundColor: '#dcfce7', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  height: '100%',
                  width: `${stats.total > 0 ? (stats.valides / stats.total) * 100 : 0}%`,
                  backgroundColor: '#16a34a',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>
            
            {/* Barre Refusés */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '6px'}}>
                <span style={{fontSize: '14px', color: '#6b7280'}}>Refusés</span>
                <span style={{fontSize: '14px', fontWeight: '600', color: '#ef4444'}}>
                  {stats.total > 0 ? Math.round((stats.refuses / stats.total) * 100) : 0}%
                </span>
              </div>
              <div style={{height: '12px', backgroundColor: '#fee2e2', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{
                  height: '100%',
                  width: `${stats.total > 0 ? (stats.refuses / stats.total) * 100 : 0}%`,
                  backgroundColor: '#ef4444',
                  transition: 'width 0.5s ease'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Répartition par type */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '20px'}}>
            🏨 Top 5 types d'établissements
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {(() => {
              const typeCounts = requests.reduce((acc: {[key: string]: number}, req) => {
                acc[req.type] = (acc[req.type] || 0) + 1
                return acc
              }, {})
              const sortedTypes = Object.entries(typeCounts)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
              
              return sortedTypes.map(([type, count]) => (
                <div key={type} style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div style={{flex: '0 0 120px', fontSize: '13px', color: '#374151', fontWeight: '500'}}>
                    {type}
                  </div>
                  <div style={{flex: 1, height: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px', overflow: 'hidden', position: 'relative'}}>
                    <div style={{
                      height: '100%',
                      width: `${(count / stats.total) * 100}%`,
                      background: 'linear-gradient(90deg, #16a34a 0%, #22c55e 100%)',
                      transition: 'width 0.5s ease'
                    }}></div>
                  </div>
                  <div style={{flex: '0 0 40px', fontSize: '14px', fontWeight: '600', color: '#16a34a', textAlign: 'right'}}>
                    {count}
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
          {(['ALL', 'EN_ATTENTE', 'VALIDE', 'REFUSE'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: filter === status ? '#16a34a' : '#f3f4f6',
                color: filter === status ? 'white' : '#374151',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {status === 'ALL' ? 'Tous' : status === 'EN_ATTENTE' ? 'En attente' : status === 'VALIDE' ? 'Validés' : 'Refusés'}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb'}}>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Nom</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Type</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Ville</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Email</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Status</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Date</th>
                <th style={{padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{padding: '40px', textAlign: 'center', color: '#6b7280'}}>
                    Aucune demande pour ce filtre
                  </td>
                </tr>
              ) : (
                filteredRequests.map(request => (
                  <tr key={request.id} style={{borderBottom: '1px solid #e5e7eb'}}>
                    <td style={{padding: '16px', fontSize: '14px', color: '#111827', fontWeight: '500'}}>
                      {request.nom}
                    </td>
                    <td style={{padding: '16px', fontSize: '14px', color: '#6b7280'}}>
                      {request.type}
                    </td>
                    <td style={{padding: '16px', fontSize: '14px', color: '#6b7280'}}>
                      {request.ville}
                    </td>
                    <td style={{padding: '16px', fontSize: '14px', color: '#6b7280'}}>
                      {request.email}
                    </td>
                    <td style={{padding: '16px'}}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 
                          request.status === 'VALIDE' ? '#dcfce7' :
                          request.status === 'REFUSE' ? '#fee2e2' :
                          '#fef3c7',
                        color:
                          request.status === 'VALIDE' ? '#166534' :
                          request.status === 'REFUSE' ? '#991b1b' :
                          '#92400e'
                      }}>
                        {request.status === 'EN_ATTENTE' ? 'En attente' : request.status === 'VALIDE' ? 'Validé' : 'Refusé'}
                      </span>
                    </td>
                    <td style={{padding: '16px', fontSize: '14px', color: '#6b7280'}}>
                      {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{padding: '16px'}}>
                      <button
                        onClick={() => setSelectedRequest(request)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Détails
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détails */}
      {selectedRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}
        onClick={() => setSelectedRequest(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '40px'
          }}
          onClick={(e) => e.stopPropagation()}>
            <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#111827'}}>
              Détails de la demande
            </h2>
            
            <div style={{marginBottom: '24px'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Nom</div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#111827'}}>{selectedRequest.nom}</div>
                </div>
                <div>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Type</div>
                  <div style={{fontSize: '16px', fontWeight: '600', color: '#111827'}}>{selectedRequest.type}</div>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
                <div>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Email</div>
                  <div style={{fontSize: '16px', color: '#111827'}}>{selectedRequest.email}</div>
                </div>
                <div>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Téléphone</div>
                  <div style={{fontSize: '16px', color: '#111827'}}>{selectedRequest.telephone}</div>
                </div>
              </div>

              <div style={{marginBottom: '20px'}}>
                <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Adresse</div>
                <div style={{fontSize: '16px', color: '#111827'}}>
                  {selectedRequest.adresse}, {selectedRequest.codePostal} {selectedRequest.ville}, {selectedRequest.pays}
                </div>
              </div>

              {selectedRequest.description && (
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Description</div>
                  <div style={{fontSize: '14px', color: '#111827', lineHeight: '1.6'}}>{selectedRequest.description}</div>
                </div>
              )}

              {selectedRequest.pratiquesEco && (
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Pratiques Éco-responsables</div>
                  <div style={{fontSize: '14px', color: '#111827', lineHeight: '1.6'}}>{selectedRequest.pratiquesEco}</div>
                </div>
              )}

              {selectedRequest.labelsCertifications && (
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Labels & Certifications</div>
                  <div style={{fontSize: '14px', color: '#111827', lineHeight: '1.6'}}>{selectedRequest.labelsCertifications}</div>
                </div>
              )}

              {selectedRequest.siteWeb && (
                <div style={{marginBottom: '20px'}}>
                  <div style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px'}}>Site Web</div>
                  <a href={selectedRequest.siteWeb} target="_blank" rel="noopener noreferrer" style={{fontSize: '14px', color: '#3b82f6'}}>
                    {selectedRequest.siteWeb}
                  </a>
                </div>
              )}
            </div>

            {selectedRequest.status === 'EN_ATTENTE' && (
              <>
                <div style={{paddingTop: '24px', borderTop: '1px solid #e5e7eb', marginBottom: '12px'}}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '8px',
                    border: '2px solid #16a34a',
                    cursor: 'pointer'
                  }}>
                    <input
                      type="checkbox"
                      id="createPlaceCheckbox"
                      defaultChecked={true}
                      style={{width: '20px', height: '20px', cursor: 'pointer'}}
                      onChange={(e) => {
                        const coordDiv = document.getElementById('coordinatesDiv');
                        if (coordDiv) {
                          coordDiv.style.display = e.target.checked ? 'block' : 'none';
                        }
                      }}
                    />
                    <div>
                      <div style={{fontSize: '16px', fontWeight: '600', color: '#166534', marginBottom: '4px'}}>
                        🗺️ Créer un lieu sur la carte
                      </div>
                      <div style={{fontSize: '13px', color: '#6b7280'}}>
                        L&apos;établissement sera visible sur LmaaMap avec le badge GreenYou 🌿
                      </div>
                    </div>
                  </label>
                  
                  <div id="coordinatesDiv" style={{marginTop: '16px'}}>
                    <div style={{fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px'}}>
                      📍 Coordonnées GPS (obligatoires pour créer le lieu)
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                      <div>
                        <label style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'block'}}>
                          Latitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Ex: 33.5731"
                          value={placeCoordinates.latitude}
                          onChange={(e) => setPlaceCoordinates({...placeCoordinates, latitude: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'block'}}>
                          Longitude
                        </label>
                        <input
                          type="number"
                          step="any"
                          placeholder="Ex: -7.5898"
                          value={placeCoordinates.longitude}
                          onChange={(e) => setPlaceCoordinates({...placeCoordinates, longitude: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                    <div style={{fontSize: '12px', color: '#6b7280', marginTop: '8px'}}>
                      💡 Conseil : Utilisez <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" style={{color: '#3b82f6'}}>Google Maps</a> pour trouver les coordonnées exactes
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'flex', gap: '12px'}}>
                  <button
                    onClick={() => {
                      const checkbox = document.getElementById('createPlaceCheckbox') as HTMLInputElement;
                      updateStatus(selectedRequest.id, 'VALIDE', checkbox?.checked || false);
                    }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: '#16a34a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✓ Valider
                  </button>
                  <button
                    onClick={() => updateStatus(selectedRequest.id, 'REFUSE', false)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    ✗ Refuser
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => setSelectedRequest(null)}
              style={{
                marginTop: '12px',
                width: '100%',
                padding: '14px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
