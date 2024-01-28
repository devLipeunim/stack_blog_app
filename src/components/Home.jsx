import React, { useEffect, useState } from "react";
import icon from "./assets/delete.png";

const itemsPerPage = 4;

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userID, setUserID] = useState("");
  // const [updatePostData, setUpdatePostData] = useState("");
  const [updatePostData, setUpdatePostData] = useState({
    title: "",
    firstName: "",
    lastName: "",
  });

  const handleToggle = () => setToggle(!toggle);
  const handleUpdate = () => setUpdate(!update);

  // GET_USER
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyapi.io/data/v1/user?limit", {
        headers: {
          "app-id": "65a19335e135fe610e0131e7",
        },
      });
      const data = await response.json();
      // console.log(data, 'my data');
      setUserData(data.data || {});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // filteredData

  useEffect(() => {
    const filteredResults = userData.filter((user) =>
      user.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredResults);
    setCurrentPage(1);
  }, [searchQuery, userData]);
  // declear variables for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Update User Function
  const updateUser = async (userId) => {
    console.log("userID: ", userId);
    try {
      if (userId) {
        const response = await fetch(
          `https://dummyapi.io/data/v1/user/${userId}`,
          {
            method: "PUT",
            headers: {
              "app-id": "65a19335e135fe610e0131e7",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePostData),
          }
        );

        if (response.ok) {
          setSuccessMessage("User updated successfully");
          fetchData();
          setUpdatePostData({
            title: "",
            firstName: "",
            lastName: "",
          });
          setUserID("");
        } else {
          console.error("Error updating user:", response.statusText);
          setSuccessMessage("Error updating user");
        }
      } else {
        console.log("No user ID");
      }
    } catch (error) {
      console.error("Error updating user:", error.message);
      setSuccessMessage("Error updating user");
    }
  };

  // DELETE_USER FUNCTION
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://dummyapi.io/data/v1/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "app-id": "65a19335e135fe610e0131e7",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("User deleted successfully");
        fetchData();
      } else {
        console.error("Error deleting user:", response.statusText);
        setSuccessMessage("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      setSuccessMessage("Error deleting user");
    }
  };
  // SET SUCCESS MESSAGE TIME OUT
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <>
      {/* UI design starts here */}
      <div className=" bg-[url('/src/components/assets/skyblue.jpeg')] bg-center bg-cover bg-no-repeat h-[100%] lg:h-[100vh] w-[100%]">
        <p className=" flex text-center justify-center text-[rgb(10,93,113)] pt-5">
          STACKBUILD BLOGG APP
        </p>
        <div className=" flex flex-col lg:flex-row gap-5 lg:gap-10 justify-center items-center  pt-[3rem] lg:pt-[5rem]">
          <div className=" flex justify-center">
            <input
              type="text"
              placeholder="Enter post title"
              required
              className=" p-4 border-none  capitalize h-11 w-52 lg:w-96"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className=" flex p-3  bg-[rgb(10,93,113)] text-white text-center h-11">
              Search
            </button>
          </div>

          <div className=" flex justify-center">
            <button
              className=" bg-[rgb(10,93,113)] p-3 text-white text-center h-11 rounded-md hover:underline"
              onClick={handleToggle}
            >
              + New Post
            </button>
          </div>
        </div>

        {/* creating new post form */}

        <div
          className={toggle ? "newpost1 active " : "newpost1 overflow-hidden"}
        >
          <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-3 overflow-hidden">
            <div className=" cursor-pointer flex justify-between">
              <p className="  text-[rgb(250,254,162)]">Create a new post</p>
              <img src={icon} alt="" className=" w-8" onClick={handleToggle} />
            </div>

            <div className=" flex flex-col lg:flex-row gap-5">
              <div className=" flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="title"
                  className=" p-3 capitalize"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <input
                  type="text"
                  name="Firstname"
                  placeholder="First Name"
                  className=" p-3 capitalize"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  name="Lastname"
                  placeholder="Last Name"
                  className=" p-3 capitalize"
                />
                <input
                  type="file"
                  placeholder="upload image"
                  className=" p- text-white"
                  required
                />
              </div>

              <div className=" flex flex-col gap-5">
                <select name="gender" id="gender" className=" p-3">
                  <option value="">Gender</option>
                  <option value="">Male</option>
                  <option value="">Female</option>
                  <option value="">Other</option>
                </select>

                <input
                  type="email"
                  name="email"
                  placeholder="Email Adress"
                  className=" p-3 capitalize"
                />
                <input
                  type="date"
                  name="date"
                  className="p-3 w-[100%] bg-gray-300"
                  placeholder="DOB"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="phone number"
                  className=" p-3"
                />
              </div>
              <div className=" flex flex-col gap-5">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className=" p-3 capitalize"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className=" p-3 capitalize"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  className=" p-3 capitalize"
                />
                <input
                  type="time"
                  name="time"
                  placeholder="Time Zone"
                  className="p-3 capitalize w-[100%]"
                />
              </div>
            </div>

            <button className=" bg-[rgb(253,202,209)] flex m-auto p-2 rounded-md w-44 justify-center">
              Add Post
            </button>
          </form>
        </div>

        {/* updating  a post */}
        <div className={update ? "newpost active " : "newpost overflow-hidden"}>
          <form className="  bg-[rgb(10,93,113)] flex flex-col gap-5 p-1 overflow-hidden">
            <div className=" cursor-pointer flex justify-end pr-10 mb-[-10px]">
              <img src={icon} alt="" className=" w-7" onClick={handleUpdate} />
            </div>

            <input
              type="text"
              name="title"
              placeholder="Title"
              className="p-4 capitalize"
              value={updatePostData.title}
              onChange={(e) =>
                setUpdatePostData({ ...updatePostData, title: e.target.value })
              }
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="p-4 capitalize"
              value={updatePostData.firstName}
              onChange={(e) =>
                setUpdatePostData({
                  ...updatePostData,
                  firstName: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="p-4 capitalize"
              value={updatePostData.lastName}
              onChange={(e) =>
                setUpdatePostData({
                  ...updatePostData,
                  lastName: e.target.value,
                })
              }
            />
            <input
              type="file"
              name="upload"
              placeholder="Upload Image"
              className="p-4 text-white"
            />

            <button
              className="bg-[rgb(253,202,209)] p-3"
              onClick={() => updateUser(userID)}
            >
              Update
            </button>
          </form>
        </div>

        {successMessage && (
          <div className="text-[red] text-center mt-4">{successMessage}</div>
        )}

        {/* Display filtered user data */}
        <div className="text-white grid grid-cols-2 md:grid-cols-3 lg:flex justify-center mt-14 lg:mt-24">
          {currentItems.map((user) => (
            <div
              key={user.id}
              className=" lg:w-1/5 p-4 flex flex-col items-center text-center gap-2"
            >
              <img
                src={user.picture}
                alt={user.lastName}
                className=" w-32 rounded-xl"
              />
              <p className="capitalize">
                Name: {user.title} {user.firstName} {user.lastName}
              </p>
              <div className=" flex gap-5">
                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                  className=" bg-[red] p-1 rounded-md capitalize"
                >
                  delete post
                </button>
                <button
                  className="bg-[rgb(10,93,113)] p-1 rounded-md capitalize"
                  onClick={() => {
                    setUpdatePostData({
                      title: user.title,
                      firstName: user.firstName,
                      lastName: user.lastName,
                    });
                    setUserID(user.id);
                    handleUpdate();
                  }}
                >
                  update post
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 pb-10 lg:pb-0">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline mx-2"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= filteredData.length}
            className="bg-[rgb(10,93,113)] p-3 text-white text-center hover:underline mx-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
