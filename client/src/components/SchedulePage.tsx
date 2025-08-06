import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

type Slot = {
  day: string;
  hour: string;
  subject: string;
  teacher: string;
  className: string;
};

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];

function addOneHourRange(lastHour: string) {
  const [start, end] = lastHour.split(" - ");
  const [, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  const newStartH = endH;
  const newEndH = endH + 1;
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  if (newEndH > 23) return null;
  return `${pad(newStartH)}:${pad(startM)} - ${pad(newEndH)}:${pad(endM)}`;
}

function formatDate(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const pad = (n: number) => (n < 10 ? "0" + n : n);
  return `${pad(day)}/${pad(month)}`;
}

function getSundayOfWeek(date: Date) {
  const dayOfWeek = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - dayOfWeek);
  sunday.setHours(0, 0, 0, 0);
  return sunday;
}

export function SchedulePage() {
  const { isAuth } = useAuth();
  const { register, handleSubmit, reset, setValue } = useForm<Slot>();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [editingSlot, setEditingSlot] = useState<{
    day: string;
    hour: string;
  } | null>(null);

  const [hours, setHours] = useState<string[]>([
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
  ]);

  const [baseDate, setBaseDate] = useState<Date>(new Date());

  const sunday = getSundayOfWeek(baseDate);
  const datesForDays = weekDays.map((_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return formatDate(d);
  });

  const onSubmit = (data: Slot) => {
    setSlots((prev) => [
      ...prev.filter(
        (slot) => !(slot.day === data.day && slot.hour === data.hour),
      ),
      data,
    ]);
    setEditingSlot(null);
    reset();
  };

  const onSlotClick = (day: string, hour: string) => {
    if (!isAuth) return;
    const slot = slots.find((s) => s.day === day && s.hour === hour);
    if (slot) {
      setValue("day", slot.day);
      setValue("hour", slot.hour);
      setValue("subject", slot.subject);
      setValue("teacher", slot.teacher);
      setValue("className", slot.className);
    } else {
      reset({ day, hour, subject: "", teacher: "", className: "" });
    }
    setEditingSlot({ day, hour });
  };

  const getSlot = (day: string, hour: string) =>
    slots.find((s) => s.day === day && s.hour === hour);

  const onHourChange = (index: number, value: string) => {
    setHours((h) => {
      const newHours = [...h];
      newHours[index] = value;
      return newHours;
    });
    setSlots((s) =>
      s.map((slot) =>
        slot.hour === hours[index] ? { ...slot, hour: value } : slot,
      ),
    );
  };

  const removeHour = (index: number) => {
    setHours((h) => h.filter((_, i) => i !== index));
    setSlots((s) => s.filter((slot) => slot.hour !== hours[index]));
    if (editingSlot?.hour === hours[index]) setEditingSlot(null);
  };

  const addHour = () => {
    const lastHour = hours[hours.length - 1];
    const nextHour = addOneHourRange(lastHour);
    if (nextHour) setHours((h) => [...h, nextHour]);
  };

  const onBaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.valueAsDate;
    if (newDate) setBaseDate(newDate);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Weekly Schedule</CardTitle>
          <input
            type="date"
            onChange={onBaseDateChange}
            className="border rounded px-3 py-1"
            value={baseDate.toISOString().slice(0, 10)}
          />
        </CardHeader>
        <CardContent>
          {isAuth && (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-6 gap-4 mb-6"
            >
              <select
                {...register("day", { required: true })}
                className="border rounded px-2 py-1"
                disabled={!!editingSlot}
              >
                <option value="">Select Day</option>
                {weekDays.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>

              <select
                {...register("hour", { required: true })}
                className="border rounded px-2 py-1"
                disabled={!!editingSlot}
              >
                <option value="">Select Hour</option>
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <Input
                placeholder="Subject"
                {...register("subject", { required: true })}
              />
              <Input
                placeholder="Teacher"
                {...register("teacher", { required: true })}
              />
              <Input
                placeholder="Class"
                {...register("className", { required: true })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingSlot ? "Update" : "Add"}
                </Button>
                {editingSlot && (
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEditingSlot(null);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border  text-sm table-fixed cursor-pointer">
              <thead className="">
                <tr>
                  <th className="border px-2 py-1 w-40">Hour / Day</th>
                  {weekDays.map((day, i) => (
                    <th key={day} className="border px-2 py-1">
                      <div className="flex items-center justify-center gap-1">
                        <span>{day}</span>
                        <span className="text-gray-600 text-xs font-mono">
                          {datesForDays[i]}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((hour, index) => (
                  <tr key={hour} className="">
                    <td className="border px-2 py-1 font-medium flex items-center gap-2">
                      {isAuth ? (
                        <input
                          type="text"
                          value={hour}
                          onChange={(e) => onHourChange(index, e.target.value)}
                          className="border rounded px-1 py-0.5 w-full text-sm"
                        />
                      ) : (
                        hour
                      )}
                      {isAuth && (
                        <button
                          type="button"
                          onClick={() => removeHour(index)}
                          className="text-red-600 font-bold px-2 hover:text-red-800"
                          aria-label={`Remove hour ${hour}`}
                        >
                          -
                        </button>
                      )}
                    </td>
                    {weekDays.map((day) => {
                      const slot = getSlot(day, hour);
                      return (
                        <td
                          key={day + hour}
                          className="border px-2 py-1 align-top min-h-[70px] hover:bg-amber-200"
                          onClick={() => onSlotClick(day, hour)}
                          role={isAuth ? "button" : undefined}
                          tabIndex={isAuth ? 0 : undefined}
                          onKeyDown={(e) => {
                            if (
                              isAuth &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              onSlotClick(day, hour);
                            }
                          }}
                        >
                          {slot ? (
                            <div>
                              <div>
                                <strong>Subject:</strong> {slot.subject}
                              </div>
                              <div>
                                <strong>Teacher:</strong> {slot.teacher}
                              </div>
                              <div>
                                <strong>Class:</strong> {slot.className}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {isAuth && (
                  <tr>
                    <td className="border px-2 py-1 font-medium text-center cursor-pointer">
                      <button
                        type="button"
                        onClick={addHour}
                        className="text-green-600 font-bold px-3 py-1 hover:text-green-800"
                        aria-label="Add new hour"
                      >
                        +
                      </button>
                    </td>
                    <td colSpan={weekDays.length} className="border"></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
