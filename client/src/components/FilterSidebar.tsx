import { X, Clock, Apple, Leaf, Drumstick, AlertCircle } from "lucide-react";
import { useEffect } from "react";

type FilterState = {
  time: string[];
  type: string[];
};

type FilterSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
};

const timeOptions = [
  {
    label: "Under 15 minutes",
    icon: <Clock className="w-4 h-4 text-green-600" />,
  },
  {
    label: "15–30 minutes",
    icon: <Clock className="w-4 h-4 text-green-600" />,
  },
  {
    label: "30–60 minutes",
    icon: <Clock className="w-4 h-4 text-green-600" />,
  },
  { label: "Over 1 hour", icon: <Clock className="w-4 h-4 text-green-600" /> },
];

const typeOptions = [
  { label: "Kosher", icon: <Apple className="w-4 h-4 text-green-600" /> },
  { label: "Vegan", icon: <Leaf className="w-4 h-4 text-green-600" /> },
  { label: "Vegetarian", icon: <Leaf className="w-4 h-4 text-green-600" /> },
  {
    label: "Meat-based",
    icon: <Drumstick className="w-4 h-4 text-green-600" />,
  },
  {
    label: "Gluten-free",
    icon: <AlertCircle className="w-4 h-4 text-green-600" />,
  },
];

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  setFilters,
}: FilterSidebarProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleOption = (category: "time" | "type", value: string) => {
    const updated = filters[category].includes(value)
      ? filters[category].filter((v) => v !== value)
      : [...filters[category], value];

    const newFilters = { ...filters, [category]: updated };
    setFilters(newFilters);

    // Optional: send to API
    // fetch("/api/recipes/filter", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newFilters),
    // });
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#1e1e2f] shadow-2xl rounded-r-md transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Filters
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      <div className="p-5 space-y-7">
        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            <Clock className="w-6 h-6 text-green-600" />
            Preparation Time
          </h3>
          <div className="space-y-3">
            {timeOptions.map(({ label, icon }) => (
              <label
                key={label}
                className="flex items-center gap-3 cursor-pointer text-gray-700 dark:text-gray-300 text-sm"
              >
                <input
                  type="checkbox"
                  checked={filters.time.includes(label)}
                  onChange={() => toggleOption("time", label)}
                  className="w-5 h-5 accent-green-600 dark:accent-green-400"
                />
                {icon}
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            <Apple className="w-6 h-6 text-green-600" />
            Food Type
          </h3>
          <div className="space-y-3">
            {typeOptions.map(({ label, icon }) => (
              <label
                key={label}
                className="flex items-center gap-3 cursor-pointer text-gray-700 dark:text-gray-300 text-sm"
              >
                <input
                  type="checkbox"
                  checked={filters.type.includes(label)}
                  onChange={() => toggleOption("type", label)}
                  className="w-5 h-5 accent-green-600 dark:accent-green-400"
                />
                {icon}
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
