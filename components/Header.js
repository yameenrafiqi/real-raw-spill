import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const adminPass = localStorage.getItem("adminPass");
    setIsLoggedIn(!!adminPass);
    
    if (adminPass) {
      fetchNotifications();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}`, {
        method: "PUT",
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
      });
      fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getNotificationText = (notification) => {
    if (notification.type === "like") {
      return `${notification.userName} liked "${notification.postTitle}"`;
    } else {
      return `${notification.userName} commented on "${notification.postTitle}": "${notification.comment?.substring(0, 50)}${notification.comment?.length > 50 ? '...' : ''}"`;
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <header className="bg-black text-white border-b-4 md:border-b-8 border-yellow-400 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-3 md:py-6">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl sm:text-2xl md:text-4xl tracking-tighter hover:text-yellow-400 transition-colors transform hover:scale-105 inline-block"
            style={{ fontFamily: "'Permanent Marker', cursive" }}
          >
            RAWSPILL
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 font-black text-[10px] sm:text-xs md:text-base border-2 bg-black text-white border-white hover:bg-white hover:text-black transition-all transform hover:scale-105"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[8px] sm:text-[10px] font-black rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border-4 border-black shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="bg-yellow-400 border-b-4 border-black p-3 flex justify-between items-center sticky top-0">
                      <h3 className="font-black text-black text-sm">NOTIFICATIONS</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs px-2 py-1 bg-black text-white font-black hover:bg-gray-800"
                        >
                          MARK ALL READ
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500 text-sm">
                          No notifications yet
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-3 border-b-2 border-gray-200 ${!notification.read ? 'bg-yellow-50' : 'bg-white'} hover:bg-gray-50`}
                          >
                            <Link
                              href={`/posts/${notification.postSlug}`}
                              onClick={() => {
                                setShowNotifications(false);
                                if (!notification.read) markAsRead(notification._id);
                              }}
                              className="block"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    {notification.type === "like" ? (
                                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                      </svg>
                                    )}
                                    {!notification.read && (
                                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    )}
                                  </div>
                                  <p className="text-sm text-black font-medium">
                                    {getNotificationText(notification)}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {getTimeAgo(notification.timestamp)}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      markAsRead(notification._id);
                                    }}
                                    className="text-xs px-2 py-1 bg-gray-200 text-black font-black hover:bg-gray-300"
                                  >
                                    READ
                                  </button>
                                )}
                              </div>
                            </Link>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <Link 
              href="/" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/articles" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/articles" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Articles
            </Link>
            <Link 
              href="/about" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/about" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/contact" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Contact
            </Link>
            <Link 
              href="/admin" 
              className={`px-1.5 sm:px-2 md:px-4 py-1.5 sm:py-2 font-black uppercase text-[10px] sm:text-xs md:text-base border-2 transition-all transform hover:scale-105 ${
                router.pathname === "/admin" 
                  ? "bg-yellow-400 text-black border-yellow-400" 
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
