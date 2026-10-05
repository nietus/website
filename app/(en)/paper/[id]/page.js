import { papers } from "../../../content";

export function generateStaticParams() {
  return papers.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const paper = papers.find((p) => p.id === params.id);
  return { title: paper ? `${paper.titleEn} | Antonio S. C. Neto` : "Paper" };
}

export default function PaperPage({ params }) {
  const paper = papers.find((p) => p.id === params.id);
  if (!paper) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-sm">
          <a href="/" className="text-blue-700 underline">
            ← Antonio S. C. Neto
          </a>
        </p>
        <h1 className="mt-3 text-xl font-semibold leading-snug text-slate-900">{paper.titleEn}</h1>
        <p className="text-sm italic text-slate-500">{paper.titleOriginal}</p>
        <p className="mt-1 text-sm text-slate-700">
          {paper.authors.join(", ")} · {paper.venue}, {paper.year}
        </p>
        <p className="mt-2 text-sm">
          <a href={paper.pdf} className="text-blue-700 underline">
            Open the PDF in its own tab
          </a>
        </p>
        <iframe
          src={paper.pdf}
          title={paper.titleEn}
          className="mt-4 h-[85vh] w-full rounded border border-slate-200 bg-white"
        />
      </main>
    </div>
  );
}
