import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { motion, AnimatePresence } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
  Bell,
  Heart,
  Activity,
} from "lucide-react"

type NotificationType =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "health"
  | "alarm"
  | "activity"

interface Notification {
  id: string
  message: string
  type: NotificationType
  title?: string
  duration?: number
  priority?: "low" | "medium" | "high"
}

type NotificationContextType = {
  success: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  health: (
    message: string,
    title?: string,
    priority?: "low" | "medium" | "high"
  ) => void
  alarm: (
    message: string,
    title?: string,
    priority?: "low" | "medium" | "high"
  ) => void
  activity: (message: string, title?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

const NotificationItem: React.FC<{
  notification: Notification
  onRemove: (id: string) => void
}> = ({ notification, onRemove }) => {
  const {
    id,
    type,
    message,
    title,
    duration = type === "alarm" ? null : 4000,
    priority,
  } = notification

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => onRemove(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onRemove])

  const getTypeStyles = () => {
    const baseStyles = {
      success: {
        icon: CheckCircle,
        bg: "bg-emerald-500",
        text: "text-emerald-50",
      },
      error: { icon: AlertCircle, bg: "bg-rose-500", text: "text-rose-50" },
      warning: {
        icon: AlertTriangle,
        bg: "bg-amber-500",
        text: "text-amber-50",
      },
      info: { icon: Info, bg: "bg-sky-500", text: "text-sky-50" },
      health: { icon: Heart, bg: "bg-pink-500", text: "text-pink-50" },
      alarm: { icon: Bell, bg: "bg-purple-500", text: "text-purple-50" },
      activity: { icon: Activity, bg: "bg-indigo-500", text: "text-indigo-50" },
    }[type]

    const Icon = baseStyles.icon
    return { ...baseStyles, Icon }
  }

  const styles = getTypeStyles()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`${styles.bg} rounded-lg shadow-lg shadow-black/5 w-64 overflow-hidden`} // Uklonjena klasa backdrop-blur-sm
    >
      <div className="px-4 py-3">
        <div className="flex items-start gap-3">
          <div className={`${styles.text} mt-0.5`}>
            <styles.Icon size={18} />
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <h3
                className={`${styles.text} font-medium text-sm flex items-center gap-2`}
              >
                {title}
                {priority && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs bg-white/20`}
                  >
                    {priority}
                  </span>
                )}
              </h3>
            )}
            <p className={`${styles.text} text-sm mt-1 opacity-90`}>
              {message}
            </p>
          </div>
          <button
            onClick={() => onRemove(id)}
            className={`${styles.text} opacity-60 hover:opacity-100 transition-opacity`}
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id">) => {
    setNotifications((prev) =>
      [{ ...notification, id: uuidv4() }, ...prev].slice(0, 5)
    )
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const success = (message: string, title?: string) =>
    addNotification({ message, type: "success", title })

  const error = (message: string, title?: string) =>
    addNotification({ message, type: "error", title })

  const info = (message: string, title?: string) =>
    addNotification({ message, type: "info", title })

  const warning = (message: string, title?: string) =>
    addNotification({ message, type: "warning", title })

  const health = (
    message: string,
    title?: string,
    priority: "low" | "medium" | "high" = "low"
  ) => addNotification({ message, type: "health", title, priority })

  const alarm = (
    message: string,
    title?: string,
    priority: "low" | "medium" | "high" = "high"
  ) =>
    addNotification({
      message,
      type: "alarm",
      title,
      priority,
      duration: undefined,
    })

  const activity = (message: string, title?: string) =>
    addNotification({ message, type: "activity", title })

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        info,
        warning,
        health,
        alarm,
        activity,
      }}
    >
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider")
  return context
}
