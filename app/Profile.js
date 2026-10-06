import Image from "next/image";
import { papers, text } from "./content";

const LANGS = [
  { code: "en", label: "EN", href: "/", hrefLang: "en" },
  { code: "zh", label: "中文", href: "/zh", hrefLang: "zh-CN" },
  { code: "pt", label: "PT", href: "/pt", hrefLang: "pt-BR" },
];

const EMAIL = "antonio.couto@sga.pucminas.br";
const EMAIL_PERMANENT = "antonionetodev@yahoo.com";

const Section = ({ id, title, children }) => (
  <section id={id} aria-labelledby={`${id}-title`} className="mt-10 scroll-mt-6">
    <h2 id={`${id}-title`} className="text-xl font-semibold text-slate-900 border-b border-slate-200 pb-2 mb-4">
      {title}
    </h2>
    {children}
  </section>
);

const Entry = ({ what, when, detail }) => (
  <li>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
      <span className="font-medium text-slate-900">{what}</span>
      <span className="text-sm text-slate-500 sm:whitespace-nowrap">{when}</span>
    </div>
    <p className="mt-1 text-slate-700">{detail}</p>
  </li>
);

const Profile = ({ lang }) => {
  const t = text[lang];
  const navigation = [
    ["about", t.aboutTitle],
    ["publications", t.pubsTitle],
    ["education", t.educationTitle],
    ["experience", t.experienceTitle],
    ["contact", t.contactTitle],
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <a href="#main" className="skip-link">{t.skipLabel}</a>
      <main id="main" className="mx-auto max-w-3xl bg-white px-6 py-6 sm:py-10 sm:px-10 sm:my-8 sm:rounded-lg sm:border sm:border-slate-200">
        <header>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <nav aria-label={t.sectionsLabel} className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {navigation.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="text-slate-700 hover:text-blue-700 hover:underline">{label}</a>
              ))}
            </nav>
            <nav className="flex shrink-0 justify-end gap-4 text-sm" aria-label={t.languageLabel}>
              {LANGS.map((l) =>
                l.code === lang ? (
                  <span key={l.code} aria-current="page" className="font-semibold text-slate-900">
                    {l.label}
                  </span>
                ) : (
                  <a key={l.code} href={l.href} hrefLang={l.hrefLang} className="text-blue-700 underline">
                    {l.label}
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="mt-6 flex items-center gap-4 sm:gap-5">
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border border-slate-200">
              <Image src="/profile_picture.jpeg?v=6891" alt={t.name} fill sizes="240px" className="object-cover" style={{ objectPosition: "50% 4%", transform: "scale(2)", transformOrigin: "50% 20%" }} priority />
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{t.name}</h1>
              <p className="mt-1 text-sm sm:text-base text-slate-700">{t.headline}</p>
            </div>
          </div>
          <p className="mt-3 text-sm sm:text-base text-slate-600">{t.tagline}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-700">
            <a href={`mailto:${EMAIL}`} className="break-all text-blue-700 underline">
              {EMAIL}
            </a>
            <a href={t.cvHref} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
              {t.cv}
            </a>
            <a href="https://github.com/nietus" className="text-blue-700 underline">
              GitHub
            </a>
          </div>
        </header>

        <Section id="about" title={t.aboutTitle}>
          {t.about.map((p, i) => (
            <p key={i} className="mb-3 leading-relaxed">
              {p}
            </p>
          ))}
        </Section>

        <Section id="interests" title={t.interestsTitle}>
          <ul className="list-disc space-y-1 pl-5">
            {t.interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section id="publications" title={t.pubsTitle}>
          <p className="mb-5 text-sm text-slate-600">{t.pubsNote}</p>
          <ol className="space-y-6 divide-y divide-slate-200">
            {papers.map((p) => (
              <li key={p.id} className="pt-6 first:pt-0">
                <h3 className="font-semibold leading-snug">
                  <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    {lang === "pt" ? p.titleOriginal : p.titleEn}
                  </a>
                </h3>
                <p className="mt-1 text-sm italic text-slate-600">
                  {t.originalLabel}: {lang === "pt" ? p.titleEn : p.titleOriginal}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {p.authors.map((a, i) => (
                    <span key={a}>
                      {i === p.me ? <strong>{a}</strong> : a}
                      {i < p.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p className="text-sm text-slate-700">
                  {p.venue}, {p.year} ·{" "}
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-medium text-slate-700">
                    {t.statusLabel[p.status]}
                  </span>
                </p>
                <p className="mt-1">{p.result[lang]}</p>
                <p className="mt-1 text-sm">
                  <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                    {t.pdfLabel}
                  </a>
                  {p.code && (
                    <>
                      {" · "}
                      <a href={p.code} className="text-blue-700 underline">
                        {t.codeLabel}
                      </a>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" title={t.educationTitle}>
          <ul className="space-y-4">
            {t.education.map((e) => (
              <Entry key={e.what} {...e} />
            ))}
          </ul>
        </Section>

        <Section id="experience" title={t.experienceTitle}>
          <ul className="space-y-4">
            {t.experience.map((e) => (
              <Entry key={e.what} {...e} />
            ))}
          </ul>
        </Section>

        <Section id="projects" title={t.projectsTitle}>
          <ul className="space-y-3">
            {t.projects.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="font-medium text-blue-700 underline">
                  {p.title}
                </a>
                <p className="text-slate-700">{p.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title={t.skillsTitle}>
          <dl className="grid gap-y-4 sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-6 sm:gap-y-3">
            {t.skills.map((s) => {
              const separator = s.search(/[:：]/);
              return (
                <div key={s} className="grid gap-y-1 sm:contents">
                  <dt className="font-medium text-slate-900">{s.slice(0, separator)}</dt>
                  <dd className="min-w-0 text-slate-700">{s.slice(separator + 1).trim()}</dd>
                </div>
              );
            })}
          </dl>
        </Section>

        <Section id="contact" title={t.contactTitle}>
          <p className="text-sm">
            <a href={`mailto:${EMAIL}`} className="break-all text-blue-700 underline">
              {EMAIL}
            </a>
          </p>
          <p className="text-sm">
            <a href={`mailto:${EMAIL_PERMANENT}`} className="break-all text-blue-700 underline">
              {EMAIL_PERMANENT}
            </a>
          </p>
          <p className="mt-2 text-sm">
            <a href="https://github.com/nietus" className="text-blue-700 underline">
              github.com/nietus
            </a>
            {lang !== "zh" && (
              <>
                {" · "}
                <a href="https://www.linkedin.com/in/antonioniet/" className="text-blue-700 underline">
                  LinkedIn
                </a>
              </>
            )}
          </p>
        </Section>

        <footer className="mt-10 border-t border-slate-200 pt-4 text-sm text-slate-500">
          © {t.name} · {t.footer}
        </footer>
      </main>
    </div>
  );
};

export default Profile;
