import { Bell, CalendarCheck2, CalendarX2, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotifications } from "../hooks/useNotifications";
import type { NotificationItem } from "../types/notification.types";

function NotificationIcon({ type }: { type: string }) {
  if (type.includes("BookingConfirmed")) return <CalendarCheck2 className="size-4" />;
  if (type.includes("BookingCancelled")) return <CalendarX2 className="size-4" />;
  if (type.includes("Reminder")) return <Clock3 className="size-4" />;
  return <Bell className="size-4" />;
}

function NotificationRow({ notification }: { notification: NotificationItem }) {
  const unread = !notification.read_at;

  return (
    <li className={`flex gap-3 px-4 py-3 ${unread ? "bg-blue-50/60" : ""}`}>
      <span
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          unread ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-slate-500"
        }`}
      >
        <NotificationIcon type={notification.type} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`truncate text-sm ${
              unread ? "font-semibold text-slate-900" : "font-medium text-slate-700"
            }`}
          >
            {notification.data.title || "Notification"}
          </p>
          {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />}
        </div>
        <p className="mt-0.5 text-[13px] leading-5 text-slate-500">
          {notification.data.message}
        </p>
        <time className="mt-1 block text-xs text-gray-400" dateTime={notification.created_at}>
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </time>
      </div>
    </li>
  );
}

export default function NotificationsMenu() {
  const { data, isPending, isError, refetch } = useNotifications();

  const notifications = data?.data ?? [];
  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[#F5F6F8] text-slate-700 transition hover:bg-slate-100"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-xs font-medium text-blue-600">{unreadCount} new</span>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {isPending && (
            <div className="flex flex-col gap-4 p-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <p className="text-sm text-slate-600">Failed to load notifications</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          {!isPending && !isError && notifications.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <Bell className="h-6 w-6 text-gray-300" />
              <p className="text-sm text-slate-500">No notifications yet</p>
            </div>
          )}

          {!isPending && !isError && notifications.length > 0 && (
            <ul>
              {notifications.map((n) => (
                <NotificationRow key={n.id} notification={n} />
              ))}
            </ul>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
