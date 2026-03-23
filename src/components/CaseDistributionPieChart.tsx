"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type PracticeArea = {
  id: string;
  name: string;
  caseCount: number;
};

type CaseDistributionPieChartProps = {
  practiceAreas: PracticeArea[];
};

const COLORS = [
  "#8b5a3c",
  "#a67c52",
  "#c49e6a",
  "#d4b88a",
  "#e4d0aa",
  "#f0e4ca",
];

export default function CaseDistributionPieChart({
  practiceAreas,
}: CaseDistributionPieChartProps) {
  if (!practiceAreas || practiceAreas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-surface/80 border border-border/60">
        <p className="text-muted">No case distribution data yet.</p>
      </div>
    );
  }

  const total = practiceAreas.reduce((sum, area) => sum + area.caseCount, 0);

  const data = practiceAreas.map((area) => ({
    name: area.name,
    value: area.caseCount,
    percentage: total > 0 ? ((area.caseCount / total) * 100).toFixed(1) : 0,
  }));

  const renderCustomLabel = ({ name, percentage }: any) => {
    return `${name}: ${percentage}%`;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} cases`, "Cases"]}
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center text-sm text-muted">
        Total cases: {total}
      </div>
    </div>
  );
}

