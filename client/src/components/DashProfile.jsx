import React, { useEffect, useRef, useState } from "react";
import "flowbite";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [picFile, setPicFile] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [formData, setFormData] = useState({});
  const [imgUploading, setImgUploading] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false)

  let flag = false;

  const uploadPic = async () => {
    setImgUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + picFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, picFile);

    uploadTask.on(
      "state_changed",
      (snapshoot) => {
        const progress =
          (snapshoot.bytesTransferred / snapshoot.totalBytes) * 100;
        console.log("-------------------------------------", progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
          setPicUrl(downloadurl);
          setFormData({ ...formData, pic: downloadurl });
          setImgUploading(false);
        });
      }
    );
    console.log("----------------------- exiting uploadPic ----------");
  };

  useEffect(() => {
    if (picFile) {
      uploadPic();
    }
  }, [picFile]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (imgUploading) {
      return;
    }
    if (true) {
      try {
        setUpdatingProfile(true)
        const res = await fetch(`/api/user/updateuser/${currentUser._id}`, {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          // loading-false
          console.log(data.message);
          setUpdatingProfile(false);
        } else {
          console.log(data);
          dispatch(signInSuccess(data));
          setUpdatingProfile(false);
          // dispatch data
        }
      } catch (error) {
        console.log(error.message);
        setUpdatingProfile(false);
      }
    }
  };
  console.log(picFile);
  console.log(picUrl);
  return (
    <div>
      <h1 className="rounded-lg py-2 bg-gray-900 text-gray-100 text-center font-extrabold text-3xl mt-10 tracking-widest mx-1">
        PROFILE
      </h1>
      {imgUploading && <span>waite to upload img</span>}

      {false ? (
        <span>Loading...</span>
      ) : (
        <form className="max-w-md mx-auto my-10">
          <input
            type="file"
            accept="image/*"
            ref={filePickerRef}
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPicFile(file);
                setPicUrl(URL.createObjectURL(file));
              }
            }}
          />
          <div className="">
            <img
              onClick={() => filePickerRef.current.click()}
              src={picUrl || currentUser.pic}
              className="hover:cursor-pointer hover:scale-105 duration-500   p-2 w-32 h-32 object-cover rounded-full border-black mx-auto"
              alt=""
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              defaultValue={currentUser.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              defaultValue={currentUser.username}
              type="text"
              name="username"
              id="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.id]: e.target.value })
              }
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          {imgUploading ? (
            <div className="w-1/2 px-3 py-3 tracking-widest text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                uploading img ...
              </div>
            
          ) : (
            <button
              onClick={handleUpdateProfile}
              type="submit"
              disabled={updatingProfile}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
            >
              {updatingProfile ? 'loading...': 'update'}
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default DashProfile;
