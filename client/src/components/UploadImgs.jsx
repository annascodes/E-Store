import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";

const UploadImgs = ({ addUplImgsToAImgs }) => {
  const [imgFiles, setImgFiles] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [upLoading, setUpLoading] = useState(null);

  useEffect(() => {
    if (imgFiles.length != 0) {
      let temp = [];
      for (let i = 0; i < imgFiles.length; i++) {
        temp.push(URL.createObjectURL(imgFiles[i]));
      }
      setImgUrls(temp);
    }
  }, [imgFiles]);

  const handleUploadImg = async (e) => {
    e.preventDefault();
    if (imgFiles.length == 0) {
      console.log("nothing in imgFiles!!!");
      return;
    }

    try {
      for (let i = 0; i < imgFiles.length; i++) {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imgFiles[i].name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imgFiles[i]);

        uploadTask.on(
          "state_changed",
          (snapshoot) => {
            const progress =
              (snapshoot.bytesTransferred / snapshoot.totalBytes) * 100;
            console.log(`loading for ${i}: ${progress.toFixed(0)} %`);
            setUpLoading(progress.toFixed(0));
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              addUplImgsToAImgs(downloadUrl);
              setUpLoading(null);
            });
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(imgFiles);
  console.log(imgUrls);
  return (
    <div className="  border-black my-5 p-3">
      <h1 className="text-center text-xs tracking-widest">upload image</h1>

      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        ></label>
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          multiple
          onChange={(e) => {
            setImgFiles(e.target.files);
          }}
        />
        <p
          className="mt-1 px-2 text-[11px] tracking-widest text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          NOTE ***( SVG, PNG, JPG or GIF (MAX. 800x400px).)
        </p>
      </div>

      {imgUrls.length !== 0 && (
        <div className="opacity-50 flex flex-row flex-wrap justify-around">
          {imgUrls.map((i) => {
            return <img src={i} className="w-10 h-auto" alt="" />;
          })}
        </div>
      )}
      {upLoading ? (
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium text-blue-700 dark:text-white">
              Uploading...
            </span>
            <span className="text-sm font-medium text-blue-700 dark:text-white">
              {upLoading}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${upLoading}% `}}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={handleUploadImg}
          className="block mx-auto my-3 bg-blue-600 hover:bg-blue-800 rounded-xl text-white px-2 py-1 text-xs"
        >
          upload image
        </button>
      )}
    </div>
  );
};

export default UploadImgs;
