 import React, { useEffect, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { keepImgs, emptyKeepImgs } from "../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";


 const ImgToFirebase = ({ handlePImgs }) => {
const fakearr = []
     
    const { productImages } = useSelector((state) => state.product);
    const dispatch = useDispatch()

   const [imgFile, setImgFile] = useState(null); // having imgs from from computer:object
   const [imgFileUrl, setImgFileUrl] = useState([]); // having locat host urls:array

const [iurl,setIurl] = useState(null)


   const [loading, setLoading] = useState(null);
   const [err, setErr] = useState(null);

   const [productImgs, setProductImgs] = useState([]); // having all the firebase imgs

   useEffect(() => {
     const makeImgUrl = (e) => {
       let temp = [];

       for (let i = 0; i < imgFile.length; i++) {
         //  console.log(imgFile[i]);
         temp.push(URL.createObjectURL(imgFile[i]));
       }
       setImgFileUrl(temp);
    //    productImages !== null ? dispatch(keepImgs([...productImages,...temp])):dispatch(keepImgs(temp))
     };
     if (imgFile) {
       makeImgUrl();
     }
   }, [imgFile]);

   const handleImgUpload = async () => {
     console.log("img uploading");
     
     if (!imgFile) {
       console.log("nothing to upload");
       return;
     }
     let tempProdImgs = []; 
     for (let i = 0; i < imgFile.length; i++) {
       const storage = getStorage(app);
       const filename = new Date().getTime() + imgFile[i].name;
       const storageRef = ref(storage, filename);
       const uploadTask = uploadBytesResumable(storageRef, imgFile[i]);

       uploadTask.on(
         "state_changed",
         (snapshot) => {
           const progress =
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
           setLoading(progress.toFixed(0));
         },
         (error) => {
           setErr(error);
           setLoading(null);
           console.log(error);
         },

         () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { 
             tempProdImgs.push(downloadURL);
             fakearr.push(downloadURL);//------------------------
            //  console.log(tempProdImgs); // array
             setProductImgs([...tempProdImgs]); 
            if(productImages===null){
                // console.log('its null')
                dispatch(keepImgs([...tempProdImgs]))
            }else{
                // console.log('its not null')
                dispatch(keepImgs([...productImages, ...tempProdImgs]))
            }


            //  console.log(downloadURL); // single string 
             setLoading(null);
             setErr(null);
           });


         }
       );
     }
    //  console.log('tempProdImgs:',tempProdImgs)
   };

  
console.log('productImages:',productImages)
console.log('productImgs:',productImgs)
console.log('fakearr:', fakearr )
   return (
     <div>
       <div className="relative z-0 w-full mb-5 group border-2 border-green-700 rounded-xl p-2">
         <div className=" ">
           <label
             className=" block mb-2 text-sm  text-gray-500 dark:text-white"
             htmlFor="file_input"
           >
             Upload img to firebase storage
           </label>
           <span className="text-xs mx-2 ">
             *select single/multiple <span className="font-bold">at once</span>
           </span>

           <input
             className=" mb-1 block w-full text-sm text-blue-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
             id="file_input"
             type="file"
             onChange={(e) => {
               // console.log(e.target.files);
               setImgFile(e.target.files);
             }}
             multiple
           />
         </div>

         {/* --- img noy uploaded yet ---  */}
         <div className="flex flex-row flex-wrap justify-start">
           {imgFileUrl &&
             imgFileUrl.map((i, indx_one) => {
               return (
                 <div className=" flex flex-col justify-between items-center  border border-green-600 rounded-xl m-1">
                   <img src={i} className="w-12 m-1 rounded-sm" alt="" />
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

         <button
           onClick={handleImgUpload}
           className="w-32 text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-1 my-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  "
         >
           <i className="mr-1 fa-solid fa-cloud"></i>upload images{" "}
         </button>

         {/* --- upload loading --- */}
         {loading && (
           <div>
             <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
               <div
                 className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                 style={{ width: `${loading}%` }}
               />
             </div>
           </div>
         )}

         <div className="flex flex-row justify-start gap-2 flex-wrap">
           {productImgs.length !== 0 &&
             productImgs.map((i) => {
               return (
                 <div className="border border-green-700 p-1 flex flex-col justify-center items-center">
                    <span>{productImgs.length}</span>
                   <img src={i} className="w-10" />
                   <span className="text-xs text-blue-500 flex flex-row items-center">
                     <i className="mr-1 fa-solid fa-circle-check"></i>uploaded
                   </span>
                 </div>
               );
             })}
         </div>
       </div>

             {/* --- img by taking url ---  */}
       <div className="relative z-0 w-full mb-5 group border-2 border-green-700 rounded-xl p-2">
         <input
           type="text"
           name="images"
           id="images"
           onChange={(e) => {
             setIurl(e.target.value);
           }}
           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
           placeholder=" "
           value={iurl}
           required
         />
         <label
           htmlFor="images"
           className="ms-2 mt-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
         >
           Image URL
         </label>

         <button
           onClick={() => {
            //  productImages !== null
            //    ? dispatch(keepImgs([...productImages, iurl]))
            //    : dispatch(keepImgs([iurl]));
            if(productImages === null ){
                dispatch(keepImgs([iurl]));
            }else{
                dispatch(keepImgs([...productImages, iurl]));
            }
            
             setIurl("");
           }}
           type="button"
           className="mt-5 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-0 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
         >
           <i className="text- mr-1 fa-solid fa-plus"></i>add url
         </button>

         <button type="button" onClick={() => dispatch(emptyKeepImgs())}>
           emptykeepimgs
         </button>
       </div>

       <div>
         <ul className="flex flex-row justify-around flex-wrap ">
           {productImages!== null &&
             productImages.map((i, indx) => {
               return (
                 <div key={indx} className="border-2 border-green-700  my-2 mx-1  px-2">
                   <h1 className=" text-center ">{indx + 1}</h1>
                   <img src={i} className="w-20 rounded-xl m-1" alt="" />
                   <div className="  flex flex-row justify-center">
                     <button className="  flex flex-row items-center justify-center">
                       <i className="text-red-700 hover:text-red-900 fa-solid fa-square-minus"></i>
                     </button>
                   </div>
                 </div>
               );
             })}
         </ul>
       </div>
     </div>
   );
 };

 export default ImgToFirebase;
