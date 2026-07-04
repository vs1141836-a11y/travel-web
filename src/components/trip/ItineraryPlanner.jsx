import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Trash2, Plus, Sparkles, RefreshCw } from "lucide-react";
import Card from "../ui/Card";
import Skeleton from "../ui/Skeleton";

const CATEGORY_COLORS = {
  stay: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  food: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  activity: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  transport: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
};

const ItineraryPlanner = ({ 
  days, 
  onDragEnd, 
  onDeleteActivity, 
  onOpenAddModal, 
  onRegenerateDay,
  regeneratingDayIndex 
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Desktop Horizontal Scroll snap columns / Mobile Stacks */}
      <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto pb-4 pt-2 w-full snap-x lg:snap-mandatory scroll-smooth">
        {days.map((day, dayIdx) => {
          const isRegenerating = regeneratingDayIndex === dayIdx;
          
          return (
            <div 
              key={day._id || dayIdx} 
              className="w-full lg:w-[360px] lg:shrink-0 snap-center bg-zinc-950/40 border border-zinc-900 rounded-xl p-4 flex flex-col gap-4 min-h-[450px]"
            >
              {/* Day Header */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                <div>
                  <h3 className="font-bold text-base">Day {dayIdx + 1}</h3>
                  <span className="text-[10px] text-zinc-500 font-semibold">{day.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onRegenerateDay(dayIdx)}
                  disabled={isRegenerating}
                  className="flex items-center gap-1 text-[10px] uppercase font-bold text-zinc-400 hover:text-brand-accent transition-colors disabled:opacity-50 cursor-pointer"
                  title="Regenerate this day's AI activities"
                >
                  <RefreshCw size={12} className={isRegenerating ? "animate-spin" : ""} />
                  {isRegenerating ? "AIing..." : "Re-Gen"}
                </button>
              </div>

              {/* Activities Container */}
              {isRegenerating ? (
                <div className="flex flex-col gap-3 flex-1">
                  <Skeleton height="h-[80px]" />
                  <Skeleton height="h-[80px]" />
                  <Skeleton height="h-[80px]" />
                </div>
              ) : (
                <Droppable droppableId={dayIdx.toString()}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 max-h-[550px] min-h-[250px]"
                    >
                      {day.activities.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 text-xs py-8 border border-dashed border-zinc-900 rounded-lg">
                          No activities planned.
                        </div>
                      ) : (
                        day.activities.map((activity, actIdx) => (
                          <Draggable
                            key={activity._id || `${dayIdx}-${actIdx}`}
                            draggableId={activity._id || `${dayIdx}-${actIdx}`}
                            index={actIdx}
                          >
                            {(dragProvided) => (
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.draggableProps}
                                {...dragProvided.dragHandleProps}
                                className="group"
                              >
                                <div className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800/80 rounded-lg p-3.5 transition-all relative flex flex-col gap-2">
                                  {/* Delete Hover Reveal */}
                                  <button
                                    type="button"
                                    onClick={() => onDeleteActivity(dayIdx, actIdx)}
                                    className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-zinc-800/50 cursor-pointer"
                                  >
                                    <Trash2 size={13} />
                                  </button>

                                  <div className="flex items-start gap-2.5">
                                    <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded mt-0.5 shrink-0">
                                      {activity.time}
                                    </span>
                                    <h4 className="font-bold text-xs pr-6 leading-normal text-white">
                                      {activity.title}
                                    </h4>
                                  </div>

                                  {activity.description && (
                                    <p className="text-zinc-500 text-[10px] leading-relaxed font-light pl-0.5">
                                      {activity.description}
                                    </p>
                                  )}

                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-950/60 text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                                    <span className={`px-2 py-0.5 rounded text-[8px] ${CATEGORY_COLORS[activity.category]}`}>
                                      {activity.category}
                                    </span>
                                    {activity.duration && <span>{activity.duration}</span>}
                                    <span>${activity.estimatedCost}</span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )}

              {/* Add Activity Button */}
              <button
                type="button"
                onClick={() => onOpenAddModal(dayIdx)}
                className="w-full py-2.5 rounded-lg border border-dashed border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer mt-auto bg-zinc-950/20"
              >
                <Plus size={14} />
                Add Event
              </button>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default ItineraryPlanner;
