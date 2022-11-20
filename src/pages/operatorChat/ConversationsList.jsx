import { useState } from "react";
import ArchiveConversation from "./ArchiveConversation";
import WindowChatOperator from "./WindowChatOperator";

export default function ConversationList({
    conversation,
    setConversation,
    setContentMessageOperator,
    contentMessageOperator,
    convIsOpen,
    setConvIsOpen,
    allConversations,
    archiveIsOpen,
    setArchiveIsOpen,
    archiveListing,
    setArchiveListing,
}) {
    return (
        <>
            <div className="window-chat operator">
                {" "}
                <div className="header-operator">
                    {allConversations && (
                        <ArchiveConversation
                            allConversations={allConversations}
                            setConvIsOpen={setConvIsOpen}
                            convIsOpen={convIsOpen}
                            setConversation={setConversation}
                            archiveIsOpen={archiveIsOpen}
                            setArchiveIsOpen={setArchiveIsOpen}
                            archiveListing={archiveListing}
                            setArchiveListing={setArchiveListing}
                        />
                    )}
                </div>
                <div className="conversation-operator-container">
                    {!archiveListing &&
                    conversation &&
                    conversation.messages.length ? (
                        <>
                            <div className="conversationsSide">
                                <div
                                    className="conversation-card"
                                    onClick={() => {
                                        setConvIsOpen(false);
                                        setArchiveIsOpen(false);
                                        setConversation(conversation);
                                        setConvIsOpen(true);
                                    }}
                                >
                                    {
                                        conversation.messages[
                                            conversation.messages.length - 1
                                        ].message
                                    }
                                </div>
                            </div>
                            {convIsOpen && (
                                <WindowChatOperator
                                    conversation={conversation}
                                    setContentMessageOperator={
                                        setContentMessageOperator
                                    }
                                    contentMessageOperator={
                                        contentMessageOperator
                                    }
                                />
                            )}
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
