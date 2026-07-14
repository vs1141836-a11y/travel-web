import React from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis 
} from "recharts";
import Card from "../ui/Card";

const COLORS = {
  stay: "#E5A93C",     // Amber/gold
  food: "#818CF8",     // Indigo-400
  activity: "#34D399", // Emerald-400
  transport: "#38BDF8" // Sky-400
};

const BudgetDashboard = ({ trip }) => {
  const budget = trip.localBudget || trip.budget || 0;
  const estimated = trip.totalEstimatedCost || 0;
  const percentage = budget > 0 ? Math.min(100, Math.round((estimated / budget) * 100)) : 0;
  const isOver = estimated > budget;

  // Process Category Totals
  const categoryTotals = { stay: 0, food: 0, activity: 0, transport: 0 };
  const dailyTotals = [];

  trip.days.forEach((day, index) => {
    let dayCost = 0;
    day.activities.forEach((act) => {
      const cost = act.estimatedCost || 0;
      categoryTotals[act.category] = (categoryTotals[act.category] || 0) + cost;
      dayCost += cost;
    });
    dailyTotals.push({
      name: `Day ${index + 1}`,
      cost: dayCost,
    });
  });

  const pieData = Object.keys(categoryTotals)
    .map((cat) => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: categoryTotals[cat],
      color: COLORS[cat],
    }))
    .filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-8 w-full select-none">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-zinc-900 flex flex-col gap-2">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Total Budget</span>
          <span className="text-3xl font-bold font-sans">{trip.currencySymbol || "$"}{budget}</span>
        </Card>
        
        <Card className="border border-zinc-900 flex flex-col gap-2">
          <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Estimated Expenses</span>
          <span className={`text-3xl font-bold font-sans ${isOver ? "text-red-400" : "text-white"}`}>
            {trip.currencySymbol || "$"}{estimated}
          </span>
        </Card>

        <Card className="border border-zinc-900 flex flex-col justify-center">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="text-zinc-500">Budget Spent</span>
            <span className={isOver ? "text-red-400 font-bold" : "text-brand-accent font-bold"}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${isOver ? "bg-red-500" : "bg-brand-accent"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </Card>
      </div>

      {isOver && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-xs font-medium">
          ⚠️ Your estimated trip expenses exceed the allocated budget by <strong>{trip.currencySymbol || "$"}{estimated - budget}</strong>. Consider adjusting daily activity costs.
        </div>
      )}

      {/* Recharts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
        {/* Cost Category Distribution (Pie Chart) */}
        <Card className="border border-zinc-900 p-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-wide border-b border-zinc-900 pb-3">Expenses by Category</h3>
          {pieData.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-zinc-500 text-xs font-light">
              No expenses cataloged yet.
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-between">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#18181B", borderColor: "#27272A", borderRadius: "8px" }}
                      itemStyle={{ color: "#FFF" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Legends */}
              <div className="w-1/2 flex flex-col gap-3.5 pl-6">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-zinc-400 font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold font-sans text-white">{trip.currencySymbol || "$"}{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Daily Spending Breakdown (Bar Chart) */}
        <Card className="border border-zinc-900 p-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold tracking-wide border-b border-zinc-900 pb-3">Daily Expenditure</h3>
          {dailyTotals.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-zinc-500 text-xs font-light">
              No daily logs available.
            </div>
          ) : (
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTotals} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{ backgroundColor: "#18181B", borderColor: "#27272A", borderRadius: "8px" }}
                    itemStyle={{ color: "#FFF" }}
                  />
                  <Bar dataKey="cost" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BudgetDashboard;
