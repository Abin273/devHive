import express from "express";

import { chatControllers, userControllers } from "../../../controllers";
import { DependenciesData } from "../../types/dependencyInterface";
import {
	requireAuthAdmin,
	requireAuthCandidate,
	requireAuthRecruiter,
} from "@abijobportal/common";

export const chatRouter = (dependencies: DependenciesData) => {
	const router = express.Router();

	// const {
	// 	// getAllChatRoomsByUserIDController,
	// 	// getChatRoomWithRoomIdController,
	// 	// sendNewMessageController,
	// 	// createChatRoomController,
	// } = userControllers(dependencies);

	const {
		getAllChatRoomsByUserIDController,
	} = chatControllers(dependencies);

	router.get(
		"/chat-rooms/:userId",
		getAllChatRoomsByUserIDController  
	);

	// router.get("/get-a-chat-room/:chatRoomId", getChatRoomWithRoomIdController);

	// router.post("/new-message/:roomId", sendNewMessageController);

	// router.post(
	// 	"/create-chat-room/:currentUserId/:secondPersonId",
	// 	createChatRoomController
	// );

	return router;
};
