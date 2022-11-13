import { useState } from "react";
import WindowChatOperator from "./WindowChatOperator";

export default function ConversationList({
    conversation,
    setContentMessageOperator,
    contentMessageOperator,
    convIsOpen,
    setConvIsOpen,
}) {
    return (
        <div className="window-chat operator">
            {" "}
            <h1>Opérateur</h1>
            <div className="conversation-operator-container">
                {conversation && conversation.messages.length ? (
                    <>
                        <div
                            className="conversation-card"
                            onClick={() => setConvIsOpen(true)}
                        >
                            {
                                conversation.messages[
                                    conversation.messages.length - 1
                                ].messages.message
                            }
                        </div>
                        {convIsOpen && (
                            <WindowChatOperator
                                conversation={conversation}
                                setContentMessageOperator={
                                    setContentMessageOperator
                                }
                                contentMessageOperator={contentMessageOperator}
                            />
                        )}
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
