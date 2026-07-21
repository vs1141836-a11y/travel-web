import React, { useState } from "react";
import { BookOpen, FileText, Clock, DollarSign, ExternalLink, CheckCircle, AlertCircle, Info, ShieldCheck, Globe, CheckSquare, Square } from "lucide-react";
import { getDestData } from "../../utils/travelData";

const VisaGuidance = ({ destination }) => {
  const [checkedDocs, setCheckedDocs] = useState({});
  const data = getDestData(destination);
  const visa = data?.visa;

  if (!visa) {
    return (
      <div className="glass p-8 rounded-2xl border border-zinc-800 text-center flex flex-col items-center gap-3">
        <BookOpen className="text-brand-accent animate-pulse" size={32} />
        <h3 className="text-lg font-bold">Checking Visa Regulations for {destination}...</h3>
        <p className="text-zinc-400 text-xs max-w-md">Retrieving official consulate rules, e-visa requirements, and passport validity guidelines.</p>
      </div>
    );
  }

  const toggleDoc = (idx) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalDocs = visa.documents?.length || 0;
  const completedDocs = Object.values(checkedDocs).filter(Boolean).length;
  const progressPct = totalDocs > 0 ? Math.round((completedDocs / totalDocs) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 p-6 rounded-2xl border border-zinc-800">
        <div>
          <span className="text-brand-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            <BookOpen size={12} />
            Official Government & VFS Visa Guidance
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-0.5">
            Visa Requirements for {data?.name || destination}
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Passport validity rules, mandatory document checklists, and application portals.
          </p>
        </div>

        {/* Status Badge */}
        <div className={`p-4 rounded-xl border flex items-center gap-3 shrink-0 ${visa.required ? "bg-amber-950/30 border-amber-900/60 text-amber-400" : "bg-emerald-950/30 border-emerald-900/60 text-emerald-400"}`}>
          {visa.required ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
          <div>
            <span className="text-[10px] font-bold uppercase block">Visa Status</span>
            <span className="text-sm font-black">{visa.required ? `Mandatory: ${visa.type}` : `Visa Free / Entry Pass`}</span>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-start gap-3">
          <Globe size={18} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Passport Validity</span>
            <p className="text-xs font-bold text-white mt-0.5">6+ Months Minimum</p>
            <span className="text-[9px] text-zinc-400">Must have 2 blank pages</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-start gap-3">
          <Clock size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Processing Time</span>
            <p className="text-xs font-bold text-white mt-0.5">{visa.processingTime || "15-30 Days"}</p>
            <span className="text-[9px] text-zinc-400">Apply 4 weeks prior</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-start gap-3">
          <DollarSign size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Government Fee</span>
            <p className="text-xs font-bold text-white mt-0.5">{visa.fee || "€80 (~₹7,200)"}</p>
            <span className="text-[9px] text-zinc-400">Excludes VFS service fee</span>
          </div>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl flex items-start gap-3">
          <ShieldCheck size={18} className="text-brand-accent shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase">Travel Insurance</span>
            <p className="text-xs font-bold text-white mt-0.5">€30,000 Medical</p>
            <span className="text-[9px] text-zinc-400">Mandatory coverage</span>
          </div>
        </div>
      </div>

      {/* Required Documents Interactive Checklist */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-brand-accent" />
              Mandatory Document Checklist
            </h4>
            <p className="text-zinc-400 text-xs mt-0.5">Check off documents as you gather them for your application.</p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
            <span className="text-xs font-bold text-zinc-300">{completedDocs} of {totalDocs} Prepared ({progressPct}%)</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-brand-accent transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {visa.documents?.map((doc, idx) => {
            const isChecked = Boolean(checkedDocs[idx]);
            return (
              <div
                key={idx}
                onClick={() => toggleDoc(idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isChecked
                    ? "bg-emerald-950/20 border-emerald-900/60 text-zinc-200"
                    : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                {isChecked ? (
                  <CheckSquare size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <Square size={16} className="text-zinc-600 shrink-0" />
                )}
                <span className={`text-xs font-medium ${isChecked ? "line-through text-zinc-400" : ""}`}>{doc}</span>
              </div>
            );
          })}
        </div>

        {/* Official Portal Button */}
        {visa.officialWebsite && (
          <div className="pt-2 border-t border-zinc-800 flex justify-end">
            <a
              href={visa.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-brand-accent hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-brand-accent/10"
            >
              <ExternalLink size={14} />
              Open Official Government Visa Portal
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaGuidance;
