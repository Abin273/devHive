import { Twilio } from "twilio";

const authToken: string | undefined = process.env.TWILIO_AUTH_TOKEN;
const accountSid: string | undefined = process.env.TWILIO_ACCOUNT_SID;
const serviceSID: string | undefined = process.env.TWILIO_SERVICE_SID;

const client = new Twilio(accountSid, authToken);

export const sendOtp = async (phoneNo: number) => {
	const result = await client.verify.v2
		.services(serviceSID!)
		.verifications.create({ to: `+91 ${phoneNo}`, channel: "sms" });
		
	return result.status
};

export const verifyOtp = async (phoneNo: number, otp: string) => {
	const result = await client.verify.v2
		.services(serviceSID!)
		.verificationChecks.create({ to: `+91 ${phoneNo}`, code: otp });
		
		return result.status
		
};
