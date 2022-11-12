import { useState } from "react";
import WindowChat from "./WindowChatOperator";

export default function ConversationList({
    conversation,
    setContentMessageOperator,
    contentMessageOperator,
}) {
    const [convIsOpen, setConvIsOpen] = useState(false);
    return (
        <div>
            {" "}
            <h1>Opérateur</h1>
            {conversation &&
            conversation.active === true &&
            conversation.messages.length ? (
                <div onClick={() => setConvIsOpen(true)}>
                    {
                        conversation.messages[conversation.messages.length - 1]
                            .messages.message
                    }
                </div>
            ) : (
                ""
            )}
            {convIsOpen && (
                <WindowChat
                    conversation={conversation}
                    setContentMessageOperator={setContentMessageOperator}
                    contentMessageOperator={contentMessageOperator}
                />
            )}
        </div>
    );
}
