import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2 p-2">
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id);

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className="group flex items-center gap-4 p-3 rounded-xl
                       bg-white/5 backdrop-blur-md border border-white/10
                       hover:bg-cyan-500/10 hover:border-cyan-400/30
                       cursor-pointer transition-all duration-200"
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="size-12 rounded-full object-cover"
              />

              {/* Online Status */}
              <span
                className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-black
                  ${isOnline ? "bg-green-500" : "bg-gray-500"}`}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-100 font-medium truncate">
                {chat.fullName}
              </h4>
              <p className="text-xs text-slate-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;
