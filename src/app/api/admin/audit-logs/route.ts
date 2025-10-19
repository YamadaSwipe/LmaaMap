import { NextRequest, NextResponse } from 'next/server'

interface AuditLog {
  id: string
  timestamp: string
  adminId: string
  adminName: string
  action: string
  entity: string
  entityId: string
  details: string
  ipAddress: string
  userAgent: string
}

// Logs de démonstration
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2025-10-15T10:30:00Z',
    adminId: 'admin1',
    adminName: 'Admin Principal',
    action: 'APPROVE_PARTNER',
    entity: 'partner',
    entityId: '1',
    details: 'Partenaire Riad Atlas approuvé',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '2',
    timestamp: '2025-10-15T09:15:00Z',
    adminId: 'admin1',
    adminName: 'Admin Principal',
    action: 'SUSPEND_USER',
    entity: 'user',
    entityId: '5',
    details: 'Utilisateur suspendu pour violation des conditions',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '3',
    timestamp: '2025-10-15T08:45:00Z',
    adminId: 'admin1',
    adminName: 'Admin Principal',
    action: 'UPDATE_FOUNTAIN',
    entity: 'fountain',
    entityId: '2',
    details: 'Statut fontaine mis à jour: maintenance',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '4',
    timestamp: '2025-10-14T16:20:00Z',
    adminId: 'admin1',
    adminName: 'Admin Principal',
    action: 'DELETE_FOUNTAIN',
    entity: 'fountain',
    entityId: '8',
    details: 'Fontaine supprimée: doublon signalé',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  },
  {
    id: '5',
    timestamp: '2025-10-14T14:10:00Z',
    adminId: 'admin1',
    adminName: 'Admin Principal',
    action: 'APPROVE_FOUNTAIN',
    entity: 'fountain',
    entityId: '7',
    details: 'Nouvelle fontaine approuvée: Place Mohammed V',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0...'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const entity = searchParams.get('entity') // filtrer par type d'entité
  const action = searchParams.get('action') // filtrer par action
  
  try {
    let filteredLogs = mockAuditLogs
    
    if (entity) {
      filteredLogs = filteredLogs.filter(log => log.entity === entity)
    }
    
    if (action) {
      filteredLogs = filteredLogs.filter(log => log.action === action)
    }
    
    const logs = filteredLogs.slice(0, limit)
    
    return NextResponse.json({
      success: true,
      data: logs,
      total: filteredLogs.length,
      stats: {
        totalActions: mockAuditLogs.length,
        actionsToday: mockAuditLogs.filter(log => 
          log.timestamp.startsWith('2025-10-15')
        ).length,
        actionsByType: {
          approve: mockAuditLogs.filter(log => log.action.includes('APPROVE')).length,
          suspend: mockAuditLogs.filter(log => log.action.includes('SUSPEND')).length,
          delete: mockAuditLogs.filter(log => log.action.includes('DELETE')).length,
          update: mockAuditLogs.filter(log => log.action.includes('UPDATE')).length
        }
      }
    })
  } catch (error) {
    console.error('Erreur API audit logs:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { adminId, adminName, action, entity, entityId, details } = body
    
    // Enregistrer le log d'audit
    const newLog: AuditLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      adminId,
      adminName,
      action,
      entity,
      entityId,
      details,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
    
    console.log('Nouveau log audit:', newLog)
    
    return NextResponse.json({
      success: true,
      message: 'Log audit enregistré',
      data: newLog
    })
  } catch (error) {
    console.error('Erreur enregistrement log audit:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'enregistrement du log' },
      { status: 500 }
    )
  }
}