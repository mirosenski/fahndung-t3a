# Fahndung T3-Stack Development Guide

## Projektübersicht

**Aktuelle Architektur:**
- **Framework:** Next.js 15 mit React Server Components
- **Backend:** tRPC v11 mit Prisma ORM
- **Datenbank:** SQLite (Migration zu PostgreSQL geplant)
- **UI:** Radix UI + Tailwind CSS 4
- **Auth:** NextAuth v5 mit RBAC (ADMIN|EDITOR|USER)
- **Styling:** Tailwind CSS 4 + Radix Themes
- **Entwicklungsserver:** Port 3005 (Port 3000 für Gitea reserviert)

## Aktuelle Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── fahndung/         # Fahndung-spezifische Routen
│   ├── suche/            # Suchfunktionalität
│   └── admin/            # Admin-Bereich
├── components/            # UI-Komponenten
├── server/               # Server-seitige Logik
│   ├── auth/            # Authentifizierung
│   └── api/             # API-Endpunkte
├── trpc/                # tRPC-Konfiguration
└── lib/                 # Utilities
```

## Verbesserte Development Prompts

### 1. Datenbank-Migration & Schema-Erweiterung

```markdown
**Prompt:** Erweitere das bestehende Prisma-Schema um ein vollständiges Fahndung-Modell:

**Anforderungen:**
- Erstelle ein `Fahndung`-Modell mit allen notwendigen Feldern
- Migriere von SQLite zu PostgreSQL für Produktionsumgebung
- Implementiere Audit-Logging für alle CRUD-Operationen
- Füge Geodaten-Unterstützung hinzu (lat/lng)
- Erstelle Indizes für Performance-Optimierung

**Technische Details:**
- Verwende bestehende `Status` und `Role` Enums
- Erweitere das `User`-Modell um Rollen
- Implementiere Soft-Delete für Datenschutz
- Füge Validierung mit Zod hinzu

**Erwartete Ausgabe:**
1. Vollständiges Prisma-Schema
2. Migrations-Skripte
3. Zod-Validierungsschemas
4. Performance-Optimierungsempfehlungen
```

### 2. tRPC Router-Implementierung

```markdown
**Prompt:** Implementiere einen vollständigen tRPC Router für Fahndung-Operationen:

**Anforderungen:**
- Erstelle `fahndungRouter` mit CRUD-Operationen
- Implementiere RBAC-basierte Zugriffskontrolle
- Füge Input-Validierung mit Zod hinzu
- Implementiere Pagination für Listen-Ansichten
- Erstelle öffentliche und geschützte Endpunkte

**Endpunkte:**
- `createFahndung` (ADMIN/EDITOR)
- `updateFahndung` (ADMIN/EDITOR)
- `deleteFahndung` (ADMIN)
- `getFahndungById` (öffentlich)
- `listFahndungen` (öffentlich mit Filtering)
- `getFahndungStats` (ADMIN)

**Sicherheitsaspekte:**
- Session-basierte Authentifizierung
- Rollen-basierte Autorisierung
- Input-Sanitization
- Rate-Limiting für öffentliche Endpunkte
```

### 3. React Server Components

```markdown
**Prompt:** Erstelle moderne React Server Components für Fahndung-Funktionalität:

**Komponenten:**
1. **FahndungForm.tsx** - Erstellen/Bearbeiten von Fahndungen
2. **FahndungCard.tsx** - Kompakte Darstellung in Listen
3. **FahndungDetail.tsx** - Detaillierte Einzelansicht
4. **FahndungList.tsx** - Listen-Ansicht mit Filtering
5. **FahndungMap.tsx** - Karten-Integration

**Technische Anforderungen:**
- Server Actions für Formulare
- Optimistic Updates
- Error Boundaries
- Loading States
- WCAG-AA Compliance
- Responsive Design

**UI/UX-Features:**
- Dark/Light Mode Support
- Accessibility-First Design
- Mobile-optimierte Bedienung
- Progressive Enhancement
```

### 4. Suchfunktionalität & Filtering

```markdown
**Prompt:** Implementiere eine erweiterte Suchfunktionalität für Fahndungen:

**Suchfunktionen:**
- Volltext-Suche in Name, Beschreibung, Ort
- Fuzzy-Search für Tippfehler-Toleranz
- Geografische Suche (Radius-basiert)
- Filter nach Status, Typ, Datum
- Erweiterte Filter (Alter, Geschlecht, etc.)

**Technische Implementierung:**
- Server-seitige Suche mit Prisma
- Client-seitige Filterung mit Zustand
- Debounced Search Input
- URL-basierte Filter-Persistierung
- Suchverlauf und Favoriten

**Performance-Optimierung:**
- Database-Indizes für Suchfelder
- Caching von Suchergebnissen
- Lazy Loading für große Listen
- Virtual Scrolling für Performance
```

### 5. Karten-Integration

```markdown
**Prompt:** Integriere eine interaktive Karten-Funktionalität:

**Karten-Features:**
- Leaflet.js oder Mapbox GL JS Integration
- Marker für Fahndungsstandorte
- Cluster für mehrere Marker
- Geocoding für Adress-Eingabe
- Routing zu Fahndungsstandorten

**Technische Anforderungen:**
- Server-seitiges Geocoding
- Offline-Karten-Support
- Performance-Optimierung für mobile Geräte
- Accessibility für Screen Reader
- GPS-Integration für mobile Nutzer

**Datenschutz:**
- Anonymisierung von sensiblen Standorten
- Granulare Standort-Berechtigungen
- Audit-Logging für Standort-Zugriffe
```

### 6. Admin-Dashboard

```markdown
**Prompt:** Erstelle ein umfassendes Admin-Dashboard:

**Dashboard-Features:**
- Statistiken und Analytics
- Benutzer-Management
- Fahndungs-Übersicht
- Audit-Log Anzeige
- System-Monitoring

**Komponenten:**
- `AdminStats.tsx` - Key Performance Indicators
- `UserManagement.tsx` - Benutzer-Verwaltung
- `AuditLog.tsx` - Aktivitäts-Log
- `SystemHealth.tsx` - System-Status

**Sicherheitsaspekte:**
- Rollen-basierte Dashboard-Zugriffe
- Sensitive Daten-Maskierung
- Export-Funktionalität mit Datenschutz
- Backup- und Recovery-Tools
```

### 7. Real-time Features

```markdown
**Prompt:** Implementiere Real-time Funktionalitäten:

**Real-time Features:**
- Live-Updates für neue Fahndungen
- Benachrichtigungen für relevante Updates
- Echtzeit-Statistiken
- Live-Chat für Koordination

**Technische Implementierung:**
- Server-Sent Events (SSE)
- WebSocket-Integration
- Push-Benachrichtigungen
- Offline-First Support

**Performance:**
- Connection Pooling
- Message Queuing
- Fallback zu Polling
- Battery-Optimierung für mobile Geräte
```

### 8. Datenschutz & Compliance

```markdown
**Prompt:** Implementiere DSGVO-konforme Datenschutz-Features:

**Datenschutz-Features:**
- Automatische Daten-Anonymisierung
- Recht auf Löschung (Right to be Forgotten)
- Daten-Portabilität
- Consent-Management
- Audit-Trail für alle Datenzugriffe

**Technische Implementierung:**
- Automatische Daten-Verschlüsselung
- PII (Personally Identifiable Information) Masking
- Daten-Retention Policies
- Backup-Verschlüsselung
- Compliance-Reporting

**Sicherheitsstandards:**
- ISO 27001 Compliance
- BSI-Grundschutz
- Polizei-spezifische Sicherheitsanforderungen
```

### 9. Performance-Optimierung

```markdown
**Prompt:** Optimiere die Anwendung für Produktionsumgebung:

**Performance-Features:**
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Image Optimization
- Code Splitting
- Bundle Size Optimization

**Caching-Strategien:**
- Redis für Session-Caching
- CDN für statische Assets
- Database Query Caching
- Browser-Caching Headers

**Monitoring:**
- Application Performance Monitoring (APM)
- Error Tracking
- User Experience Monitoring
- Database Performance Monitoring
```

### 10. Testing & Quality Assurance

```markdown
**Prompt:** Implementiere umfassende Test-Strategien:

**Test-Typen:**
- Unit Tests für Utilities und Helpers
- Integration Tests für tRPC-Router
- E2E Tests für kritische User Flows
- Accessibility Tests
- Performance Tests

**Testing-Tools:**
- Jest für Unit Tests
- Playwright für E2E Tests
- MSW für API Mocking
- Lighthouse für Performance
- axe-core für Accessibility

**CI/CD Pipeline:**
- Automatisierte Tests
- Code Quality Checks
- Security Scanning
- Performance Monitoring
- Automated Deployments
```

## Deployment & DevOps

### Umgebungen
- **Development:** Port 3005, SQLite
- **Staging:** PostgreSQL, Redis
- **Production:** PostgreSQL, Redis, CDN

### Monitoring
- Error Tracking mit Sentry
- Performance Monitoring
- Security Scanning
- Compliance Monitoring

### Backup-Strategie
- Automatische Database-Backups
- File Storage Backups
- Disaster Recovery Plan
- Data Retention Policies

## Nächste Schritte

1. **Phase 1:** Datenbank-Migration und Schema-Erweiterung
2. **Phase 2:** tRPC Router und API-Implementierung
3. **Phase 3:** React Server Components und UI
4. **Phase 4:** Suchfunktionalität und Filtering
5. **Phase 5:** Karten-Integration
6. **Phase 6:** Admin-Dashboard
7. **Phase 7:** Real-time Features
8. **Phase 8:** Datenschutz und Compliance
9. **Phase 9:** Performance-Optimierung
10. **Phase 10:** Testing und Quality Assurance

---

**Hinweis:** Alle Prompts sind speziell für die aktuelle T3-Stack-Architektur optimiert und berücksichtigen die bestehende Projektstruktur sowie die deutschen Anforderungen für Polizei-Anwendungen. 