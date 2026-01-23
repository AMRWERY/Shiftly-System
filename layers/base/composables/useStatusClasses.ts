import type { StatusType } from "../types/tables";

export const useStatusClasses = () => {
  const statusClasses: Record<StatusType, string> = {
    pending: "text-yellow-600 bg-yellow-100 hover:bg-yellow-200 capitalize",
    approved: "text-green-600 bg-green-100 hover:bg-green-200 capitalize",
    rejected: "text-red-600 bg-red-100 hover:bg-red-200 capitalize",
    cancelled: "text-gray-600 bg-gray-100 hover:bg-gray-200 capitalize",
    blocked: "bg-red-100 text-red-800 hover:bg-red-200 capitalize",
    active: "bg-green-100 text-green-800 hover:bg-green-200 capitalize",
    deactivated: "bg-gray-400 text-gray-800 hover:bg-gray-500 capitalize",
    paid: "text-green-700 bg-green-200 hover:bg-green-200 capitalize",
    failed: "text-orange-700 bg-orange-200 hover:bg-orange-200 capitalize",
    weak: "text-red-700 bg-red-200 hover:bg-red-200 capitalize",
    medium: "text-yellow-700 bg-yellow-200 hover:bg-gray-200 capitalize",
    strong: "text-green-700 bg-green-200 hover:bg-green-200 capitalize",
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
        return "bg-red-500";
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
