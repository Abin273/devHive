import express from "express";

import { chatControllers, notificationControllers } from "../../../controllers";
import { IDependency } from "../../types/dependencyInterface";
import { auth, ROLES } from "@abijobportal/common";

export const candidateRouter = (dependencies: IDependency) => {
	const router = express.Router();

	const chatController =
		chatControllers(dependencies);

	const notificationController = notificationControllers(dependencies);

	router.use(auth(ROLES.CANDIDATE))
	router.get("/chat-rooms/:userId", chatController.getAllChatRoomsByUserIDController);

	router.get("/room-conversation/:chatRoomId", chatController.getConversationController);

	router.get("/notifications/:userId", notificationController.getAllNotificationsController);

	router.get("/notifications-count/:userId", notificationController.getAllNotificationsCountController);
	
	router.post("/create", notificationController.createNotificationController);

	router.delete("/notifications/:userId", notificationController.deleteAllNotificationsController);
	
	router.delete("/delete-notifications-by-senderId/:senderId/:receiverId", notificationController.deleteAllNotificationsBySenderController);
	
	router.get("/unread-messages-count/:senderId/:receiverId", notificationController.getUnreadMessagesCountController);

	return router;
};
