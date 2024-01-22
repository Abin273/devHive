import { useEffect, useState } from "react";
import ChatImage from "../../assets/chat/double-chat-bubble-icon.svg";
import { FaSearch } from "react-icons/fa";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";
import ChatRoomList from "../../components/chat/ChatRoomList";
import Message from "../../components/chat/Message";
import ChatBoxTopBar from "../../components/chat/ChatBoxTopBar";
import ChatInputBox from "../../components/chat/ChatInputBox";
import {
	getAConversationApi,
	getAllChatRoomsApi,
} from "../../axios/apiMethods/chat-service/chat";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";

import socket from "../../config/socket";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const ChatPage = () => {
	const { recepientId } = useParams();

	const candidateData: any = useSelector(
		(state: RootState) => state.candidateData.data
	);
	const [chatRooms, setchatRooms] = useState([]);

	const [message, setMessage] = useState<any>("");
	const [onlineUsers, setOnlineUsers] = useState<any>([]);

	const [currentChat, setCurrentChat] = useState([
		{ name: "abin", lastMessage: "lastMessage 1", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 2", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 3", timeStamp: "today" },
		// { name: "abin", lastMessage: "lastMessage 4", timeStamp: "today" },
		// { name: "amal", lastMessage: "lastMessage 5", timeStamp: "today" },
	]);

	const sendMessage = (message: string) => {
		const messageToSend = {
			sender: candidateData.id,
			// recipient: recipient,
			recipient: recepientId,
			text: message,
		};
		console.log("--------sending message to socket---------");
		console.log(messageToSend);
		console.log("--------sending message to socket---------");
		let result = socket.emit("sendMessage", messageToSend);
		console.log("message after send: ", result);
		console.log("--------sending message to socket---------");
	};

	// 	useEffect(() => {
	// 		(async () => {
	// 			// dispatch(setLoading());
	// 			const chatRooms = await getAllChatRoomsApi(candidateData.id);
	// 			console.log("chatRooms", chatRooms);
	// 			setchatRooms(chatRooms.data);
	// 			// dispatch(setLoaded());
	// 		})();
	// 	}, []);

	useEffect(() => {
		// Establish the connection when the component mounts
		socket.connect();

		// Clean up the connection when the component unmounts
		return () => {
			socket.disconnect();
		};
	}, []); // The empty dependency array ensures that the effect runs only once on mount


	useEffect(() => {
		console.log("in socket io addAUser useEffect");
		socket.emit("addActiveUser", candidateData.id);
		socket.emit("createChatRoom", candidateData.id, recepientId);
		socket.on("getActiveUsers", (users) => {

			setOnlineUsers(users);
		});
		socket.on("getAllChatRooms", (rooms) => {
			setchatRooms(rooms);
		});
		console.log(socket); // Ensure that the socket is created here
	}, [candidateData?._id]);

	useEffect(() => {
		// Listen for "currentChat" events and update the currentChat state
		socket.on("sendMessage", (payload) => {
			setCurrentChat([...currentChat, payload]);
		});

		socket.on("connect_error", (error) => {
			console.error("Socket.IO connection error:", error);
		});

		// Clean up the event listener when the component unmounts
		return () => {
			socket.off("sendMessage");
		};
	}, [currentChat]); // Include 'chat' in the dependency array to update the effect when 'chat' changes

	// 	const [recipient, setRecipient] = useState("");

	const getConversation = async (roomId: string) => {
		const conversation = await getAConversationApi(roomId);
		console.log("conversation", conversation);
		setCurrentChat(conversation.data);
	};

	// 	// useEffect(() => {
	// 	// 	if (sendMessage !== null) {
	// 	// 	  socket.emit("send-message", sendMessage);
	// 	// 	}
	// 	//   }, [sendMessage]);

	console.log("onlineUsers are --->>>", onlineUsers);
	console.log("chatRooms are --->>>", chatRooms);

	const isUserOnline = (chatRoom: any) =>{
		console.log("isUserOnline ",chatRoom.users);
		console.log("candidate ",candidateData.id);
		
		const otherValue = chatRoom.users.filter((value: string) => value !== candidateData.id);
		console.log("otherValue",otherValue);
		
		return otherValue.length>0
	}

	const getReceiver = (chatRoom: any) =>{
		console.log(" getReceiver  ",chatRoom.users);
		console.log("candidate ",candidateData.id);
		
		const otherUser = chatRoom.users.filter((value: string) => value !== candidateData.id);
		console.log("otherValue",otherUser);
		
		return otherUser
	}

	return (
		<>
			<NavBarCandidate />
			<div className="bg-white  h-[92vh] flex justify-center items-center">
				<div className="bg-slate-200 h-max-[88vh] w-[90vw] flex rounded-md">
					{/* Left */}
					<div className=" bg-slate-50 w-2/6 flex-col rounded-l-lg p-4 flex gap-2 ">
						<div className="rounded-3xl gap-2 bg-white p-3 flex items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
							<FaSearch />
							<input
								type="text"
								placeholder="search"
								className="h-6 border-transparent w-full focus:outline-none"
							/>
						</div>
						<div className="rounded-3xl gap-2 bg-white p-3 flex-grow items-center">
							{chatRooms.length === 0 ? (
								<div className="text-center">
									<h3>no chat rooms found</h3>
								</div>
							) : (
								chatRooms.map((chatRoom) => (
									<ChatRoomList user={getReceiver(chatRoom)} isOnline= {isUserOnline(chatRoom)} />
								))
							)}
						</div>
					</div>

					{/* Right */}
					<div className="chat-area bg-slate-50 flex-4 w-5/6 p-4 rounded-r-lg">
						{currentChat.length === 0 ? (
							<div className="flex justify-center items-center p-4 min-h-[80vh] max-h-[80vh]">
								<img className="h-52" src={ChatImage} alt="" />
							</div>
						) : (
							<div className="flex flex-col gap-3">
								<div>
									<ChatBoxTopBar user={currentChat[0]} />
								</div>
								<div className="bg-red-200 p-4 min-h-[60vh] max-h-[60vh] overflow-y-scroll shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
									{currentChat.map(
										(message: any, index: number) => (
											<Message
												key={index}
												message={message}
											/>
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

// return (
// 	<div className="flex flex-col h-screen">
// 		<header className="bg-gray-800 text-white p-4">
// 			<h1 className="text-2xl font-semibold">Chatting App</h1>
// 		</header>

// 		<div className="flex-1 p-4 overflow-y-auto">
// 			<div className="Chat-container space-y-4">
// 				{currentChat.map((msg: any, index: any) => (
// 					<p
// 						key={index}
// 						className={`p-2 rounded ${
// 							msg.isMyMessage
// 								? "bg-blue-500 text-white"
// 								: "bg-gray-200 text-black"
// 						}`}
// 					>
// 						{msg.message}
// 					</p>
// 				))}
// 			</div>
// 		</div>

// 		<form onSubmit={sendMessage} className="bg-gray-200 p-4">
// 			<div className="flex gap-5">
// 				{" "}
// 				<input
// 					type="text"
// 					name="chat"
// 					placeholder="Send text"
// 					value={message}
// 					onChange={(e) => setMessage(e.target.value)}
// 					className="w-full p-2 border rounded"
// 				/>
// 				<button
// 					type="submit"
// 					className="bg-blue-500  text-white p-2 rounded"
// 				>
// 					Send
// 				</button>
// 			</div>
// 		</form>
// 	</div>
// );
