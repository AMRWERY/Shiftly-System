import type { StatusType } from "../types/tables";

export const useStatusClasses = () => {
  const statusClasses: Record<StatusType, string> = {
    pending: "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 capitalize",
    approved:
      "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 capitalize",
    rejected: "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 capitalize",
    cancelled: "text-gray-400 bg-gray-500/10 hover:bg-gray-500/20 capitalize",
    blocked: "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 capitalize",
    active:
      "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 capitalize",
    deactivated: "text-gray-400 bg-gray-500/10 hover:bg-gray-500/20 capitalize",
    paid: "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 capitalize",
    failed:
      "text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 capitalize",
    weak: "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 capitalize",
    medium: "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 capitalize",
    strong:
      "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 capitalize",
  };

  const getStatusClass = (status: string | undefined): string => {
    if (!status) return "";
    return status in statusClasses ? statusClasses[status as StatusType] : "";
  };

  const getStatusColor = (status: string | undefined): string => {
    switch (status) {
      case "active":
      case "approved":
      case "paid":
      case "strong":
        return "bg-green-500";
      case "blocked":
      case "rejected":
      case "weak":
        return "bg-red-400";
      case "pending":
      case "medium":
        return "bg-yellow-500";
      case "failed":
        return "bg-orange-500";
      case "cancelled":
      case "deactivated":
      default:
        return "bg-gray-500";
    }
  };

  return {
    statusClasses,
    getStatusClass,
    getStatusColor,
  };
};
