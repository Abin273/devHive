// import { GiHamburgerMenu } from "react-icons/gi"
import homeImage from "../../assets/landingPage/company-like.jpg";
import FooterLanding from "../../components/footer/FooterLanding";
import { useEffect, useState } from "react";
import NavBarLanding from "../../components/navBar/NavBarLanding";
import SearchBar from "../../components/searchBar/SearchBar";
import JobCard from "../../components/cards/JobCard";
import { getAllJobsApi } from "../../axios/apiMethods/jobs-service/jobs";

import { Link } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import Paginate from "../../components/pagination/Paginate";
import NavBarCandidate from "../../components/navBar/NavBarCandidate";
import TopNavBarRecruiter from "../../components/navBar/TopNavBarRecruiter";
import {
	clearCurrentPage,
	clearFilteredJobs,
	clearTotalNumberOfPages,
	setFilteredJobs,
} from "../../redux/slice/job/filteredJobsSlice";
import { setTotalNumberOfPages } from "../../redux/slice/job/filteredJobsSlice";
import { setCurrentPage } from "../../redux/slice/job/filteredJobsSlice";

function LandingPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const candidate = useSelector(
		(state: RootState) => state.candidateData.data
	);
	const recruiter = useSelector(
		(state: RootState) => state.recruiterData.data
	);

	const pageCount: any = useSelector(
		(state: RootState) => state.filteredJobs.totalNumberOfPages
	);
	console.log("pageCount", pageCount);

	const currentPage: any = useSelector(
		(state: RootState) => state.filteredJobs.currentPage
	);
	console.log("currentPage", currentPage);

	const handleGetAllJobs = async (page: number) => {
		// dispatch(setLoading());
		const allJobs = await getAllJobsApi(page);
		console.log("API Response:", allJobs);
		// dispatch(setLoaded());
		return allJobs;
	};

	useEffect(() => {
		(async () => {
			const allJobs = await handleGetAllJobs(currentPage);
			console.log(
				"landing page before handleGetAllJobs dispatch",
				allJobs
			);

			try {
				const allJobs = await handleGetAllJobs(currentPage);
		  
				// Check if allJobs.data exists before accessing its properties
				if (allJobs && allJobs.data) {
				  console.log("landing page before handleGetAllJobs dispatch", allJobs);
		  
				  dispatch(setFilteredJobs({ data: allJobs.data }));
				  dispatch(setTotalNumberOfPages({ totalNumberOfPages: allJobs.totalNumberOfPages }));
				}
			  } catch (error) {
				console.error("Error fetching jobs:", error);
			  }
			return () => {
				// This cleanup function will be called when the component is unmounted
				dispatch(clearFilteredJobs());
				dispatch(clearTotalNumberOfPages());
				dispatch(clearCurrentPage());
			};
		})();
	}, [currentPage]);

	const jobs: any = useSelector(
		(state: RootState) => state.filteredJobs.data
	);
	console.log("jobs -----------------------------", jobs);

	const handlePageChange = async ({ selected }: { selected: number }) => {
		console.log("selected+1 : ", selected + 1);
		dispatch(setCurrentPage({ currentPage: selected + 1 }));
	};

	const location = useLocation();
	const isRecruiterUrl = location.pathname.includes("recruiter");
	const isCandidateUrl = location.pathname.includes("candidate");

	const handleViewJob = async (jobId: string) => {
		console.log("id handle view ", jobId);
		// dispatch(setRecruiterJobId(id))
		if (isRecruiterUrl) {
			navigate(`/recruiter/job-details/${jobId}`);
		}

		navigate(`/candidate/job-details/${jobId}`);
	};

	return (
		<>
			{/* <GiHamburgerMenu /> */}

			{candidate && isCandidateUrl ? (
				<NavBarCandidate />
			) : recruiter && isRecruiterUrl ? (
				<TopNavBarRecruiter />
			) : (
				<NavBarLanding />
			)}

			<div>
				<div>
					<div
						className="hero min-h-screen"
						style={{
							backgroundImage: `url(${homeImage})`,
						}}
					>
						<div className="hero-overlay bg-opacity-60"></div>
						<div className="hero-content text-center text-neutral-content">
							<div className="max-w-md">
								<h1 className="mb-5 text-5xl font-bold">
									Find your dream jobs now
								</h1>
								<p className="mb-5">
									It's time to get creative in your job
									search!
								</p>
								<Link
									to="search-div"
									smooth={true}
									duration={700} // Adjust the duration as needed
									offset={-60} // Adjust this value based on the height of your navigation bar
									className="btn btn-primary"
								>
									{candidate && isCandidateUrl
										? "Start searching"
										: recruiter && isRecruiterUrl
										? "Start searching"
										: "Get Started"}
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div
					id="search-div"
					className=" bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"
				>
					<div className="py-10 ">
						<SearchBar handleGetAllJobs={handleGetAllJobs} />
					</div>

					{/* <div className="pb-20">
						{isLoading ? (
							<JobCardShimmerLandingPage />
						) : jobs.length > 0 ? (
							jobs.map((job: any) => (
								<JobCard
									key={job?.id}
									job={job}
									handleViewJob={handleViewJob}
								/>
							))
						) : (
							<div className="mx-40 p-6 bg-transparent rounded-md shadow-md">
								<div className="flex items-center justify-center mb-4">
									<p className="text-white ml-4 text-2xl font-bold">
										No jobs are listed yet
									</p>
								</div>
							</div>
						)}
					</div> */}
					<div className="pb-20">
						{jobs && jobs.length > 0 ? (
							jobs.map((job: any) => (
								<JobCard
									key={job?.id}
									job={job}
									handleViewJob={handleViewJob}
								/>
							))
						) : (
							<div className="mx-40 p-6 bg-transparent rounded-md shadow-md">
								<div className="flex items-center justify-center mb-4">
									<p className="text-white ml-4 text-2xl font-bold">
										No jobs are listed yet
									</p>
								</div>
							</div>
						)}
					</div>
					<Paginate
						pageCount={pageCount}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
			<div>
				<FooterLanding />
			</div>
		</>
	);
}

export default LandingPage;
