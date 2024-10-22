import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import TopNavBarCandidate from "../../components/navBar/TopNavBarCandidate";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import {
    getACandidateConversationApi,
    getAllCandidateChatRoomsApi,
} from "../../axios/apiMethods/chat-service/chat";
import {
    getARecrutierConversationApi,
    getAllRecruiterChatRoomsApi,
} from "../../axios/apiMethods/chat-service/chat";
import { RootState } from "../../redux/reducer";
import socket from "../../config/socket";
import { deleteCandidatesAllNotificationsBySenderIdApi } from "../../axios/apiMethods/chat-service/notification";
import { deleteRecruitersAllNotificationsBySenderIdApi } from "../../axios/apiMethods/chat-service/notification";
import { CONSTANTS } from "../../utils/constants";
import {
    clearCurrentlySelectedChatRoom,
    setCurrentlySelectedChatRoom,
} from "../../redux/slice/chat";

const ChatPage = () => {
    const dispatch = useDispatch();
    const { recepientId } = useParams();

    const userData: any = useSelector(
        (store: RootState) => store.userReducer.authData
    );

    const myProfile: any = useSelector((state: RootState) => {
        return state.userReducer.myProfile;
    });

    // const otherUserProfile: any = useSelector((state: RootState) => {
    //     return state.userReducer.otherUserProfile;
    // });

    const [chatRooms, setchatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<any>([]);
    const [selectedChatRoomMessages, setSelectedChatRoomMessages] =
        useState<any>([]);

    const chatAreaRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedChatRoomMessages]);

    useEffect(() => {
        // Establish the connection when the component mounts
        socket.connect();

        // Clean up the connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Check if the page is being refreshed
        const handleBeforeUnload = (event: any) => {
            event.preventDefault();
            // Dispatch the action to clear the currently selected chat room
            dispatch(clearCurrentlySelectedChatRoom());
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        socket.emit("addActiveUser", userData.id);
        socket.on("getActiveUsers", (users) => {
            setOnlineUsers(users);
        });
    }, [userData?._id]);

    useEffect(() => {
        socket.emit("createChatRoom", userData.id, recepientId);
        socket.on("getAllChatRooms", (rooms) => {
            setchatRooms(rooms);
        });
    }, [selectedChatRoom, selectedChatRoomMessages]);

    useEffect(() => {
        socket.on("chatNotification", () => {
            (async () => {
                let rooms = null;
                if (userData && userData.role === "candidate") {
                    rooms = await getAllCandidateChatRoomsApi(userData.id);
                }

                if (userData && userData.role === "recruiter") {
                    rooms = await getAllRecruiterChatRoomsApi(userData.id);
                }

                if (rooms) setchatRooms(rooms.data);
            })();
        });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off("chatNotification");
            dispatch(clearCurrentlySelectedChatRoom());
        };
    }, []);

    useEffect(() => {
        // Listen for "selectedChatRoomMessages" events and update the selectedChatRoomMessages state
        socket.on("receiveMessage", (message) => {
            if (selectedChatRoom?._id != message.result.roomId.toString()) {
                // console.error("no chat rooms are selected");
            }
            if (message.result.roomId.toString() === selectedChatRoom?._id) {
                if (message.result.senderId.toString() != userData.id) {
                    socket.emit("markAsRead", message.result.id);
                }
                setSelectedChatRoomMessages([
                    ...selectedChatRoomMessages,
                    message.result,
                ]);
            } else {
                setSelectedChatRoomMessages([...selectedChatRoomMessages]);
            }
        });

        socket.on("connect_error", (error) => {
            console.error("Socket.IO connection error:", error);
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("sendMessage");
            // socket.off("receiveMessage");
        };
        // Include 'selectedChatRoomMessages' in the dependency array to update the effect when
        // 'selectedChatRoomMessages' changes
    }, [selectedChatRoomMessages]);

    const sendMessage = (message: string) => {
        const messageToSend = {
            senderId: userData?.id,
            roomId: selectedChatRoom?._id,
            textMessage: message,
        };

        socket.emit("sendMessage", messageToSend);
    };

    const handleChatRoomClick = async (room: any) => {
        setSelectedChatRoom(room);

        dispatch(setCurrentlySelectedChatRoom(room));
        const conversations =
            userData.role === "candidate"
                ? await getACandidateConversationApi(room._id)
                : await getARecrutierConversationApi(room._id);

        const senderId = getReceiver(room); // to find the other user
        userData.role === "candidate"
            ? await deleteCandidatesAllNotificationsBySenderIdApi(
                  senderId?._id
              )
            : await deleteRecruitersAllNotificationsBySenderIdApi(
                  senderId?._id
              );

        setSelectedChatRoomMessages(conversations.data);
    };

    const isUserOnline = (chatRoom: any) => {
        const otherValue = chatRoom.users.filter(
            (value: any) => value._id !== userData.id
        );

        for (let i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i]?.userId == otherValue[0]?._id) {
                return true;
            }
        }
        return false;
    };

    const getReceiver = (chatRoom: any) => {
        const otherUser = chatRoom.users.find(
            (value: any) => value._id !== userData?.id
        );
        return otherUser;
    };

    return (
        <>
            {userData && userData.role === "candidate" && (
                <TopNavBarCandidate />
            )}
            <div className="bg-white  h-[92vh] flex justify-center items-center">
                <div className="bg-slate-200 h-max-[88vh] w-[90vw] flex rounded-md">
                    {/* Left */}
                    <div className=" bg-slate-50 w-2/6 flex-col rounded-l-lg p-4 flex gap-2 ">
                        <div className="rounded-3xl gap-2 bg-white p-3 flex-grow items-center">
                            {chatRooms.length === 0 ? (
                                <div className="text-center">
                                    <h3>no chat rooms found</h3>
                                </div>
                            ) : (
                                chatRooms.map(
                                    (chatRoom: any, index: number) => (
                                        <ChatRoomList
                                            key={index}
                                            currentUser={userData}
                                            receiver={getReceiver(chatRoom)}
                                            isOnline={isUserOnline(chatRoom)}
                                            lastMessage={chatRoom?.lastMessage}
                                            lastMessageTime={chatRoom.updatedAt}
                                            onClick={() =>
                                                handleChatRoomClick(chatRoom)
                                            }
                                            selected={
                                                selectedChatRoom?._id ===
                                                chatRoom?._id
                                            } // Adjust this line as needed
                                        />
                                    )
                                )
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div className="chat-area bg-slate-50 flex-4 w-5/6 p-4 rounded-r-lg">
                        {selectedChatRoom === null ? (
                            <div className="flex justify-center items-center p-4 min-h-[80vh] max-h-[80vh]">
                                <img className="h-52" src={ChatImage} alt="" />
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <div>
                                    <ChatBoxTopBar
                                        userImage={
                                            myProfile && myProfile.profileImage
                                                ? myProfile.profileImage
                                                : CONSTANTS.CANDIDATE_DEFAULT_PROFILE_IMAGE
                                        }
                                        // chatRoom={selectedChatRoom}
                                        isOnline={isUserOnline(
                                            selectedChatRoom
                                        )}
                                        receiver={getReceiver(selectedChatRoom)}
                                        handleBackButtonClick={undefined}
                                    />
                                </div>
                                {/* chat box message area */}
                                <div
                                    className="bg-red-300 min-h-[58vh] max-h-[58vh] p-5 overflow-x-scroll "
                                    ref={chatAreaRef}
                                >
                                    {selectedChatRoomMessages.length == 0 ? (
                                        <div className="text-center">
                                            no messages send yet
                                        </div>
                                    ) : (
                                        selectedChatRoomMessages.map(
                                            (message: any, index: number) => (
                                                <Message
                                                    senderImage={
                                                        myProfile &&
                                                        myProfile.profileImage
                                                            ? myProfile.profileImage
                                                            :  userData.role === "candidate"? CONSTANTS.CANDIDATE_DEFAULT_PROFILE_IMAGE:  CONSTANTS.RECRUITER_DEFAULT_PROFILE_IMAGE
                                                    }
                                                    receiver={getReceiver(selectedChatRoom)}
                                                    key={index}
                                                    message={message}
                                                    userId={userData.id}
                                                />
                                            )
                                        )
                                    )}
                                </div>

                                <div className="bottom-bar mb-0">
                                    <ChatInputBox onSend={sendMessage} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatPage;
