"use client";

import { useState } from "react";

const GRID_COLUMNS = 3;
const GRID_ROWS = 3;
const CELL_WIDTH = 280;
const CELL_HEIGHT = 170;
const SVG_WIDTH = GRID_COLUMNS * CELL_WIDTH;
const SVG_HEIGHT = GRID_ROWS * CELL_HEIGHT;

const cells = [
  {
    title: "Customer Segments",
    bullets: ["Lawyers", "Law firms", "Law students", "Corporate legal teams", "Consumers"],
    position: { col: 0, row: 0 },
  },
  {
    title: "Value Props",
    bullets: [
      "Legal-only trust",
      "Transparent pricing",
      "GDPR & security",
      "Tools & community",
    ],
    position: { col: 1, row: 0 },
  },
  {
    title: "Channels",
    bullets: ["Web & mobile", "Partnerships", "Universities", "Law firms"],
    position: { col: 2, row: 0 },
  },
  {
    title: "Relationships",
    bullets: ["Verified profiles", "Guided onboarding", "Membership tiers"],
    position: { col: 0, row: 1 },
  },
  {
    title: "Revenue",
    bullets: [
      "Memberships",
      "Advertising",
      "~5% platform fee",
      "Future legal insurance",
    ],
    position: { col: 1, row: 1 },
  },
  {
    title: "Key Activities",
    bullets: ["Platform development", "Acquisition & marketing", "Compliance operations"],
    position: { col: 2, row: 1 },
  },
  {
    title: "Key Partners",
    bullets: ["Firms", "Universities", "Legal-tech platforms", "Payments & security"],
    position: { col: 0, row: 2 },
  },
  {
    title: "Key Resources",
    bullets: ["Product & dev team", "Legal expertise", "Infrastructure"],
    position: { col: 1, row: 2 },
  },
  {
    title: "Cost Structure",
    bullets: ["Development & hosting", "Marketing", "Compliance", "Staff & operations"],
    position: { col: 2, row: 2 },
  },
] as const;

function CanvasSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      className={className}
      role="img"
      aria-labelledby="bmc-title"
    >
      <title id="bmc-title">LawLink business model canvas</title>
      <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="var(--color-surface)" stroke="var(--color-border)" />
      {Array.from({ length: GRID_COLUMNS - 1 }).map((_, index) => {
        const x = CELL_WIDTH * (index + 1);
        return <line key={`v-${index}`} x1={x} y1={0} x2={x} y2={SVG_HEIGHT} stroke="var(--color-border)" strokeWidth={1} />;
      })}
      {Array.from({ length: GRID_ROWS - 1 }).map((_, index) => {
        const y = CELL_HEIGHT * (index + 1);
        return <line key={`h-${index}`} x1={0} y1={y} x2={SVG_WIDTH} y2={y} stroke="var(--color-border)" strokeWidth={1} />;
      })}
      {cells.map((cell) => {
        const x = cell.position.col * CELL_WIDTH + 20;
        const y = cell.position.row * CELL_HEIGHT + 30;
        return (
          <g key={cell.title} transform={`translate(${x}, ${y})`}>
            <text fontSize={16} fontWeight={600} fill="var(--color-foreground)">
              {cell.title}
            </text>
            {cell.bullets.map((bullet, index) => (
              <text
                key={bullet}
                x={0}
                y={28 + index * 20}
                fontSize={13}
                fill="var(--color-muted)"
              >
                • {bullet}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export default function BmcCanvas() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="bmc" className="space-y-8">
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Business model snapshot
        </h2>
        <p className="mt-3 text-lg text-muted">
          A concise look at how LawLink creates, delivers, and captures value—ready to explore and download soon.
        </p>
      </header>
      <div className="rounded-3xl border border-border bg-surface/80 p-6 shadow-soft">
        <CanvasSvg className="h-auto w-full" />
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent-soft"
            onClick={() => setIsExpanded(true)}
          >
            Expand & Download PNG
          </button>
        </div>
      </div>

      {isExpanded ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bmc-modal-title"
        >
          <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl border border-border bg-surface p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <h3 id="bmc-modal-title" className="text-xl font-semibold text-foreground">
                LawLink Business Model Canvas
              </h3>
              <button
                type="button"
                className="rounded-full border border-border px-3 py-1 text-sm font-medium text-foreground hover:bg-accent-soft"
                onClick={() => setIsExpanded(false)}
              >
                Close
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              PNG export is coming soon. For now, review the expanded canvas here.
            </p>
            <div className="mt-4 rounded-2xl border border-border bg-background p-4">
              <CanvasSvg className="h-auto w-full" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
