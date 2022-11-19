import { useState } from "react";
import WindowChatOperator from "./WindowChatOperator";

export default function ArchiveConversation({
    allConversations,
    setConvIsOpen,
    convIsOpen,
    setConversation,
    archiveIsOpen,
    setArchiveIsOpen,
    archiveListing,
    setArchiveListing,
}) {
    const [archiveConversation, setArchiveConversation] = useState();

    console.log(allConversations);
    return (
        <div className="archives">
            <h1>Opérateur</h1>

            {!archiveListing ? (
                <h2
                    onClick={() => {
                        setConvIsOpen(false);
                        setArchiveListing(true);
                    }}
                >
                    Archives
                </h2>
            ) : (
                <h3
                    onClick={() => {
                        setArchiveListing(false);
                        setConvIsOpen(true);
                    }}
                >
                    Retour à la conversation
                </h3>
            )}
            {!convIsOpen && archiveListing && (
                <div className="archives-listing">
                    <ul>
                        {allConversations &&
                            allConversations.map((conversation) => {
                                return (
                                    !conversation.active && (
                                        <li
                                            className="conversation-card"
                                            onClick={() => {
                                                setArchiveIsOpen(false);
                                                setArchiveConversation(
                                                    conversation
                                                );
                                                setArchiveIsOpen(true);
                                            }}
                                        >
                                            {
                                                conversation.messages[
                                                    conversation.messages
                                                        .length - 1
                                                ].messages.message
                                            }
                                        </li>
                                    )
                                );
                            })}
                    </ul>
                    {archiveIsOpen && (
                        <WindowChatOperator
                            conversation={archiveConversation}
                        />
                    )}
                </div>
            )}
        </div>
    );
}
