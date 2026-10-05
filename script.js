/* script.js – theme, i18n (data-i18n), nav, contact helpers
   localStorage keys: theme, lang (migrates legacy langPref) */

(function () {
  'use strict';

  /* ——— Theme ——— */
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      var isDark = theme === 'dark';
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute(
        'aria-label',
        isDark
          ? (document.documentElement.lang === 'en' ? 'Switch to light mode' : 'Zum hellen Modus wechseln')
          : (document.documentElement.lang === 'en' ? 'Switch to dark mode' : 'Zum dunklen Modus wechseln')
      );
    });
  }

  function initTheme() {
    var saved = localStorage.getItem('theme');
    setTheme(saved || getSystemTheme());
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ——— Translations (shared across pages) ——— */
  var translations = {
    de: {
      'nav.services': 'Leistungen',
      'nav.servicesBiz': 'Für Unternehmen',
      'nav.servicesPriv': 'Für Privatkunden',
      'nav.about': 'Über mich',
      'nav.contact': 'Kontakt',
      'nav.cta': 'Kontakt',
      'nav.menu': 'Menü öffnen',
      'nav.close': 'Menü schließen',
      'nav.lang': 'Sprache wählen',
      'skip': 'Zum Inhalt springen',

      'hero.eyebrow': 'Sankt Ulrich bei Steyr · Oberösterreich',
      'hero.title': 'Langwieser IT-Services',
      'hero.claim': 'IT-Beratung & Automation für Unternehmen – und persönliche IT-Hilfe im Raum Steyr.',
      'hero.ctaBiz': 'Für Unternehmen',
      'hero.ctaPriv': 'Für Privatkunden',
      'hero.badge1': 'Nintex K2',
      'hero.badge2': 'Power Platform',
      'hero.badge3': 'SQL',
      'hero.badge4': 'Vor Ort & Remote',
      'hero.photoAlt': 'Matthias Langwieser, IT-Consultant',

      'biz.eyebrow': 'Unternehmen',
      'biz.title': 'Leistungen für Unternehmen',
      'biz.lead': 'Workflow-Automatisierung, Datenplattformen und pragmatische IT-Beratung – von Enterprise bis KMU.',
      'biz.k2.title': 'Nintex K2',
      'biz.k2.text': 'Workflow-Automatisierung und Prozessdigitalisierung für Enterprise-Umgebungen.',
      'biz.pp.title': 'MS Power Platform',
      'biz.pp.text': 'Power Apps, Power Automate und Power BI für maßgeschneiderte Business-Lösungen.',
      'biz.sql.title': 'SQL & Datenbanken',
      'biz.sql.text': 'Datenbankdesign, Optimierung und Reporting mit SQL Server.',
      'biz.consult.title': 'IT-Beratung',
      'biz.consult.text': 'Strategische Beratung für Digitalisierungsprojekte und Tool-Auswahl.',
      'biz.cta': 'Projekt anfragen',

      'priv.eyebrow': 'Privatkunden',
      'priv.title': 'IT-Hilfe für Privatkunden',
      'priv.lead': 'Der Computer streikt oder das neue Gerät soll endlich laufen? Ich helfe Ihnen persönlich – bei Ihnen vor Ort im Raum Steyr oder bequem remote.',
      'priv.repair.title': 'PC & Laptop reparieren',
      'priv.repair.text': 'Fehlersuche und Instandsetzung, wenn Ihr Gerät nicht mehr rund läuft.',
      'priv.repair.price': 'ab €69 / Std.',
      'priv.setup.title': 'Neu aufsetzen',
      'priv.setup.text': 'Ihr Gerät frisch installiert und startklar eingerichtet.',
      'priv.setup.price': 'ab €89',
      'priv.setup.note': '(ohne Datenrettung)',
      'priv.advice.title': 'Beratung remote',
      'priv.advice.text': 'Verständliche Antworten auf Ihre IT-Fragen – ohne Fachchinesisch.',
      'priv.advice.price': 'ab €49 / 30 Min.',
      'priv.mig.title': 'Einrichtung & Umzug',
      'priv.mig.text': 'Neues Gerät einrichten und Ihre Daten vom alten Gerät übernehmen.',
      'priv.mig.price': 'ab €79',
      'priv.note1': 'Erstgespräch kostenlos',
      'priv.note2': 'Anfahrt im Raum Steyr (ca. 30 km) kostenlos, darüber hinaus nach Absprache',
      'priv.note3': 'Außerhalb des Radius erhalten Sie nach kurzer Klärung ein Angebot',
      'priv.ust': 'Alle Preise inkl. 20 % USt',
      'priv.cta': 'Kostenloses Erstgespräch anfragen',

      'about.eyebrow': 'Über mich',
      'about.title': 'Hallo, ich bin Matthias',
      'about.lead': 'Ich unterstütze Unternehmen dabei, ihre Arbeitsabläufe zu digitalisieren und zu automatisieren – und helfe Privatpersonen im Raum Steyr bei alltäglichen IT-Problemen.',
      'about.p1': 'Nach meiner Ausbildung und mehreren Jahren Berufserfahrung in der IT-Branche habe ich Langwieser IT-Services gegründet. Die beste Technologie ist die, die man nicht bemerkt – weil sie einfach funktioniert.',
      'about.p2': 'Genau das ist mein Ansatz: Lösungen, die sich nahtlos in bestehende Prozesse einfügen. Ohne unnötige Komplexität, ohne Fachchinesisch – dafür mit persönlichem Service.',
      'about.valuesTitle': 'Wofür ich stehe',
      'about.v1.title': 'Lösungsorientiert',
      'about.v1.text': 'Fokus auf Ergebnisse, die wirklich funktionieren.',
      'about.v2.title': 'Klare Kommunikation',
      'about.v2.text': 'Technologie verständlich erklärt, ohne unnötigen Jargon.',
      'about.v3.title': 'Partnerschaftlich',
      'about.v3.text': 'Ich arbeite mit Ihnen, nicht nur für Sie.',
      'about.v4.title': 'Pragmatisch',
      'about.v4.text': 'Die einfachste Lösung ist oft die beste.',
      'about.linkedin': 'Profil auf LinkedIn',

      'contact.eyebrow': 'Kontakt',
      'contact.title': 'Lassen Sie uns sprechen',
      'contact.lead': 'Ob Unternehmensprojekt oder private IT-Hilfe – schreiben Sie mir. Ich melde mich in der Regel innerhalb eines Werktags.',
      'contact.email': 'E-Mail',
      'contact.location': 'Standort',
      'contact.locationVal': 'Sankt Ulrich bei Steyr, Österreich',
      'contact.linkedin': 'LinkedIn',
      'contact.name': 'Name',
      'contact.emailLabel': 'E-Mail',
      'contact.audience': 'Anliegen',
      'contact.audienceBiz': 'Unternehmen',
      'contact.audiencePriv': 'Privatkunde',
      'contact.audienceOther': 'Sonstiges',
      'contact.message': 'Nachricht',
      'contact.submit': 'Nachricht senden',
      'contact.privacy': 'Mit dem Absenden stimmen Sie der Verarbeitung gemäß ',
      'contact.privacyLink': 'Datenschutzerklärung',
      'contact.privacyEnd': ' zu.',
      'contact.ok': 'Vielen Dank! Ihre Nachricht wurde gesendet.',
      'contact.err': 'Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie mir direkt per E-Mail.',

      'footer.copy': '© 2026 Langwieser IT-Services e.U.',
      'footer.impress': 'Impressum',
      'footer.privacy': 'Datenschutz',
      'footer.linkedin': 'LinkedIn',

      'legal.back': 'Zurück zur Startseite',
      'impress.title': 'Impressum',
      'impress.country': 'Österreich',
      'impress.contact': 'Kontakt',
      'impress.purpose': 'Unternehmensgegenstand',
      'impress.purposeText': 'IT-Dienstleistungen, Beratung und Implementierung',
      'impress.uid': 'UID-Nummer',
      'impress.authority': 'Aufsichtsbehörde',
      'impress.authorityText': 'Bezirkshauptmannschaft Steyr-Land',
      'impress.member': 'Mitgliedschaft',
      'impress.memberText': 'Wirtschaftskammer Oberösterreich',
      'impress.law': 'Anwendbare Rechtsvorschriften',
      'impress.lawText': 'Gewerbeordnung:',
      'impress.dispute': 'Streitschlichtung',
      'impress.disputeText': 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
      'impress.disputeEnd': 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      'impress.liability': 'Haftung für Inhalte',
      'impress.liabilityText': 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.',

      'privacy.title': 'Datenschutzerklärung',
      'privacy.updated': 'Stand: Oktober 2026',
      'privacy.intro': 'Der Schutz Ihrer persönlichen Daten ist mir ein besonderes Anliegen. Ich verarbeite Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).',
      'privacy.c1': '1. Verantwortlicher',
      'privacy.c2': '2. Erhebung und Verarbeitung von Daten',
      'privacy.c2t1': 'Wenn Sie meine Website besuchen, werden automatisch folgende Daten erfasst (Server-Logs des Hosters):',
      'privacy.c2i1': 'IP-Adresse des anfragenden Rechners',
      'privacy.c2i2': 'Datum und Uhrzeit des Zugriffs',
      'privacy.c2i3': 'Name und URL der abgerufenen Datei',
      'privacy.c2i4': 'Website, von der aus der Zugriff erfolgt (Referrer-URL)',
      'privacy.c2i5': 'Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners',
      'privacy.c2t2': 'Diese Daten werden ausschließlich zur Gewährleistung eines störungsfreien Betriebs der Website und zur Verbesserung meines Angebots ausgewertet. Eine Zuordnung zu einer bestimmten Person ist nicht möglich.',
      'privacy.c3': '3. Kontaktaufnahme',
      'privacy.c3t': 'Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit mir aufnehmen, werden Ihre angegebenen Daten (Name, E-Mail-Adresse, Anliegen, Nachricht) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei mir gespeichert. Diese Daten gebe ich nicht ohne Ihre Einwilligung weiter.',
      'privacy.c3b': 'Rechtsgrundlage',
      'privacy.c3bt': 'Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung bzw. vorvertragliche Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage).',
      'privacy.c3d': 'Speicherdauer',
      'privacy.c3dt': 'Die von Ihnen übermittelten Daten verbleiben bei mir, bis Sie mich zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.',
      'privacy.c4': '4. Lokale Speicherung (kein Tracking)',
      'privacy.c4t1': 'Diese Website speichert technisch notwendige Einstellungen im lokalen Speicher Ihres Browsers (localStorage), keine Tracking-Cookies:',
      'privacy.c4i1': 'Spracheinstellung (DE/EN)',
      'privacy.c4i2': 'Theme-Einstellung (hell/dunkel)',
      'privacy.c4t2': 'Es werden keine Tracking-Cookies oder Analyse-Tools von Drittanbietern verwendet.',
      'privacy.c5': '5. Dienste von Drittanbietern',
      'privacy.c5f': 'Formspree (Kontaktformular)',
      'privacy.c5ft': 'Für die Verarbeitung von Kontaktanfragen über das Kontaktformular nutze ich den Dienst Formspree (Formspree Inc., USA). Wenn Sie das Kontaktformular absenden, werden die von Ihnen eingegebenen Daten an die Server von Formspree übermittelt und von dort an meine E-Mail-Adresse weitergeleitet. Formspree verarbeitet diese Daten ausschließlich zur Zustellung Ihrer Nachricht. Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b und lit. f DSGVO.',
      'privacy.c5fm': 'Weitere Informationen: ',
      'privacy.c5fonts': 'Schriftarten',
      'privacy.c5fontst': 'Diese Website verwendet ausschließlich systemeigene Schriftarten Ihres Geräts. Es werden keine Schriftarten von Google Fonts oder anderen Drittanbietern nachgeladen.',
      'privacy.c6': '6. Ihre Rechte',
      'privacy.c6t': 'Ihnen stehen grundsätzlich folgende Rechte zu:',
      'privacy.c6i1': 'Auskunftsrecht: Sie haben das Recht, Auskunft über Ihre bei mir gespeicherten personenbezogenen Daten zu erhalten.',
      'privacy.c6i2': 'Berichtigungsrecht: Sie haben das Recht auf Berichtigung unrichtiger Daten.',
      'privacy.c6i3': 'Löschungsrecht: Sie haben das Recht auf Löschung Ihrer Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
      'privacy.c6i4': 'Einschränkungsrecht: Sie haben das Recht auf Einschränkung der Verarbeitung Ihrer Daten.',
      'privacy.c6i5': 'Widerspruchsrecht: Sie haben das Recht, der Verarbeitung Ihrer Daten zu widersprechen.',
      'privacy.c6i6': 'Datenübertragbarkeit: Sie haben das Recht, Ihre Daten in einem gängigen Format zu erhalten.',
      'privacy.c7': '7. Beschwerderecht',
      'privacy.c7t': 'Sie haben das Recht, sich bei der zuständigen Aufsichtsbehörde zu beschweren:',
      'privacy.c8': '8. Datensicherheit',
      'privacy.c8t': 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',
      'privacy.c9': '9. Änderungen dieser Datenschutzerklärung',
      'privacy.c9t': 'Ich behalte mir vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen meiner Leistungen umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.'
    },
    en: {
      'nav.services': 'Services',
      'nav.servicesBiz': 'For businesses',
      'nav.servicesPriv': 'For private customers',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.cta': 'Contact',
      'nav.menu': 'Open menu',
      'nav.close': 'Close menu',
      'nav.lang': 'Select language',
      'skip': 'Skip to content',

      'hero.eyebrow': 'Sankt Ulrich bei Steyr · Upper Austria',
      'hero.title': 'Langwieser IT-Services',
      'hero.claim': 'IT consulting & automation for businesses – and personal IT help in the Steyr area.',
      'hero.ctaBiz': 'For businesses',
      'hero.ctaPriv': 'For private customers',
      'hero.badge1': 'Nintex K2',
      'hero.badge2': 'Power Platform',
      'hero.badge3': 'SQL',
      'hero.badge4': 'On-site & remote',
      'hero.photoAlt': 'Matthias Langwieser, IT consultant',

      'biz.eyebrow': 'Business',
      'biz.title': 'Services for businesses',
      'biz.lead': 'Workflow automation, data platforms, and pragmatic IT consulting – from enterprise to SME.',
      'biz.k2.title': 'Nintex K2',
      'biz.k2.text': 'Workflow automation and process digitalization for enterprise environments.',
      'biz.pp.title': 'MS Power Platform',
      'biz.pp.text': 'Power Apps, Power Automate, and Power BI for tailored business solutions.',
      'biz.sql.title': 'SQL & databases',
      'biz.sql.text': 'Database design, optimization, and reporting with SQL Server.',
      'biz.consult.title': 'IT consulting',
      'biz.consult.text': 'Strategic advice for digitalization projects and tool selection.',
      'biz.cta': 'Request a project',

      'priv.eyebrow': 'Private customers',
      'priv.title': 'IT help for private customers',
      'priv.lead': 'Computer acting up, or your new device just won’t cooperate? I’ll help you in person – at your home in the Steyr area or conveniently via remote session.',
      'priv.repair.title': 'PC & laptop repair',
      'priv.repair.text': 'Troubleshooting and repair when your device isn’t running smoothly.',
      'priv.repair.price': 'from €69 / hour',
      'priv.setup.title': 'Fresh setup',
      'priv.setup.text': 'Your device freshly installed and ready to go.',
      'priv.setup.price': 'from €89',
      'priv.setup.note': '(excluding data recovery)',
      'priv.advice.title': 'Remote advice',
      'priv.advice.text': 'Clear answers to your IT questions – no jargon.',
      'priv.advice.price': 'from €49 / 30 min',
      'priv.mig.title': 'Setup & migration',
      'priv.mig.text': 'Set up your new device and move your data over from the old one.',
      'priv.mig.price': 'from €79',
      'priv.note1': 'Initial consultation free of charge',
      'priv.note2': 'Free travel within the Steyr area (approx. 30 km), beyond that by arrangement',
      'priv.note3': 'Outside this radius you’ll receive a quote after a short chat',
      'priv.ust': 'All prices include 20% VAT',
      'priv.cta': 'Request a free consultation',

      'about.eyebrow': 'About',
      'about.title': 'Hi, I’m Matthias',
      'about.lead': 'I help businesses digitize and automate their workflows – and I help private customers in the Steyr area with everyday IT problems.',
      'about.p1': 'After my training and several years in the IT industry, I founded Langwieser IT-Services. The best technology is the kind you don’t notice – because it simply works.',
      'about.p2': 'That’s my approach: solutions that fit seamlessly into existing processes. No unnecessary complexity, no jargon – just personal service.',
      'about.valuesTitle': 'What I stand for',
      'about.v1.title': 'Solution-focused',
      'about.v1.text': 'Focus on results that actually work.',
      'about.v2.title': 'Clear communication',
      'about.v2.text': 'Technology explained clearly, without unnecessary jargon.',
      'about.v3.title': 'Partnership',
      'about.v3.text': 'I work with you, not just for you.',
      'about.v4.title': 'Pragmatic',
      'about.v4.text': 'The simplest solution is often the best.',
      'about.linkedin': 'LinkedIn profile',

      'contact.eyebrow': 'Contact',
      'contact.title': 'Let’s talk',
      'contact.lead': 'Whether a business project or private IT help – drop me a line. I usually reply within one business day.',
      'contact.email': 'Email',
      'contact.location': 'Location',
      'contact.locationVal': 'Sankt Ulrich bei Steyr, Austria',
      'contact.linkedin': 'LinkedIn',
      'contact.name': 'Name',
      'contact.emailLabel': 'Email',
      'contact.audience': 'Topic',
      'contact.audienceBiz': 'Business',
      'contact.audiencePriv': 'Private customer',
      'contact.audienceOther': 'Other',
      'contact.message': 'Message',
      'contact.submit': 'Send message',
      'contact.privacy': 'By submitting you agree to processing per the ',
      'contact.privacyLink': 'privacy policy',
      'contact.privacyEnd': '.',
      'contact.ok': 'Thank you! Your message has been sent.',
      'contact.err': 'Sending failed. Please try again or email me directly.',

      'footer.copy': '© 2026 Langwieser IT-Services e.U.',
      'footer.impress': 'Legal notice',
      'footer.privacy': 'Privacy policy',
      'footer.linkedin': 'LinkedIn',

      'legal.back': 'Back to homepage',
      'impress.title': 'Legal notice (Imprint)',
      'impress.country': 'Austria',
      'impress.contact': 'Contact',
      'impress.purpose': 'Purpose of business',
      'impress.purposeText': 'IT services, consulting and implementation',
      'impress.uid': 'VAT number',
      'impress.authority': 'Supervisory authority',
      'impress.authorityText': 'District Commission Steyr-Land (Bezirkshauptmannschaft Steyr-Land)',
      'impress.member': 'Membership',
      'impress.memberText': 'Chamber of Commerce Upper Austria (Wirtschaftskammer Oberösterreich)',
      'impress.law': 'Applicable legal regulations',
      'impress.lawText': 'Trade Regulation Act (Gewerbeordnung):',
      'impress.dispute': 'Dispute resolution',
      'impress.disputeText': 'The European Commission provides a platform for online dispute resolution (ODR):',
      'impress.disputeEnd': 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
      'impress.liability': 'Liability for content',
      'impress.liabilityText': 'The contents of this website were created with the greatest possible care. However, no guarantee can be given for the correctness, completeness, and topicality of the contents.',

      'privacy.title': 'Privacy policy',
      'privacy.updated': 'Last updated: October 2026',
      'privacy.intro': 'The protection of your personal data is of particular concern to me. I therefore process your data exclusively on the basis of legal provisions (GDPR, TKG 2003).',
      'privacy.c1': '1. Data controller',
      'privacy.c2': '2. Data collection and processing',
      'privacy.c2t1': 'When you visit my website, the following data is automatically collected (host server logs):',
      'privacy.c2i1': 'IP address of the requesting computer',
      'privacy.c2i2': 'Date and time of access',
      'privacy.c2i3': 'Name and URL of the retrieved file',
      'privacy.c2i4': 'Website from which access is made (referrer URL)',
      'privacy.c2i5': 'Browser used and, if applicable, the operating system of your computer',
      'privacy.c2t2': 'This data is evaluated exclusively to ensure trouble-free operation of the website and to improve my services. It is not possible to assign this data to a specific person.',
      'privacy.c3': '3. Contact',
      'privacy.c3t': 'If you contact me via the website form or by email, your provided data (name, email address, topic, message) will be stored for processing the request and follow-up questions. I will not share this data without your consent.',
      'privacy.c3b': 'Legal basis',
      'privacy.c3bt': 'Processing is based on Art. 6(1)(b) GDPR (contract fulfillment or pre-contractual measures) and Art. 6(1)(f) GDPR (legitimate interest in responding to your inquiry).',
      'privacy.c3d': 'Storage duration',
      'privacy.c3dt': 'The data you submit will remain with me until you request deletion, revoke consent, or the purpose no longer applies. Mandatory legal retention periods remain unaffected.',
      'privacy.c4': '4. Local storage (no tracking)',
      'privacy.c4t1': 'This website stores technically necessary settings in your browser’s localStorage – no tracking cookies:',
      'privacy.c4i1': 'Language preference (DE/EN)',
      'privacy.c4i2': 'Theme preference (light/dark)',
      'privacy.c4t2': 'No tracking cookies or third-party analytics tools are used.',
      'privacy.c5': '5. Third-party services',
      'privacy.c5f': 'Formspree (contact form)',
      'privacy.c5ft': 'For processing contact requests I use Formspree (Formspree Inc., USA). When you submit the form, your data is transmitted to Formspree’s servers and forwarded to my email address. Formspree processes this data solely to deliver your message. Use is based on Art. 6(1)(b) and (f) GDPR.',
      'privacy.c5fm': 'More information: ',
      'privacy.c5fonts': 'Fonts',
      'privacy.c5fontst': 'This website uses only system fonts on your device. No fonts are loaded from Google Fonts or other third parties.',
      'privacy.c6': '6. Your rights',
      'privacy.c6t': 'You generally have the following rights:',
      'privacy.c6i1': 'Right of access: You may obtain information about your personal data stored by me.',
      'privacy.c6i2': 'Right to rectification: You may correct inaccurate data.',
      'privacy.c6i3': 'Right to erasure: You may request deletion unless legal retention obligations prevent this.',
      'privacy.c6i4': 'Right to restriction: You may restrict processing of your data.',
      'privacy.c6i5': 'Right to object: You may object to processing of your data.',
      'privacy.c6i6': 'Data portability: You may receive your data in a common format.',
      'privacy.c7': '7. Right to complain',
      'privacy.c7t': 'You have the right to complain to the competent supervisory authority:',
      'privacy.c8': '8. Data security',
      'privacy.c8t': 'For security reasons this website uses SSL/TLS encryption. You can recognize an encrypted connection by the address bar changing from “http://” to “https://” and the lock icon.',
      'privacy.c9': '9. Changes to this privacy policy',
      'privacy.c9t': 'I reserve the right to adapt this privacy policy to current legal requirements or changes to my services. The new policy will apply on your next visit.'
    }
  };

  var metaTranslations = {
    de: {
      index: {
        title: 'Langwieser IT-Services | IT-Beratung & IT-Hilfe Steyr',
        description: 'IT-Beratung für Nintex K2, MS Power Platform (inkl. Power BI) und SQL – plus IT-Hilfe für Privatkunden im Raum Steyr.'
      },
      impress: {
        title: 'Impressum | Langwieser IT-Services e.U.',
        description: 'Impressum der Langwieser IT-Services e.U., Sankt Ulrich bei Steyr.'
      },
      datenschutz: {
        title: 'Datenschutzerklärung | Langwieser IT-Services e.U.',
        description: 'Datenschutzerklärung der Langwieser IT-Services e.U. – Informationen zur Datenverarbeitung gemäß DSGVO.'
      }
    },
    en: {
      index: {
        title: 'Langwieser IT-Services | IT consulting & IT help Steyr',
        description: 'IT consulting for Nintex K2, MS Power Platform (incl. Power BI) and SQL – plus IT help for private customers in the Steyr area.'
      },
      impress: {
        title: 'Legal notice | Langwieser IT-Services e.U.',
        description: 'Legal notice for Langwieser IT-Services e.U., Sankt Ulrich bei Steyr.'
      },
      datenschutz: {
        title: 'Privacy policy | Langwieser IT-Services e.U.',
        description: 'Privacy policy of Langwieser IT-Services e.U. – information on data processing under GDPR.'
      }
    }
  };

  function getCurrentPage() {
    var path = window.location.pathname;
    if (path.indexOf('impress') !== -1) return 'impress';
    if (path.indexOf('datenschutz') !== -1) return 'datenschutz';
    return 'index';
  }

  function resolveLang() {
    var stored = localStorage.getItem('lang') || localStorage.getItem('langPref');
    if (stored === 'de' || stored === 'en') {
      if (!localStorage.getItem('lang') && localStorage.getItem('langPref')) {
        localStorage.setItem('lang', stored);
      }
      return stored;
    }
    return navigator.language && navigator.language.toLowerCase().indexOf('de') === 0 ? 'de' : 'de';
  }

  function applyI18n(lang) {
    var dict = translations[lang] || translations.de;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!dict[key]) return;
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', dict[key]);
      } else if (el.tagName === 'OPTION') {
        el.textContent = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      var btnLang = btn.getAttribute('data-set-lang');
      btn.setAttribute('aria-pressed', String(btnLang === lang));
    });

    var page = getCurrentPage();
    var meta = metaTranslations[lang] && metaTranslations[lang][page];
    if (meta) {
      document.title = meta.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', meta.description);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', meta.title);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', meta.description);
      var ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogLocale) ogLocale.setAttribute('content', lang === 'de' ? 'de_AT' : 'en_US');
    }

    // refresh theme toggle labels
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(theme);
  }

  function setLanguage(lang) {
    if (lang !== 'de' && lang !== 'en') return;
    applyI18n(lang);
  }

  /* ——— Nav ——— */
  function closeNav() {
    var panel = document.getElementById('nav-panel');
    var toggle = document.querySelector('.menu-toggle');
    if (panel) panel.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('nav-open');
  }

  function initNav() {
    var toggle = document.querySelector('.menu-toggle');
    var panel = document.getElementById('nav-panel');
    if (toggle && panel) {
      toggle.addEventListener('click', function () {
        var open = toggle.getAttribute('aria-expanded') === 'true';
        toggle.setAttribute('aria-expanded', String(!open));
        panel.classList.toggle('open', !open);
        document.body.classList.toggle('nav-open', !open);
      });
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeNav);
      });
    }

    var dropBtn = document.querySelector('.nav__dropdown-btn');
    var dropMenu = document.querySelector('.nav__dropdown-menu');
    if (dropBtn && dropMenu) {
      dropBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = dropBtn.getAttribute('aria-expanded') === 'true';
        dropBtn.setAttribute('aria-expanded', String(!open));
        dropMenu.classList.toggle('open', !open);
      });
      dropMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          dropBtn.setAttribute('aria-expanded', 'false');
          dropMenu.classList.remove('open');
        });
      });
      document.addEventListener('click', function () {
        dropBtn.setAttribute('aria-expanded', 'false');
        dropMenu.classList.remove('open');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeNav();
        if (dropBtn && dropMenu) {
          dropBtn.setAttribute('aria-expanded', 'false');
          dropMenu.classList.remove('open');
        }
      }
    });
  }

  /* ——— Contact form (Formspree AJAX) ——— */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var lang = document.documentElement.lang || 'de';
      var dict = translations[lang] || translations.de;
      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            if (status) {
              status.textContent = dict['contact.ok'];
              status.className = 'form-status form-status--ok is-visible';
            }
          } else {
            throw new Error('fail');
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = dict['contact.err'];
            status.className = 'form-status form-status--err is-visible';
          }
        });
    });

    // Prefill audience from hash / query
    var params = new URLSearchParams(window.location.search);
    var audience = params.get('audience');
    if (!audience && window.location.hash === '#leistungen-privat') audience = 'privat';
    if (!audience && window.location.hash === '#leistungen-unternehmen') audience = 'unternehmen';
    var select = form.querySelector('#audience');
    if (select && audience) {
      if (audience === 'privat' || audience === 'private') select.value = 'privat';
      if (audience === 'unternehmen' || audience === 'business') select.value = 'unternehmen';
    }

    document.querySelectorAll('[data-audience]').forEach(function (el) {
      el.addEventListener('click', function () {
        var val = el.getAttribute('data-audience');
        var s = document.querySelector('#audience');
        if (s && val) s.value = val;
      });
    });
  }

  /* ——— Boot ——— */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(current === 'dark' ? 'light' : 'dark');
      });
    });

    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-set-lang'));
      });
    });

    applyI18n(resolveLang());
    initNav();
    initContactForm();
  });

  // Expose for debugging / inline needs
  window.LITS = { setLanguage: setLanguage, setTheme: setTheme };
})();
