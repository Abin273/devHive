import moment from "moment";

// To format date in a human readable form eg:- Posted 2 days, ago
export const dateFormatHumanized = (date: Date) => {
	const updatedAt = moment(date);
	const now = moment();
	const timeDifference = now.diff(updatedAt, "seconds");
	const formattedTimeDifference = moment
		.duration(timeDifference, "seconds")
		.humanize();

	console.log(
		`Document ID AAAAAAAAAAAAAAAA: is , Updated ${formattedTimeDifference}`
	);
	return formattedTimeDifference;
};

// to check a date is today or not
export const isToday = (date: Date) => {
	const createdAt = moment(date);
	const today = moment().startOf("day");

	const todayOrNot = createdAt.isSame(today, "day");
	console.log(todayOrNot, "today or not");

	return todayOrNot;
};

// to get time form a data field eg:- 8:45 AM
export const getTime = (date: Date) =>{
    const createdAt = moment(date);

    // Get the time component from createdAt
    const time = createdAt.format('h:mm A');
    return time
}

// to format date along with time eg:- 19/03/2024 08:50 AM
export const formatDateWithTime = (dateString: string) => {
	const date = new Date(dateString);

	const formattedDateTime = date.toLocaleString("en-US", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});

	 // Extract individual components
	 const [datePart, timePart] = formattedDateTime.split(', ');
	 const [month, day, year] = datePart.split('/');

	  // Format as day/month/year
	  const formattedDate = `${day}/${month}/${year} ${timePart}`;

	return formattedDate;
};

export const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString();
};
