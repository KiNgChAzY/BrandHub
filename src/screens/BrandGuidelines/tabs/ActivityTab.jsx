import React from "react";
import { Layers, Type, Send, Download, CheckCircle } from "lucide-react";

export default function ActivityTab() {
  const activities = [
    {
      icon: Layers,
      iconColor: "blue",
      action: "Primary logo",
      verb: "updated",
      by: "Sam", // PLACEHOLDER: User names - replace with actual user data
      time: "2 days ago", // PLACEHOLDER: Timestamps - connect to actual activity timestamps
    },
    {
      icon: Type,
      iconColor: "orange",
      action: "Typography",
      verb: "defined",
      by: "Kaelynn",
      time: "Jan 14",
    },
    {
      icon: Send,
      iconColor: "purple",
      action: "Brand guide",
      verb: "shared with",
      by: "marketing@company.com",
      time: "Yesterday",
    },
    {
      icon: Download,
      iconColor: "gray",
      action: "Downloads",
      verb: "updated",
      by: "Sam", // PLACEHOLDER: User names - replace with actual user data
      time: "Jan 10",
    },
    {
      icon: CheckCircle,
      iconColor: "green",
      action: "Brand status",
      verb: "changed to",
      by: "Stable",
      time: "Jan 9",
      badge: true,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:px-12 md:py-12 flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-foreground">Activity</h3>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Track recent changes and updates to the brand guide.
        </p>
      </section>
      <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
        {activities.map((activity, idx) => {
          const getColorClasses = (color) => {
            const classes = {
              blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30",
              orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-100 dark:border-orange-800/30",
              purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/30",
              gray: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
              green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800/30",
            };
            return classes[color] || classes.blue;
          };
          return (
            <div key={idx} className="group flex items-center gap-4 p-5 border-b border-border last:border-0 hover:bg-muted transition-colors">
              <div className={`size-10 rounded-full flex items-center justify-center shrink-0 border ${getColorClasses(activity.iconColor)}`}>
                <activity.icon className="h-5 w-5" />
              </div>
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <p className="text-sm text-foreground truncate">
                <span className="font-bold">{activity.action}</span> {activity.verb}{" "}
                {activity.badge ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 uppercase tracking-wide ml-1">
                    {activity.by}
                  </span>
                ) : (
                  <>
                    by <span className="font-semibold text-muted-foreground">{activity.by}</span>
                  </>
                )}
              </p>
              <span className="text-xs font-medium text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          </div>
          );
        })}
      </div>
      <div className="h-12"></div>
    </div>
  );
}
