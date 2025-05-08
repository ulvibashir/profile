// src/app/projects/[slug]/page.tsx
export default function ProjectPage({ params }: any) {
  return (
    <div>
      <h1>Project: {params.slug}</h1>
      <p>This is a simplified version until we fix the TypeScript issues.</p>
    </div>
  );
}