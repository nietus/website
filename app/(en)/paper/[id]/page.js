import { notFound, permanentRedirect } from "next/navigation";
import { papers } from "../../../content";

export function generateStaticParams() {
  return papers.map((p) => ({ id: p.id }));
}

export default function PaperPage({ params }) {
  const paper = papers.find((p) => p.id === params.id);
  if (!paper) notFound();
  permanentRedirect(paper.pdf);
}