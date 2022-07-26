import React, { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";
import { types } from "../types/types";

export const SidebarChatItem = ({ usuario }) => {
  const { dispatch, chatState } = useContext(ChatContext);
  const { chatActivo } = chatState;
  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: usuario.uid,
    });
    if (chatActivo === usuario.uid) return;
    const resp = await fetchConToken(`mensajes/${usuario.uid}`);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.mensajes.reverse(),
    });
    scrollToBottom("mensajes");
  };

  return (
    <div
      className={[
        "chat_list",
        chatActivo === usuario.uid && "active_chat",
      ].join(" ")}
      onClick={onClick}
    >
      {/* active_chat */}
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
