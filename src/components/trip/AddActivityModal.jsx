import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

const activitySchema = z.object({
  time: z.string().min(1, "Time is required (e.g. 09:00 AM)"),
  title: z.string().min(1, "Title is required"),
  description: z.string().default(""),
  estimatedCost: z.coerce.number().nonnegative("Cost must be 0 or greater").default(0),
  category: z.enum(["stay", "food", "activity", "transport"]),
  duration: z.string().default(""),
});

const AddActivityModal = ({ isOpen, onClose, onAdd }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      category: "activity",
      estimatedCost: 0,
    }
  });

  const onSubmit = (data) => {
    onAdd(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Manual Activity">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Start Time"
            id="time"
            placeholder="e.g. 09:30 AM"
            error={errors.time}
            {...register("time")}
          />
          <Input
            label="Duration"
            id="duration"
            placeholder="e.g. 2h or 45m"
            error={errors.duration}
            {...register("duration")}
          />
        </div>

        <Input
          label="Activity Title"
          id="title"
          placeholder="e.g. Eiffel Tower Summit Visit"
          error={errors.title}
          {...register("title")}
        />

        <Input
          label="Description"
          id="description"
          placeholder="e.g. Pre-booked tickets, fast pass lane"
          error={errors.description}
          {...register("description")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Estimated Cost (USD)"
            type="number"
            id="estimatedCost"
            error={errors.estimatedCost}
            {...register("estimatedCost")}
          />

          <div className="w-full flex flex-col gap-1.5 mb-4">
            <label htmlFor="category" className="text-zinc-400 text-xs font-semibold uppercase tracking-wider px-1">
              Category
            </label>
            <select
              id="category"
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-brand-accent/50"
              {...register("category")}
            >
              <option value="activity">Activity</option>
              <option value="food">Dining / Food</option>
              <option value="stay">Lodging / Stay</option>
              <option value="transport">Transit / Transport</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-zinc-900">
          <Button variant="ghost" onClick={onClose} className="py-2.5">
            Cancel
          </Button>
          <Button type="submit" variant="accent" className="py-2.5 px-6 font-semibold">
            Add Event
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddActivityModal;
