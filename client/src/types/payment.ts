export interface IMembershipPlan {
	membershipPlanId: string,
	name: string;
	features: string[];
	description: string;
	price: number;
	isActive: boolean;
}


export interface IPayment {
	candidateId: string;
	membershipPlanId: string;
	stripeId: string;
}