import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		repositories: { notificationsRepository },
	} = dependencies;

	if (!notificationsRepository) {
		throw new Error("notificationsRepository should exist in dependencies");
	}

	const execute =(userId: string) => {
        console.log("in get all notifications usecase",userId);
        
		return notificationsRepository.getAllNotificationsByUserId(userId);
	};

	return { execute };
};
