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
        <>
            <h1>Visiteur</h1>
            {!isOpen && (
                <button onClick={() => createConversation("visitor")}>
                    Lancer une conversation
                </button>
            )}
            {isOpen && conversation && (
                <div>
                    <div>
                        Bienvenue{" "}
                        <button
                            onClick={() => closeConversation(conversation._id)}
                        >
                            Close
                        </button>
                    </div>
                    <div>
                        {conversation.messages &&
                            conversation.messages.map((message, index) => {
                                return (
                                    <div key={index}>
                                        {message.messages.message}
                                    </div>
                                );
                            })}
                    </div>
                    <form
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
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            )}
        </>
    );
}
