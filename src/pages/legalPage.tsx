import { ArrowLeft, FileText, Mail, MessagesSquare, Phone, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SiteFooter } from '@/components/ui/siteFooter';
import { useEffect } from 'react';

type LegalPageProps = {
  type: 'impressum' | 'datenschutz';
};

const sectionClass = 'mt-10 border-t border-slate-100 pt-8 first:mt-0 first:border-0 first:pt-0';
const subheadingClass = 'mb-3 mt-7 text-lg font-bold text-slate-900 first:mt-0';

function LegalHeader({ type }: LegalPageProps) {
  const isPrivacy = type === 'datenschutz';
useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

  return (
    <header className="mb-10">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-red-200 hover:text-[#E3000F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E3000F] focus-visible:ring-offset-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Zur Anmeldung
      </Link>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#E3000F] shadow-sm ring-1 ring-red-100">
          {isPrivacy ? <ShieldCheck className="h-6 w-6" /> : <Scale className="h-6 w-6" />}
        </div>
        <div>
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-[#E3000F]">
            LKJIV-Forum Berlin
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            {isPrivacy ? 'Datenschutzerklärung' : 'Impressum'}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {isPrivacy
              ? 'Informationen zum Schutz Ihrer personenbezogenen Daten bei der Nutzung dieses Angebots.'
              : 'Transparente Informationen zum Anbieter und zur Kontaktaufnahme.'}
          </p>
        </div>
      </div>
    </header>
  );
}

function ImpressumContent() {
  return (
    <div className="divide-y divide-slate-100">
      <section className={sectionClass}>
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-[#E3000F]" />
          <h2 className="text-xl font-bold text-slate-900">Anbieter</h2>
        </div>
        <p className="mt-5 leading-8 text-slate-700">
          <strong className="font-bold text-slate-900">Kinder- und Jugendparlament Charlottenburg-Wilmersdorf</strong>
          <br />
          Geschäftsstelle des KJP / Bezirksamt Charlottenburg-Wilmersdorf von Berlin
          <br />
          Otto-Suhr-Allee 100, Raum 427c
          <br />
          10585 Berlin
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={subheadingClass}>Vertreten durch</h2>
        <p className="leading-7 text-slate-700">
          Die Geschäftsleitung des Kinder- und Jugendparlaments Charlottenburg-Wilmersdorf
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className={subheadingClass}>Kontakt</h2>
        <div className="grid gap-3 text-slate-700 sm:grid-cols-2">
          <a className="flex items-center gap-3 transition-colors hover:text-[#E3000F]" href="tel:+4930902917007">
            <Phone className="h-4 w-4 text-[#E3000F]" />
            030 / 9029-14007
          </a>
          <a className="flex items-center gap-3 transition-colors hover:text-[#E3000F]" href="mailto:info@kjp.charlottenburg-wilmersdorf.de">
            <Mail className="h-4 w-4 text-[#E3000F]" />
            info@kjp.charlottenburg-wilmersdorf.de
          </a>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className={subheadingClass}>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
        <p className="leading-7 text-slate-700">
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className={`${sectionClass} rounded-2xl bg-slate-50/80 px-5 py-6 sm:px-6`}>
        <h2 className="mb-3 text-lg font-bold text-slate-900">Anmeldeformular für Gremien &amp; Termine</h2>
        <p className="leading-7 text-slate-700">
          Wenn Sie sich über unser Anmeldeformular für einen Termin registrieren, werden die von Ihnen eingegebenen Daten zwecks Bearbeitung der Event-Organisation und für den Fall von Rückfragen bei uns gespeichert.
        </p>
        <p className="mt-5 font-bold text-slate-900">Verarbeitete Datenkategorien:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-700">
          <li>Bezirk und Gremium-Bezeichnung</li>
          <li>Name der Ansprechperson &amp; Kontaktdaten (E-Mail-Adresse)</li>
          <li>Anzahl sowie Namen der teilnehmenden Jugendlichen und Begleitpersonen</li>
          <li>Ausgewählte Termine und optionale Anmerkungen/Notizen</li>
        </ul>
        <p className="mt-5 leading-7 text-slate-700">
          <strong className="text-slate-900">Rechtsgrundlage:</strong> Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen bzw. Erfüllung von Teilnahmevereinbarungen).
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          <strong className="text-slate-900">Speicherdauer:</strong> Die von Ihnen im Anmeldeformular eingegebenen Daten verbleiben bei uns, bis der Zweck für die Datenspeicherung entfällt (z. B. nach vollständiger Abwicklung des Termins / Events, spätestens jedoch nach 30 Tagen), Sie uns zur Löschung auffordern oder Ihre Einwilligung zur Speicherung widerrufen.
        </p>
      </section>
    </div>
  );
}

function DatenschutzContent() {
  return (
    <div className="divide-y divide-slate-100">
      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-slate-900">1. Datenschutz auf einen Blick</h2>
        <h3 className={subheadingClass}>Allgemeine Hinweise</h3>
        <p className="leading-7 text-slate-700">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
        <h3 className={subheadingClass}>Datenerfassung auf dieser Website</h3>
        <h4 className="mb-2 mt-5 font-bold text-slate-900">Wie erfassen wir Ihre Daten?</h4>
        <p className="leading-7 text-slate-700">
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, zum Beispiel durch Eingaben in das Anmeldeformular. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Dazu gehören insbesondere technische Daten wie Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs.
        </p>
        <h4 className="mb-2 mt-5 font-bold text-slate-900">Wofür nutzen wir Ihre Daten?</h4>
        <p className="leading-7 text-slate-700">
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Die übermittelten Daten werden außerdem für die Organisation der Termine und die Bearbeitung von Rückfragen verarbeitet.
        </p>
        <h4 className="mb-2 mt-5 font-bold text-slate-900">Welche Rechte haben Sie?</h4>
        <p className="leading-7 text-slate-700">
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie können außerdem die Berichtigung oder Löschung verlangen, eine Einwilligung mit Wirkung für die Zukunft widerrufen und unter bestimmten Umständen die Einschränkung der Verarbeitung verlangen. Zudem besteht ein Beschwerderecht bei der zuständigen Aufsichtsbehörde.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-slate-900">2. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 className={subheadingClass}>Datenschutz</h3>
        <p className="leading-7 text-slate-700">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wir weisen darauf hin, dass die Datenübertragung im Internet, zum Beispiel bei der Kommunikation per E-Mail, Sicherheitslücken aufweisen kann.
        </p>
        <h3 className={subheadingClass}>Hinweis zur verantwortlichen Stelle</h3>
        <p className="leading-7 text-slate-700">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <address className="mt-4 not-italic leading-8 text-slate-700">
          <strong className="text-slate-900">Kinder- und Jugendparlament Charlottenburg-Wilmersdorf</strong>
          <br />
          Otto-Suhr-Allee 100, Raum 427c
          <br />
          10585 Berlin
          <br />
          Telefon: <a className="text-[#E3000F] hover:underline" href="tel:+4930902917007">030 / 9029-14007</a>
          <br />
          E-Mail: <a className="text-[#E3000F] hover:underline" href="mailto:info@kjp.charlottenburg-wilmersdorf.de">info@kjp.charlottenburg-wilmersdorf.de</a>
        </address>
        <h3 className={subheadingClass}>Speicherdauer</h3>
        <p className="leading-7 text-slate-700">
          Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe für die Speicherung bestehen.
        </p>
        <h3 className={subheadingClass}>Rechtsgrundlagen</h3>
        <p className="leading-7 text-slate-700">
          Sofern Sie eingewilligt haben, erfolgt die Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, ist Art. 6 Abs. 1 lit. b DSGVO die Rechtsgrundlage. Die Verarbeitung kann außerdem zur Erfüllung einer rechtlichen Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO) oder aufgrund eines berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO) erfolgen.
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-slate-900">3. Ihre Rechte</h2>
        <div className="space-y-5 leading-7 text-slate-700">
          <p><strong className="text-slate-900">Widerruf Ihrer Einwilligung:</strong> Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.</p>
          <p><strong className="text-slate-900">Auskunft, Berichtigung und Löschung:</strong> Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.</p>
          <p><strong className="text-slate-900">Einschränkung der Verarbeitung:</strong> Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, wenn Sie deren Richtigkeit bestreiten, die Verarbeitung unrechtmäßig ist, wir die Daten nicht mehr benötigen oder Sie Widerspruch eingelegt haben und die Interessen noch nicht abgewogen sind.</p>
          <p><strong className="text-slate-900">Beschwerderecht:</strong> Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.</p>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-bold text-slate-900">4. Datenerfassung auf dieser Website</h2>
        <h3 className={subheadingClass}>Anmeldeformular für Gremien &amp; Termine</h3>
        <p className="leading-7 text-slate-700">
          Wenn Sie sich über unser Anmeldeformular für einen Termin registrieren, werden die von Ihnen eingegebenen Daten zwecks Bearbeitung der Event-Organisation und für den Fall von Rückfragen bei uns gespeichert. Verarbeitet werden Bezirk und Gremium-Bezeichnung, Name und Kontaktdaten der Ansprechperson, die Anzahl und Namen der Teilnehmenden, ausgewählte Termine sowie optionale Notizen.
        </p>
        <p className="mt-4 leading-7 text-slate-700">
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden spätestens 30 Tage nach vollständiger Abwicklung des Termins / Events gelöscht, sofern keine andere rechtliche Grundlage für eine weitere Speicherung besteht.
        </p>
        <h3 className={subheadingClass}>Server-Log-Dateien</h3>
        <p className="leading-7 text-slate-700">
          Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dazu gehören Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO und dient der technisch fehlerfreien Darstellung und Optimierung der Website.
        </p>
        <h3 className={subheadingClass}>Anfragen per E-Mail oder Telefon</h3>
        <p className="leading-7 text-slate-700">
          Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens gespeichert und verarbeitet. Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck für die Datenspeicherung entfällt. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
        </p>
      </section>

      <section className="mt-10 rounded-2xl bg-red-50/70 px-5 py-6 ring-1 ring-red-100 sm:px-6">
        <p className="flex items-start gap-3 leading-7 text-slate-700">
          <MessagesSquare className="mt-1 h-5 w-5 shrink-0 text-[#E3000F]" />
          <span>Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden: <a className="font-semibold text-[#E3000F] hover:underline" href="mailto:info@kjp.charlottenburg-wilmersdorf.de">info@kjp.charlottenburg-wilmersdorf.de</a>.</span>
        </p>
      </section>
    </div>
  );
}

export default function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === 'datenschutz';

  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[18%] -right-[12%] h-[60%] w-[65%] rounded-full bg-red-100/40 blur-3xl opacity-60" />
        <div className="absolute -bottom-[20%] -left-[12%] h-[55%] w-[58%] rounded-full bg-orange-100/30 blur-3xl opacity-60" />
      </div>

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-8 md:py-12">
        <LegalHeader type={type} />
        <article className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl shadow-slate-200/50 backdrop-blur-md sm:p-10 md:p-14">
          {isPrivacy ? <DatenschutzContent /> : <ImpressumContent />}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}