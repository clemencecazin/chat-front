import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import WindowChat from "../pages/visitorChat/WindowChat";
import WindowChatOperator from "../pages/operatorChat/WindowChatOperator";
import axios from "axios";
import { useEffect } from "react";
import ConversationList from "../pages/operatorChat/ConversationsList";

const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [conversationActiveId, setConversationActiveId] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [message, setMessage] = useState(null);
    const [contentMessage, setContentMessage] = useState("");
    const [contentMessageOperator, setContentMessageOperator] = useState("");

    const createConversation = async (type) => {
        try {
            if (type === "visitor") {
                const res = await axios.post(
                    "http://localhost:3000/add/conversation"
                );
                setConversation(res.data);
            }

            setIsOpen(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const closeConversation = async (id) => {
        try {
            if (!conversation.messages.length) {
                await axios.delete(
                    `http://localhost:3000/delete/conversation/${id}`
                );
            } else {
                const res = await axios.put(
                    `http://localhost:3000/update/conversation/${id}`,
                    {
                        active: false,
                    }
                );
                setConversation(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
        setIsOpen(false);
    };

    const handleSubmit = async (e, id, type) => {
        console.log("contentMessageOperator", contentMessageOperator);

        try {
            setMessage(null);
            e.preventDefault();

            let messageContent;
            if (type === "operator") {
                messageContent = contentMessageOperator;
            } else {
                messageContent = contentMessage;
            }

            if (id) {
                const res = await axios.post(
                    `http://localhost:3000/add/messages?id=${id}`,
                    {
                        message: messageContent,
                        sender: type,
                    }
                );
                if (res) {
                    setMessage(res.data);
                    setContentMessage("");
                    setContentMessageOperator("");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    console.log(conversation);

    useEffect(() => {
        try {
            const getConversationMessages = async () => {
                const res = await axios.get(
                    `http://localhost:3000/conversation/${conversation._id}`
                );

                setConversation(res.data);
            };
            getConversationMessages();
        } catch (error) {
            console.log(error.message);
        }
    }, [conversationActiveId, message]);
    // const handleSubmit = async(e, type);

    return (
        <ChatContext.Provider
            value={{
                createConversation,
                closeConversation,
                handleSubmit,
            }}
        >
            {children}
            <WindowChat
                isOpen={isOpen}
                conversation={conversation}
                setContentMessage={setContentMessage}
                contentMessage={contentMessage}
            />
            <ConversationList
                conversation={conversation}
                setContentMessageOperator={setContentMessageOperator}
                contentMessageOperator={contentMessageOperator}
            />
        </ChatContext.Provider>
    );
}
