"use client";
import { hideLoading, showLoading } from "@/RTK/features/alertSlice";
import Loader from "@/components/loader/Loader";
import SideBar from "@/components/sideBar/SideBar";
import { Base_url } from "@/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Doctors = () => {
  const [userData, setUserData] = useState();
  const [item, setItem] = useState();
  // console.log("userdata of the statae", userData);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertSlice);

  useEffect(() => {
    setItem(localStorage.getItem("token"));
  }, []);

  const getAllUser = async () => {
    try {
      dispatch(showLoading());

      if (typeof window !== "undefined" && window.localStorage) {
        const res = await axios.get(`${Base_url}/getAllDoctors`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 9812660802 mandeep
          },
        });

        dispatch(hideLoading());
        // console.log(res.data, "admin ka user ki table ka data");
        if (res.data.success) {
          // toast.success("congratulations data get properly");
          setUserData(res.data.docotrs);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error?.response?.data?.message);
      // console.log(error);
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);


  //statusApproved
  const statusApprove = async (curelem, status) => {
    try {
      dispatch(showLoading());
      if (typeof window !== "undefined" && window.localStorage) {
        const res = await axios.post(
          `${Base_url}/changeDoctorStatus`,
          { doctorId: curelem._id, userId: curelem.userId, status: status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        // console.log(res.data, "admin ka user ki table ka data");
        if (res.data.success) {
          dispatch(hideLoading());
          toast.success("congratulations Task Done");
          window.location.reload();
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error?.response?.data?.message);
      // console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <div className="">
          <SideBar className="w-" />
        </div>
        <div className="md:text-sm text-xs mt-16 md:ml-[19%] ml-[33%] px-3 w-[100%] pr-2">
          <h1 className="font-bold">Users List for Admin</h1>
          {/* table start */}
          <div className="md:w-[100%] w-[270px] overflow-x-scroll">
            <table className="md:w-[100%]  mt-6">
              <tr className="">
                <th>Name</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
              {userData?.map((curelem) => {
                return (
                  <tr key={curelem._id} className="border-solid border-[1px] ">
                    <td className="text-center border-solid border-[1px] ">
                      {curelem.firstName}
                    </td>
                    <td className="text-center border-solid border-[1px] ">
                      {curelem.status}
                    </td>
                    <td className="text-center border-solid border-[1px] ">
                      {curelem.phone}
                    </td>

                    <td className="text-center">
                      {/* {curelem.status === "pending" ? ( */}
                      <button
                        className="bg-green-500 rounded px-3 py-3"
                        onClick={() => statusApprove(curelem, "approved")}
                      >
                        Approve
                      </button>
                      {/* ) : ( */}
                      <button
                        className="bg-red-500 active:bg-blue-500 px-3 py-3 rounded text-white"
                        onClick={() => statusApprove(curelem, "rejected")}
                      >
                        Reject
                      </button>
                      {/* )} */}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          {/* table end */}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Doctors;
