import { Mail, Phone, Calendar, Clock, Trash2, CheckCircle, XCircle, MessageSquare, CircleCheckBig } from "lucide-react";

export function AdminCards({ _id, name, email, phone, date, time, message, status, onRefresh, showDeleteOnly }) {
  
  async function updateStatus(action) {
    const res = await fetch(`http://localhost:3000/user/${action}/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      if (onRefresh) onRefresh();
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const res = await fetch(`http://localhost:3000/user/soft-delete/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) if (onRefresh) onRefresh();
    }
  };

  const handleComplete = async () => {
    if (window.confirm("Mark this appointment as completed?")) {
      const res = await fetch(`http://localhost:3000/user/complete/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) if (onRefresh) onRefresh();
    }
  };

  const getStatusStyles = () => {
    switch (status) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-100";
      case "declined":
        return "bg-red-50 text-red-700 border-red-100";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  };

  return (
    <div className="card-premium flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-slate-900 leading-tight">{name}</h3>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${getStatusStyles()}`}>
            {status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Mail size={14} className="text-slate-400" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Phone size={14} className="text-slate-400" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Calendar size={14} className="text-slate-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Clock size={14} className="text-slate-400" />
            <span>{time}</span>
          </div>
          {message && (
            <div className="pt-2 flex items-start gap-3 text-xs text-slate-500 italic bg-slate-50 p-2 rounded-lg">
              <MessageSquare size={12} className="mt-0.5 shrink-0" />
              <p className="line-clamp-2">{message}</p>
            </div>
          )}
        </div>
      </div>

      <div className={`p-4 bg-slate-50/50 border-t border-slate-100 grid ${showDeleteOnly ? 'grid-cols-1' : 'grid-cols-3'} gap-2`}>
        {showDeleteOnly ? (
          /* Completed page — only show Delete */
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 p-2 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-red-100 text-red-600"
          >
            <Trash2 size={18} />
            Delete Record
          </button>
        ) : (
          /* Active page — Accept, Decline, Mark Complete */
          <>
            <button
              onClick={() => updateStatus("accept")}
              disabled={status === "accepted"}
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-green-100 text-green-600 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <CheckCircle size={18} />
              Accept
            </button>
            <button
              onClick={() => updateStatus("decline")}
              disabled={status === "declined"}
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-amber-100 text-amber-600 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <XCircle size={18} />
              Decline
            </button>
            <button
              onClick={handleComplete}
              disabled={status !== "accepted"}
              className="flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold uppercase transition-all hover:bg-blue-100 text-blue-600 disabled:opacity-30 disabled:hover:bg-transparent"
              title={status !== "accepted" ? "Accept the appointment first before marking complete" : "Mark treatment as completed"}
            >
              <CircleCheckBig size={18} />
              Complete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
