import { notFound } from "next/navigation";
import { TEMPLATES } from "@/lib/templates-data";
import { TemplateLivePreview } from "@/components/template-live-preview";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return TEMPLATES.map((t) => ({ id: t.id }));
}

export default async function TemplatePreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const template = TEMPLATES.find((t) => t.id === id);

  if (!template) {
    notFound();
  }

  return <TemplateLivePreview template={template} />;
}

