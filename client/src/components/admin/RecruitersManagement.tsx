import { useEffect, useState } from "react";
import {
	blockUnblockRecruiterApi,
	getAllRecruitersApi,
} from "../../api/axios/admin/recruiters";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RecruiterInterface {
	id: string;
	name: string;
	email: string;
	phone: string;
	isActive: boolean;
}

function RecruitersManagement() {
	const [recruitersData, setRecruitersData] = useState<RecruiterInterface[]>(
		[]
	);
	const [filteredRecruitersData, setFilteredRecruitersData] = useState<
		RecruiterInterface[]
	>([]);

	const [originalIndexMap, setOriginalIndexMap] = useState<{
		[key: string]: number;
	}>({});

	useEffect(() => {
		(async () => {
			const recruiters = await getAllRecruitersApi();
			console.log(recruiters.data.data);
			// console.log(Array.isArray(recruiters.data.data));

			const indexMap: { [key: string]: number } = {};
			const formattedRecruiters = recruiters.data.data.map(
				(recruiter: RecruiterInterface, index: number) => {
					indexMap[recruiter.id] = index;
					return { ...recruiter };
				}
			);

			setRecruitersData(formattedRecruiters);
			setFilteredRecruitersData(formattedRecruiters);
			setOriginalIndexMap(indexMap);
		})();
	}, []);

	const handleBlockUnblock = async (id: string) => {
		const updatedCandidate = await blockUnblockRecruiterApi(id);

		toast.success(updatedCandidate.data.message, {
			position: toast.POSITION.TOP_RIGHT,
		});

		const recruiters = recruitersData.map((recruiter) => {
			if (recruiter.id === id) {
				return {
					...recruiter,
					isActive: updatedCandidate.data.data.isActive,
				};
			}

			return recruiter;
		});

		setRecruitersData(recruiters);
		setFilteredRecruitersData(recruiters);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchText = e.target.value.toLowerCase().trim();

		const filteredRecruiters = recruitersData.filter((recruiter) => {
			return (
				recruiter.name.toLowerCase().includes(searchText) ||
				recruiter.email.toLowerCase().includes(searchText) ||
				recruiter.phone.toString().toLowerCase().includes(searchText)
			);
		});

		setFilteredRecruitersData(filteredRecruiters);
	};

	return (
		<div className="mx-24">
			{" "}
			{/* Add mx-4 for horizontal margins */}
			<div className="text-center ">
				<h1 className="font-semibold text-5xl mt-4 mb-10">
					Recruiters Management
				</h1>
				<div className="overflow-x-auto">
					<div className="search-container flex justify-end">
						<input
							type="text"
							className="search-box my-3 p-2 border rounded-xl border-slate-800"
							placeholder="Search by name, email, or phone..."
							onChange={handleSearch}
						/>
					</div>
					<table className="table table-zebra">
						{/* head */}
						<thead className="bg-gray-800 text-white">
							<tr>
								<th>No</th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th className="text-center">view</th>
								<th className="">status</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{filteredRecruitersData &&
								filteredRecruitersData.map(
									({ id, name, email, phone, isActive }) => (
										<tr key={id}>
											<th>{originalIndexMap[id] + 1}</th>
											<td>{name}</td>
											<td>{email}</td>
											<td>{phone}</td>
											<td className="text-center">
												<button className="btn btn-info">
													view details
												</button>
											</td>
											<td>
												<div
													className={`badge ${
														isActive
															? "badge badge-success gap-2"
															: "badge badge-error gap-2"
													} `}
												>
													{isActive
														? "active"
														: "inActive"}
												</div>
											</td>
											<td className="text-center">
												<button
													onClick={() => {
														handleBlockUnblock(id);
													}}
													className={`btn ${
														isActive
															? "btn-success bg-green-600"
															: "btn btn-error bg-red-600"
													} `}
												>
													{isActive
														? "Block"
														: "unBlock"}
												</button>
											</td>
										</tr>
									)
								)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default RecruitersManagement;
