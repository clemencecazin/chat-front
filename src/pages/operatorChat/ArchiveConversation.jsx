import { useState } from "react";
import WindowChatOperator from "./WindowChatOperator";

export default function ArchiveConversation({
    allConversations,
    setConvIsOpen,
    convIsOpen,
    archiveIsOpen,
    setArchiveIsOpen,
    archiveListing,
    setArchiveListing,
}) {
    const [archiveConversation, setArchiveConversation] = useState();
    const [active, setActive] = useState(false);

    return (
        <div className="archives">
            <h1>Opérateur</h1>

            {!archiveListing ? (
                <button
                    onClick={() => {
                        setConvIsOpen(false);
                        setArchiveListing(true);
                    }}
                >
                    Accéder aux archives
                </button>
            ) : (
                <button
                    onClick={() => {
                        setArchiveListing(false);
                        setConvIsOpen(true);
                    }}
                >
                    Retour à la conversation
                </button>
            )}

            {archiveListing &&
                (!allConversations.length ||
                    !allConversations.find((conv) => !conv.active)) && (
                    <div className="no-archive-msg">
                        Actuellement aucune archive
                    </div>
                )}

            {!convIsOpen && archiveListing && (
                <div className="archives-listing">
                    <ul>
                        {allConversations &&
                            allConversations.map((conversation, index) => {
                                return (
                                    !conversation.active && (
                                        <li
                                            key={index}
                                            className={`${"conversation-card"} ${
                                                conversation._id ===
                                                    active.id && "active"
                                            }`}
                                            onClick={() => {
                                                setArchiveIsOpen(false);
                                                setArchiveConversation(
                                                    conversation
                                                );
                                                setArchiveIsOpen(true);
                                                setActive({
                                                    id: conversation._id,
                                                });
                                            }}
                                        >
                                            {
                                                conversation.messages[
                                                    conversation.messages
                                                        .length - 1
                                                ].message
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
