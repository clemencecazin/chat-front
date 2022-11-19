import { useChatContext } from "../../context/ChatContext";

export default function WindowChat({
    isOpen,
    conversation,
    setContentMessage,
    contentMessage,
}) {
    const { createConversation, closeConversation, handleSubmit } =
        useChatContext();

    return (
        <div className="window-chat visitor">
            <h1>Visiteur</h1>
            {!isOpen && (
                <button
                    className="button-create-conversation"
                    onClick={() => createConversation("visitor")}
                >
                    Lancer une conversation
                </button>
            )}
            {isOpen && conversation && (
                <div className="conversation-visitor-container">
                    <div className="conversation-visitor-header">
                        Bienvenue{" "}
                        <button
                            onClick={() => closeConversation(conversation._id)}
                        >
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <ul className="conversation-visitor-body">
                        {conversation.messages &&
                            conversation.messages.map((message, index) => {
                                return (
                                    <li
                                        className={
                                            message.messages.sender ===
                                            "visitor"
                                                ? "conversation-visitor-message"
                                                : "conversation-operator-message"
                                        }
                                        key={index}
                                    >
                                        {message.messages.message}
                                    </li>
                                );
                            })}
                    </ul>
                    <form
                        className="conversation-visitor-form"
                        onSubmit={(e) =>
                            handleSubmit(e, conversation._id, "visitor")
                        }
                    >
                        <input
                            value={contentMessage}
                            placeholder="..."
                            type="text"
                            onChange={(e) => setContentMessage(e.target.value)}
                        />
                        {contentMessage && (
                            <button type="submit">Envoyer</button>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}
