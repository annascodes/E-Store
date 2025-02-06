import React, { useEffect, useState } from "react";

const Fake = () => {
  const [imgFile, setImgFile] = useState(null);
  const [imgFileUrl, setImgFileUrl] = useState([]);

  useEffect(() => {
    const makeImgUrl = (e) => {
      let temp = [];

      for (let i = 0; i < imgFile.length; i++) {
        console.log(imgFile[i]);
        temp.push(URL.createObjectURL(imgFile[i]));
      }
      setImgFileUrl(temp);
    };
    if (imgFile) {
      makeImgUrl();
    }
  }, [imgFile]);

  return (
    <div className="relative z-0 w-full mb-5 group border-2 border-green-700 rounded-xl p-2">
      <div className=" ">
        <label
          className=" block mb-2 text-sm  text-gray-500 dark:text-white"
          htmlFor="file_input"
        >
          <div className="text-3xl font-bold text-red-700 tracking-tighter">
            REPLICA
          </div>{" "}
          Upload img to firebase storage
        </label>

        <input
          className="my-1 block w-full text-sm text-blue-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={(e) => {
            // console.log(e.target.files);
            setImgFile(e.target.files);
          }}
          multiple
        />
      </div>

      <div className="flex flex-row flex-wrap justify-around">
        {imgFileUrl &&
          imgFileUrl.map((i, indx_one) => {
            return (
              <div className=" flex flex-col justify-between items-center  border border-green-600 rounded-xl ">
                <img src={i} className="w-32 m-1 rounded-sm" alt="" />
                <div className="  flex flex-row justify-center text-red-600 hover:text-red-800">
                  <button
                    className=" "
                    onClick={() => {
                      setImgFileUrl(
                        imgFileUrl.filter(
                          (img, indx_two) => indx_two !== indx_one
                        )
                      );
                    }}
                  >
                    <i className="fa-solid fa-square-minus"></i>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <button className="w-32 text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-1 my-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ">
        <i className="mr-1 fa-solid fa-cloud"></i>upload images{" "}
      </button>

      <div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Fake;
