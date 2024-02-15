import { useNavigate, useParams } from "react-router-dom";
import {
	setLoaded,
	setLoading,
} from "../../../../redux/slice/loaderSlice/isLoading";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "../../../../utils/toastMessage";
import { RootState } from "../../../../redux/reducer/reducer";
import Loading from "../../../../components/loading/Loading";
import OtpEnterForm from "../../../../components/form/otpEnterForm";
import { verifyForgotPasswordOtpRecruiterApi } from "../../../../axios/apiMethods/auth-service/recruiterAuth";

function OtpFormPageForgotPassword() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { email } = useParams();

	// Provide a default value (empty string) if email is undefined
	const userEmail = email || "";

	const isLoading = useSelector(
		(state: RootState) => state.loading.isLoading
	);

	const handleSubmit = async (otp: string) => {
		try {
			console.log("Submitted OTP:", otp);

			dispatch(setLoading());
			const response = await verifyForgotPasswordOtpRecruiterApi(
				otp,
				email!
			);
			console.log("hiiii", response);
			console.log("hiiii", response.data);
			notify(response?.message, "success");
			navigate(`/recruiter/forgotPassword/${response.data.id}`);
		} catch (error: any) {
			console.error("Error during OTP submission:", error);

			notify(
				error.message || "An error occurred during OTP submission",
				"error"
			);
		} finally {
			dispatch(setLoaded());
		}

		if (isLoading) {
			return <Loading />;
		}
	};

	return (
		<div>
			{/* Pass email and handleSubmit as props to OtpEnterForm */}
			<OtpEnterForm email={userEmail} handleSubmit={handleSubmit} />
		</div>
	);
}

export default OtpFormPageForgotPassword;
