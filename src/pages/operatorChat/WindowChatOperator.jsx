import { useChatContext } from "../../context/ChatContext";

export default function WindowChatOperator({
    conversation,
    setContentMessageOperator,
    contentMessageOperator,
}) {
    const { handleSubmit } = useChatContext();
    console.log("conversation", conversation);

    return (
        <>
            {conversation.active && conversation.messages.length
                ? conversation.messages.map((message, index) => {
                      return (
                          <div key={index}>
                              {message.messages.message}
                              {!conversation.active && (
                                  <div>
                                      Le Visiteur a quitté la conversation
                                  </div>
                              )}
                          </div>
                      );
                  })
                : ""}
            {conversation.active && conversation.messages.length >= 1 && (
                <form
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

                    <button type="submit">Envoyer</button>
                </form>
            )}
        </>
    );
}
