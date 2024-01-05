import { Navigate, Route, Routes } from "react-router-dom";

// import CandidateHomePage from "../pages/candidate/CandidateHomePage";
import { RootState } from "../redux/reducer/reducer";
import { useSelector } from "react-redux";


// import CandidateSigninPage from "../pages/auth-pages/signin/CandidateSigninPage";
// import CandidateSignupPage from "../pages/auth-pages/signup/CandidateSignupPage";
// import LandingPage from "../pages/landing/LandingPage";
// import CandidateProfilePage from "../pages/profile/candidate/CandidateProfilePage";
// import AllJobsPage from "../pages/job-pages/candidate/AllJobsPage";
// import JobDetailsPage from "../pages/job-pages/candidate/JobDetailsPage";
// import OtpFormPageSignup from "../pages/auth-pages/otp/candidate/OtpFormPageSignup";
// import ResetPassword from "../pages/auth-pages/password/candidate/ResetPassword";
// import OtpFormResetPassword from "../pages/auth-pages/otp/candidate/OtpFormResetPassword";

// import ForgotPasswordEmailEnterPage from "../pages/auth-pages/emailOrMobileEnter/candidate/ForgotPasswordEmailEnterPage"
// import ForgotPassword from "../pages/auth-pages/password/candidate/ForgotPassword";
// import ResetPasswordMobileEnterPage from "../pages/auth-pages/emailOrMobileEnter/candidate/ResetPasswordMobileEnterPage"

// import OtpFormPageForgotPassword from "../pages/auth-pages/otp/candidate/OtpFormPageForgotPassword";
// import CandidateProfileEditPage from "../pages/profile/candidate/CandidateProfileEditPage";
// import AppliedJobsPage from "../pages/job-pages/candidate/AppliedJobsPage";

import { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";

// import LandingPage from "../pages/landing/LandingPage";
const CandidateSigninPage = lazy(()=> import("../pages/auth-pages/signin/CandidateSigninPage"))
const CandidateSignupPage = lazy(()=> import("../pages/auth-pages/signup/CandidateSignupPage"))
const LandingPage = lazy(()=> import("../pages/landing/LandingPage"))
const CandidateProfilePage = lazy(()=> import("../pages/profile/candidate/CandidateProfilePage"))
const AllJobsPage = lazy(()=> import("../pages/job-pages/candidate/AllJobsPage"))
const JobDetailsPage = lazy(()=> import("../pages/job-pages/candidate/JobDetailsPage"))
const OtpFormPageSignup = lazy(()=> import("../pages/auth-pages/otp/candidate/OtpFormPageSignup"))
const ResetPassword = lazy(()=> import("../pages/auth-pages/password/candidate/ResetPassword"))
const OtpFormResetPassword = lazy(()=> import("../pages/auth-pages/otp/candidate/OtpFormResetPassword"))
const ForgotPasswordEmailEnterPage = lazy(()=> import("../pages/auth-pages/emailOrMobileEnter/candidate/ForgotPasswordEmailEnterPage"))
const ForgotPassword = lazy(()=> import("../pages/auth-pages/password/candidate/ForgotPassword"))
const ResetPasswordMobileEnterPage = lazy(()=> import("../pages/auth-pages/emailOrMobileEnter/candidate/ResetPasswordMobileEnterPage"))
const OtpFormPageForgotPassword = lazy(()=> import("../pages/auth-pages/otp/candidate/OtpFormPageForgotPassword"))
const CandidateProfileEditPage = lazy(()=> import("../pages/profile/candidate/CandidateProfileEditPage"))
const AppliedJobsPage = lazy(()=> import("../pages/job-pages/candidate/AppliedJobsPage"))
const JobApplicationDetailsPage = lazy(()=> import("../pages/job-pages/candidate/JobApplicationDetailsPage"));

function CandidateRoutes() {
	const isCandidateLoggedIn = useSelector(
		(state: RootState) => state.candidateData.data
	);
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Routes>
					{/* <Route path="/" element={isCandidateLoggedIn? <CandidateHomePage />: <Navigate to={"/candidate/landing"} />} /> */}
					<Route path="/" element={isCandidateLoggedIn? <LandingPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/profile" element={isCandidateLoggedIn? <CandidateProfilePage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/edit-profile/" element={isCandidateLoggedIn? <CandidateProfileEditPage />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/passwordResetMobile" element={isCandidateLoggedIn? <ResetPasswordMobileEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordResetOtp" element={isCandidateLoggedIn? <OtpFormResetPassword />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/passwordReset" element={isCandidateLoggedIn? <ResetPassword />: <Navigate to={"/candidate/landing"} />} />

					<Route path="/forgotPasswordEmail" element={!isCandidateLoggedIn? <ForgotPasswordEmailEnterPage />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPasswordOtp/:email" element={!isCandidateLoggedIn? <OtpFormPageForgotPassword />: <Navigate to={"/candidate/landing"} />} />
					<Route path="/forgotPassword/:userId" element={!isCandidateLoggedIn? <ForgotPassword />: <Navigate to={"/candidate/landing"} />} />
					
					<Route path="/landing" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />: <LandingPage /> } />
					<Route path="/signin" element={isCandidateLoggedIn?<Navigate to={"/candidate"} />:<CandidateSigninPage /> } />
					<Route path="/signup" element={isCandidateLoggedIn? <Navigate to={"/candidate"} />:<CandidateSignupPage />} />
					<Route path="/otpSignupCandidate/:email" element={!isCandidateLoggedIn? <OtpFormPageSignup /> :<Navigate to={"/candidate"} />} />

					<Route path="/all-jobs" element={isCandidateLoggedIn?<AllJobsPage />:<Navigate to={"/candidate/signin"} />} />
					{/* <Route path="/job-details" element={isCandidateLoggedIn?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} /> */}
					<Route path="/job-details/:jobId" element={isCandidateLoggedIn?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/applied-jobs" element={isCandidateLoggedIn?<AppliedJobsPage />:<Navigate to={"/candidate/signin"} />} />
					<Route path="/application-details/:jobApplicationId" element={isCandidateLoggedIn?<JobApplicationDetailsPage />:<Navigate to={"/candidate/signin"} />} />
				
					{/* <Route path="/applied-jobs-details/:jobId" element={isCandidateLoggedIn?<JobDetailsPage />:<Navigate to={"/candidate/signin"} />} /> */}
				</Routes>
				
			</Suspense>
		</>
	);
}

export default CandidateRoutes;
