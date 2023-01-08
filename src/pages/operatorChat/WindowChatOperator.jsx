import { useState } from "react";
import { useChatContext } from "../../context/ChatContext";

export default function WindowChatOperator({
    conversation,
    setContentMessageOperator,
    contentMessageOperator,
}) {
    const { handleSubmit, deleteConversation, containerRef } = useChatContext();
    const [messageDelete, setMessageDelete] = useState(null);

    const handleDelete = (id) => {
        setMessageDelete(
            <>
                Souhaitez-vous vraiment supprimer cette conversation (elle ne
                sera pas conservée dans les archives) ?
                <span onClick={() => deleteConversation(id)}>Oui</span>{" "}
                <span onClick={() => setMessageDelete(null)}>Non</span>
            </>
        );
    };

    return conversation ? (
        <div className="conversation-operator-conversation">
            {!conversation.active && (
                <div className="conversation-operator-end">
                    <div className="conversation-operator-over">
                        Le Visiteur a quitté la conversation
                    </div>
                    <span
                        onClick={() => handleDelete(conversation._id)}
                        class="material-symbols-outlined delete"
                    >
                        delete
                    </span>
                    <div className="message-delete">{messageDelete}</div>
                </div>
            )}
            <div ref={containerRef} className="conversation-operator">
                <ul>
                    <>
                        {conversation.messages.length
                            ? conversation.messages.map((message, index) => {
                                  return (
                                      <li
                                          className={
                                              message.sender === "visitor"
                                                  ? "conversation-visitor-message"
                                                  : "conversation-operator-message"
                                          }
                                          key={index}
                                      >
                                          {message.message}
                                      </li>
                                  );
                              })
                            : ""}{" "}
                    </>
                </ul>
            </div>
            {conversation.active && conversation.messages.length >= 1 && (
                <form
                    className="conversation-visitor-form"
                    onSubmit={(e) =>
                        handleSubmit(e, conversation._id, "operator")
                    }
                >
                    <input
                        value={contentMessageOperator}
                        placeholder="..."
                        type="text"
                        onChange={(e) =>
                            setContentMessageOperator(e.target.value)
                        }
                    />

                    {contentMessageOperator && (
                        <button type="submit">Envoyer</button>
                    )}
                </form>
            )}
        </div>
    ) : (
        <p>Pas de conversation</p>
    );
}
