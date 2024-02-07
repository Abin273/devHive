import dashboard from "../../assets/dashboard.svg";
import finance from "../../assets/finance.svg";
import companies from "../../assets/companies.svg";
import candidates from "../../assets/candidates.svg";
import membership from "../../assets/membership.svg";
import logout from "../../assets/logout.svg";
import LeftNavBarAdmin from "../../components/navBar/LeftNavBarAdmin";
import { adminSignoutApi } from "../../axios/apiMethods/auth-service/adminAuth";
import Swal from "sweetalert2";
import { clearAdmin } from "../../redux/slice/adminSlice/adminDataSlice";
import { notify } from "../../utils/toastMessage";
import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLayout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		Swal.fire({
			title: "Do you want to Logout?",
			text: "Are you sure!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, Logout",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const response = await adminSignoutApi();
				if (response) {
					dispatch(clearAdmin());
					notify("Logged out successfully", "success");
					navigate("/admin");
				}
			}
		});
	};
	const menus = [
		{ title: "Dashboard", src: dashboard, to: "/admin" },
		{ title: "Finance", src: finance, to: "/admin/finance" },
		{ title: "Companies", src: companies, to: "/admin/companies" },
		{ title: "Candidates", src: candidates, to: "/admin/candidates" },
		{ title: "Recruiters", src: finance, to: "/admin/recruiters" },
		{ title: "jobs", src: finance, to: "/admin/jobs" },
		{ title: "MemberShip", src: membership, to: "/admin/memberships" },
		{ title: "Logout", src: logout, onClick: handleLogout, to: "/admin" },
	];
	return (
		<div className="flex">
			{/* left side */}
			<LeftNavBarAdmin menus={menus} />

			{/* right side */}
			<div className="p-4 text-2xl overflow-auto flex-1 font-semibold bg-red-300 h-screen">
				{<Outlet />}
			</div>
		</div>
	);
};

export default AdminLayout;
