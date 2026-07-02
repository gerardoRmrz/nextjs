"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  if (type === "success") {
    return <div className="notification notification-success">{message}</div>;
  } else {
    return <div className="notification notification-fail">{message}</div>;
  }
}
