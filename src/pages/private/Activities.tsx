import { useState } from "react";
import { Calendar, Clock, User, CheckCircle, Circle, MessageSquare, FileText, Settings, Star, Activity as ActivityIcon } from "lucide-react";

interface Activity {
  id: number;
  type: "task" | "comment" | "status" | "project" | "board" | "star";
  title: string;
  description: string;
  user: string;
  userAvatar?: string;
  time: string;
  date: string;
  isRead: boolean;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "task",
      title: "Task Completed",
      description: "Marked 'API Integration' as done",
      user: "Rahul Sharma",
      time: "10:30 AM",
      date: "2024-01-20",
      isRead: false
    },
    {
      id: 2,
      type: "comment",
      title: "New Comment",
      description: "Commented on 'Design Review' - 'Looks great! Just fix the spacing.'",
      user: "Priya Patel",
      time: "09:15 AM",
      date: "2024-01-20",
      isRead: false
    },
    {
      id: 3,
      type: "status",
      title: "Status Changed",
      description: "Changed 'Bug Fixing' from 'In Progress' to 'Done'",
      user: "Amit Kumar",
      time: "Yesterday",
      date: "2024-01-19",
      isRead: true
    },
    {
      id: 4,
      type: "project",
      title: "New Project Created",
      description: "Created new project 'Frontend Development'",
      user: "Neha Gupta",
      time: "Yesterday",
      date: "2024-01-19",
      isRead: true
    },
    {
      id: 5,
      type: "board",
      title: "Board Updated",
      description: "Added new column 'Review' to Development board",
      user: "Vikram Singh",
      time: "Dec 18, 2024",
      date: "2024-12-18",
      isRead: true
    },
    {
      id: 6,
      type: "star",
      title: "Starred Project",
      description: "Starred 'Database Setup' project",
      user: "Sneha Reddy",
      time: "Dec 17, 2024",
      date: "2024-12-17",
      isRead: true
    },
    {
      id: 7,
      type: "task",
      title: "Task Assigned",
      description: "Assigned 'User Authentication' to Rajesh Khanna",
      user: "Rajesh Khanna",
      time: "Dec 16, 2024",
      date: "2024-12-16",
      isRead: true
    },
    {
      id: 8,
      type: "comment",
      title: "Mentioned in Comment",
      description: "@Rahul mentioned you in a comment on 'Security Audit'",
      user: "Team Lead",
      time: "Dec 15, 2024",
      date: "2024-12-15",
      isRead: true
    }
  ]);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "task":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "status":
        return <Circle className="h-4 w-4 text-purple-500" />;
      case "project":
        return <FileText className="h-4 w-4 text-orange-500" />;
      case "board":
        return <Settings className="h-4 w-4 text-gray-500" />;
      case "star":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <ActivityIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityBgColor = (type: Activity["type"]) => {
    switch (type) {
      case "task":
        return "bg-green-50 dark:bg-green-950/30";
      case "comment":
        return "bg-blue-50 dark:bg-blue-950/30";
      case "status":
        return "bg-purple-50 dark:bg-purple-950/30";
      case "project":
        return "bg-orange-50 dark:bg-orange-950/30";
      case "board":
        return "bg-gray-50 dark:bg-gray-950/30";
      case "star":
        return "bg-yellow-50 dark:bg-yellow-950/30";
      default:
        return "bg-gray-50 dark:bg-gray-950/30";
    }
  };

  const markAsRead = (id: number) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, isRead: true } : activity
    ));
  };

  const markAllAsRead = () => {
    setActivities(activities.map(activity => ({ ...activity, isRead: true })));
  };

  // Group activities by date
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  const unreadCount = activities.filter(a => !a.isRead).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Activities</h1>
          <p className="text-muted-foreground">Track your recent activities and updates</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      {/* Unread Badge */}
      {unreadCount > 0 && (
        <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm">
          You have {unreadCount} unread {unreadCount === 1 ? 'activity' : 'activities'}
        </div>
      )}

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-6" />
        
        {/* Activities List */}
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, dateActivities]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-2 mb-4 ml-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Activities for this date */}
              <div className="space-y-4">
                {dateActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className={`relative flex gap-3 md:gap-4 group cursor-pointer transition-all hover:bg-muted/30 p-3 rounded-lg ${
                      !activity.isRead ? 'bg-primary/5' : ''
                    }`}
                    onClick={() => markAsRead(activity.id)}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityBgColor(activity.type)} ring-4 ring-background`}>
                        {getActivityIcon(activity.type)}
                      </div>
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{activity.title}</span>
                          {!activity.isRead && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-primary text-primary-foreground">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{activity.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{activity.user}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ActivityIcon className="h-12 w-12 text-muted-foreground mb-3" />
          <h3 className="text-lg font-semibold">No activities yet</h3>
          <p className="text-sm text-muted-foreground">Your recent activities will appear here</p>
        </div>
      )}
    </div>
  );
}

// Need to import Button
import { Button } from "@/components/ui/button";