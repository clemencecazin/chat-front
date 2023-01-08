import { useState, useRef, useContext } from "react";
import { createContext } from "react";
import WindowChat from "../pages/visitorChat/WindowChatVisitor";
import WindowChatOperator from "../pages/operatorChat/WindowChatOperator";
import axios from "axios";
import { useEffect } from "react";
import ConversationList from "../pages/operatorChat/ConversationsList";

const ChatContext = createContext();

export function useChatContext() {
    return useContext(ChatContext);
}

export function ChatProvider({ children }) {
    const [isOpen, setIsOpen] = useState(
        JSON.parse(localStorage.getItem("conversation"))
    );
    const [conversation, setConversation] = useState(
        JSON.parse(localStorage.getItem("conversation"))
    );
    const [allConversations, setAllConversations] = useState(null);
    const [message, setMessage] = useState(null);
    const [contentMessage, setContentMessage] = useState("");
    const [contentMessageOperator, setContentMessageOperator] = useState("");
    const [convIsOpen, setConvIsOpen] = useState(
        JSON.parse(localStorage.getItem("conversation"))
    );
    const [archiveIsOpen, setArchiveIsOpen] = useState(false);
    const [archiveListing, setArchiveListing] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem("conversation", JSON.stringify(conversation));
        if (conversation) {
            setConversation(conversation);
        }
    }, [conversation]);

    useEffect(() => {
        if (containerRef && containerRef.current) {
            const element = containerRef.current;
            element.scroll({
                top: element.scrollHeight,
                left: 0,
                behavior: "smooth",
            });
        }
    }, [containerRef, conversation]);

    const createConversation = async (type) => {
        setConvIsOpen(false);
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

                const conv = await axios.get(
                    `http://localhost:3000/conversations`
                );

                setAllConversations(conv.data);
            }
        } catch (error) {
            console.log(error.message);
        }
        setIsOpen(false);
    };

    const deleteConversation = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/delete/conversation/${id}`
            );

            if (res.data) {
                setIsOpen(false);
                setConvIsOpen(false);
                setConversation(null);
                setArchiveIsOpen(false);

                const conv = await axios.get(
                    `http://localhost:3000/conversations`
                );

                setAllConversations(conv.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e, id, type) => {
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

            const getAllConversations = async () => {
                const res = await axios.get(
                    `http://localhost:3000/conversations`
                );

                setAllConversations(res.data);
            };

            getAllConversations();
            getConversationMessages();
        } catch (error) {
            console.log(error.message);
        }
    }, [message]);

    return (
        <ChatContext.Provider
            value={{
                createConversation,
                closeConversation,
                handleSubmit,
                deleteConversation,
                containerRef,
            }}
        >
            {children}
            <div className="container">
                <WindowChat
                    isOpen={isOpen}
                    conversation={conversation}
                    setContentMessage={setContentMessage}
                    contentMessage={contentMessage}
                />
                <ConversationList
                    conversation={conversation}
                    setConversation={setConversation}
                    setContentMessageOperator={setContentMessageOperator}
                    contentMessageOperator={contentMessageOperator}
                    convIsOpen={convIsOpen}
                    setConvIsOpen={setConvIsOpen}
                    allConversations={allConversations}
                    archiveIsOpen={archiveIsOpen}
                    setArchiveIsOpen={setArchiveIsOpen}
                    archiveListing={archiveListing}
                    setArchiveListing={setArchiveListing}
                />
            </div>
        </ChatContext.Provider>
    );
}
