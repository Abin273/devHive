import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import googleIcon from "../../assets/google-icon.svg";

import {
	initialSigninValues,
	signInSchema,
} from "../common-form-validation/signin";
import { candidateSigninApi } from "../../api/axios/auth/candidateAuth";
import { candidateSignin } from "../../redux/slice/candidateSlice/candidateAuthSlice";
import { setCandidate } from "../../redux/slice/candidateSlice/candidateDataSlice";
// import { useEffect } from "react";

function CandidateSigninForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// useEffect(() => {
	// }, []);

	console.log("hi recruiter signin");

	const notify = (msg: any, type: string) => {
		type === "error"
			? toast.error(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  })
			: toast.success(msg, {
					position: toast.POSITION.TOP_RIGHT,
			  });
	};

	const handleSubmit = async (userData: any) => {
		try {
			const response = await candidateSigninApi(userData);
			console.log("hiiii", response);
			dispatch(candidateSignin());
			dispatch(setCandidate(response.data.data));
			notify(response.data.message, "success");
			navigate("/candidate");
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	return (
		<Formik
			initialValues={initialSigninValues}
			validationSchema={signInSchema}
			onSubmit={(values) => {
				console.log(values);
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;

				return (
					<div className="w-6/12 h-5/6 flex flex-col justify-between">
						<div className="mb-10">
							<h1 className="text-center  text-5xl font-bold">
								Sign In
							</h1>
							<div className="w-16 h-1 bg-black mx-auto my-4"></div>
						</div>

						<Form noValidate>
							<div className="form-control w-6/6">
								<Field
									type="email"
									name="email"
									placeholder="Email"
									className={`input input-primary w-full rounded-xl ${
										errors.email && touched.email
											? "input-error"
											: null
									}`}
								/>
							</div>
							<label className="label mb-3">
								<span className="label-text-alt text-red-500">
									<ErrorMessage
										name="email"
										className="error label-text-alt"
									/>
								</span>
							</label>

							<div className="form-control w-6/6">
								<Field
									type="password"
									name="password"
									placeholder="Password"
									className={`input input-primary w-full rounded-xl ${
										errors.password && touched.password
											? "input-error"
											: null
									}`}
								/>
							</div>
							<div className="flex items-center justify-between mb-5">
								<label className="label">
									<span className="label-text-alt text-red-500">
										<ErrorMessage
											name="password"
											className="error label-text-alt"
										/>
									</span>
								</label>
								<label className="label mt-1" onClick={()=> navigate("/candidate/forgotPasswordEmail")}>
									<span className="label-text-alt cursor-pointer">
										Forgot Password?
									</span>
								</label>
							</div>

							<div className="flex items-center justify-center mb-3">
								<button
									type="submit"
									className={`btn btn-outline w-60 btn-primary`}
								>
									Signin
								</button>
							</div>

							<div className="flex items-center">
								<div className="flex-1 h-0 border-t border-black"></div>
								<div className="mx-4 text-black">or</div>
								<div className="flex-1 h-0 border-t border-black"></div>
							</div>
						</Form>
						<div className="flex items-center justify-center gap-3">
							<button className="btn border-gray-600 w-60">
								<img src={googleIcon} className="w-7" alt="" />
								Sign in With Google
							</button>
						</div>

						<div className="w-full mt-5 items-center justify-center flex">
							<p className="text-sm font-normal">
								Don't have an account?
								<Link
									to="/candidate/signup"
									className="font-semibold underline underline-offset-2 cursor-pointer"
								>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				);
			}}
		</Formik>
	);
}

export default CandidateSigninForm;
