import { ErrorMessage, Field, Form, Formik } from "formik";

import {
	initialSignupValues,
	signUpSchema,
} from "../../utils/signup-validation";

import googleIcon from "../../assets/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { candidateSignupApi } from "../../axios/api/auth/candidateAuth";
import { notify } from "../../utils/toastMessage";

function CandidateSignupForm() {
	const navigate = useNavigate()
	

	const handleSubmit = async (userData: any) => {
		try {
			const data = await candidateSignupApi(userData);

			console.log("Hello");
			Swal.fire({
				text:data?.data?.message || "Email sendedddd",
				confirmButtonText: "ok",
			}).then((response)=>{
				console.log(response);
				
				if(response){
					navigate(`/candidate/otpSignupCandidate/${userData.email}`)
				}
			})
		} catch (error: any) {
			notify(error.response.data.errors[0].message, "error");
		}
	};

	return (
		<Formik
			initialValues={initialSignupValues}
			validationSchema={signUpSchema}
			onSubmit={(values) => {
				console.log(values);
				handleSubmit(values);
			}}
		>
			{(formik) => {
				const { errors, touched } = formik;
				return (
					<div className="w-6/12 h-5/6">
						<div className="mb-16">
							<h1 className="text-center  text-5xl font-bold">
								Sign Up
							</h1>
							<div className="w-16 h-1 bg-black mx-auto my-4"></div>
						</div>

						<Form noValidate>
							<div className="form-control w-6/6">
								<Field
									type="text"
									name="name"
									placeholder="Name"
									className={`input input-primary w-full rounded-xl ${
										errors.name && touched.name
											? "input-error"
											: null
									}`}
								/>
								<label className="label mb-3">
									<span className="label-text-alt text-red-500">
										<ErrorMessage
											name="name"
											className="error label-text-alt"
										/>
									</span>
								</label>
							</div>

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
							<label className="label mt-1">
								<span className="label-text-alt text-red-500">
									<ErrorMessage
										name="email"
										className="error label-text-alt"
									/>
								</span>
							</label>

							<div className="form-control w-6/6">
								<Field
									type="text"
									name="phone"
									placeholder="Phone"
									className={`input input-primary w-full rounded-xl ${
										errors.phone && touched.phone
											? "input-error border-red-500"
											: null
									}`}
								/>
							</div>
							<label className="label mb-3">
								<span className="label-text-alt text-red-500">
									<ErrorMessage
										name="phone"
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
											? "input-error border-red-500"
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
								<label className="label mt-1">
									<span className="label-text-alt cursor-pointer">
										<Link
											to="/candidate/signin"
											className="cursor-pointer"
										>
											Already have an account?
										</Link>
									</span>
								</label>
							</div>

							<div className="flex items-center justify-center mb-3">
								<button
									type="submit"
									className="btn btn-outline w-60 btn-primary"
								>
									Signup
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
								Sign up With Google
							</button>
						</div>
					</div>
				);
			}}
		</Formik>
	);
}

export default CandidateSignupForm;
