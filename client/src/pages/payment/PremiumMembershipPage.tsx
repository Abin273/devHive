import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import { useEffect, useState } from "react";

import { notify } from "../../utils/toastMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
    createMembershipPlanApi,
    getAllMembershipPlansApi,
} from "../../axios/apiMethods/premium-plans-service/admin";
import Table from "../../components/table/Table";

function PremiumMembershipPage() {
    const [membershipPlansData, setMembershipPlansData] = useState<any>([]);
    const [numberOfPages, setNumberOfPages] = useState(0);

    const PLANS_PER_PAGE: number = 2;

    const columns = [
        { Header: "Name", accessor: "name" },
        { Header: "Price", accessor: "price" },
    ];

    const fetchMembershipPlans = async (currentPage: number) => {
        const membershipPlans = await getAllMembershipPlansApi(
            currentPage,
            PLANS_PER_PAGE
        );
        setMembershipPlansData(membershipPlans.data.membershipPlans);
        setNumberOfPages(membershipPlans.data.numberOfPages);
    };

    useEffect(() => {
        fetchMembershipPlans(1); // Fetch initial data for the first page
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Handle modal open/close
    const handleModalOpen = () => setModalIsOpen(true);
    const handleModalClose = () => setModalIsOpen(false);

    // Handle creating premium membership plan
    const handleCreatePremium = async (values: any) => {
        const arr: Array<string> = [];

        values.features = values.features.split(",").map((element: string) => {
            arr.push(element.trim());
            return element;
        });
        const membershipPlans = await createMembershipPlanApi(values);
        if (membershipPlans) {
            notify(membershipPlans.message, "success");
        }
        setMembershipPlansData([...membershipPlansData, membershipPlans.data]);
        handleModalClose();
    };

    // Formik initialValues
    const initialValues = {
        name: "",
        price: 0,
        description: "",
        features: "",
    };

    // Formik validation schema using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        price: Yup.string().required("Price is required"),
        description: Yup.string().required("Description is required"),
        features: Yup.string().required("Features are required"),
    });

    return (
        <div className="text-center mx-10">
            <div className="font-semibold text-5xl mt-4 mb-10">
                Premium Membership Plans
            </div>
            <div className="w-full flex flex-row mb-3 justify-end">
                <button
                    onClick={handleModalOpen}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Create Premium
                </button>
            </div>

            <Modal open={modalIsOpen} onClose={handleModalClose} center>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Create Premium Membership
                    </h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            handleCreatePremium(values);
                        }}
                    >
                        <Form>
                            {/* Form fields */}
                            <div className="mb-4">
                                <label htmlFor="name">Name:</label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="p-2 border border-gray-300 w-full rounded"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="price">Price:</label>
                                <Field
                                    type="text"
                                    id="price"
                                    name="price"
                                    className="p-2 border border-gray-300 w-full rounded"
                                />
                                <ErrorMessage
                                    name="price"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description">
                                    Description:
                                </label>
                                <Field
                                    as="textarea"
                                    id="description"
                                    name="description"
                                    className="p-2 border border-gray-300 w-full rounded"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="features">Features:</label>
                                <Field
                                    as="textarea"
                                    id="features"
                                    name="features"
                                    className="p-2 border border-gray-300 w-full rounded"
                                />
                                <ErrorMessage
                                    name="features"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white p-2 rounded mr-2"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modal>
            <Table
                columns={columns}
                data={membershipPlansData}
                numberOfPages={numberOfPages}
                fetchData={fetchMembershipPlans}
            />
        </div>
    );
}

export default PremiumMembershipPage;
