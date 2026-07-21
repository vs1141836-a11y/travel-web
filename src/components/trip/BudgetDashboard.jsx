import React from "react";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis 
} from "recharts";
import { DollarSign, Wallet, AlertTriangle, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";
import Card from "../ui/Card";

const COLORS = {
  stay: "#E5A93C",     // Amber/gold
  food: "#818CF8",     // Indigo-400
  activity: "#34D399", // Emerald-400
  transport: "#38BDF8",// Sky-400
  shopping: "#F472B6"  // Pink-400
};

const BudgetDashboard = ({ trip }) => {
  const symbol = trip?.currencySymbol || "$";
  const budget = trip?.localBudget || trip?.budget || 0;
  const estimated = trip?.totalEstimatedCost || 0;
  const remaining = budget - estimated;
  const percentage = budget > 0 ? Math.min(100, Math.round((estimated / budget) * 100)) : 0;
  const isOver = estimated > budget;

  // Process Category Totals
  const categoryTotals = { stay: 0, food: 0, activity: 0, transport: 0 };
  const dailyTotals = [];

  if (trip?.days && Array.isArray(trip.days)) {
    trip.days.forEach((day, index) => {
      let dayCost = 0;
      if (day.activities && Array.isArray(day.activities)) {
        day.activities.forEach((act) => {
          const cost = act.estimatedCost || 0;
          const cat = act.category || "activity";
          categoryTotals[cat] = (categoryTotals[cat] || 0) + cost;
          dayCost += cost;
        });
      }
      dailyTotals.push({
        name: `Day ${index + 1}`,
        cost: dayCost,
      });
    });
  }

  const pieData = Object.keys(categoryTotals)
    .map((cat) => ({
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      value: categoryTotals[cat],
      color: COLORS[cat] || "#A1A1AA",
    }))
    .filter((d) => d.value > 0);

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
        <div>
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <Wallet size={12} />
            Trip Financial Planner
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-0.5">
            Budget Overview & Cost Breakdown
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Track category spending, remaining funds, and day-by-day cost velocity.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span className="text-xs font-bold text-zinc-300">
            {remaining >= 0 ? `Under Budget by ${symbol}${remaining.toLocaleString()}` : `Over Budget by ${symbol}${Math.abs(remaining).toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-zinc-800 flex flex-col gap-1.5 p-5">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Total Allocated Budget</span>
          <span className="text-2xl font-black text-white">{symbol}{budget.toLocaleString()}</span>
        </Card>
        
        <Card className="border border-zinc-800 flex flex-col gap-1.5 p-5">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Estimated Total Expenses</span>
          <span className={`text-2xl font-black ${isOver ? "text-red-400" : "text-brand-accent"}`}>
            {symbol}{estimated.toLocaleString()}
          </span>
        </Card>

        <Card className="border border-zinc-800 flex flex-col gap-1.5 p-5">
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Remaining Balance</span>
          <span className={`text-2xl font-black ${remaining >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            {remaining >= 0 ? "" : "-"}{symbol}{Math.abs(remaining).toLocaleString()}
          </span>
        </Card>

        <Card className="border border-zinc-800 flex flex-col justify-between p-5">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
            <span className="text-zinc-500">Spent Percentage</span>
            <span className={isOver ? "text-red-400" : "text-brand-accent"}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800 mt-2">
            <div 
              className={`h-full transition-all duration-500 ${isOver ? "bg-red-500" : "bg-brand-accent"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </Card>
      </div>

      {isOver && (
        <div className="bg-red-950/30 border border-red-900/50 text-red-400 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertTriangle size={16} className="shrink-0" />
          <span>Your estimated trip expenses exceed the allocated budget by <strong>{symbol}{(estimated - budget).toLocaleString()}</strong>. Consider adjusting lodging or activities.</span>
        </div>
      )}

      {/* Recharts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution (Pie Chart) */}
        <Card className="border border-zinc-800 p-6 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp size={16} className="text-brand-accent" /> Expenses by Category
          </h4>
          {pieData.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-zinc-500 text-xs">
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
                      contentStyle={{ backgroundColor: "#09090B", borderColor: "#27272A", borderRadius: "12px", fontSize: "12px" }}
                      itemStyle={{ color: "#FFF" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Legends */}
              <div className="w-1/2 flex flex-col gap-3 pl-4">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-zinc-300 font-medium truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-white shrink-0">{symbol}{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Daily Spending Breakdown (Bar Chart) */}
        <Card className="border border-zinc-800 p-6 flex flex-col gap-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Wallet size={16} className="text-brand-accent" /> Daily Expenditure Velocity
          </h4>
          {dailyTotals.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-zinc-500 text-xs">
              No daily logs available.
            </div>
          ) : (
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyTotals} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: "#A1A1AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#A1A1AA", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{ backgroundColor: "#09090B", borderColor: "#27272A", borderRadius: "12px", fontSize: "12px" }}
                    itemStyle={{ color: "#FFF" }}
                  />
                  <Bar dataKey="cost" fill="#E5A93C" radius={[6, 6, 0, 0]} />
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
