export interface NavigationItem {
  label: string;
  href: string;
  description: string;
  urgent?: boolean;
}

export interface NavigationSection {
  title: string;
  id: string;
  items: NavigationItem[];
}

export const navigation: NavigationSection[] = [
  {
    title: 'SICHERHEIT',
    id: 'sicherheit',
    items: [
      {
        label: 'Aktuelle Fahndungen',
        href: '/fahndungen/aktuell',
        description: 'Öffentliche Fahndungen und Eilmeldungen',
        urgent: true,
      },
      {
        label: 'Vermisste Personen',
        href: '/vermisste',
        description: 'Vermisstenfälle in Baden-Württemberg',
      },
      {
        label: 'Gesuchte Straftäter',
        href: '/gesuchte',
        description: 'Öffentliche Straftätersuche',
      },
      {
        label: 'Sicherheitswarnungen',
        href: '/warnungen',
        description: 'Aktuelle Warnungen und Betrugsmeldungen',
      },
    ],
  },
  {
    title: 'SERVICE',
    id: 'service',
    items: [
      {
        label: 'Hinweise melden',
        href: '/hinweise/melden',
        description: 'Sichere Hinweisübermittlung',
      },
      {
        label: 'Online-Anzeige',
        href: '/anzeige/online',
        description: 'Strafanzeige online erstatten',
      },
      {
        label: 'Notruf & Kontakt',
        href: '/kontakt',
        description: 'Notrufnummern und Dienststellen',
      },
      {
        label: 'Bürgerservice',
        href: '/service',
        description: 'Führungszeugnis und Services',
      },
    ],
  },
  {
    title: 'POLIZEI',
    id: 'polizei',
    items: [
      {
        label: 'Über die Polizei BW',
        href: '/ueber-uns',
        description: 'Organisation und Aufgaben',
      },
      {
        label: 'Dienststellen',
        href: '/dienststellen',
        description: 'Standorte und Öffnungszeiten',
      },
      {
        label: 'Karriere',
        href: '/karriere',
        description: 'Ausbildung und Stellenangebote',
      },
      {
        label: 'Presse',
        href: '/presse',
        description: 'Pressemitteilungen und Medien',
      },
    ],
  },
];
