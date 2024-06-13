import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { initialTags } from '../components/support';
import { serverTimestamp, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import useTemplate from '../hook/useTemplates';

const CreateTemplate = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: null,
  });

  const [imageAsset, setImageAsset] = useState({
    isImageLoading: false,
    uri: null,
    progress: 0
  });

  const [selectedTag, setselectedTag] = useState([]);

  const {
    data: templates,
    isError: templatesIsError,
    isLoading: templateIsLoading,
    refetch: templateRefetch
  } = useTemplate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevRec) => ({ ...prevRec, [name]: value }));
  };

  const handleFileSelect = async (e) => {
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      const storageRef = ref(storage, `Template/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', (snapshot) => {
        setImageAsset((prevAsset) => ({
          ...prevAsset,
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        }));
      },
        (error) => toast.error(`Error : ${error.message}`),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageAsset((prevAsset) => ({
              ...prevAsset,
              uri: downloadURL,
            }));
          });
          toast.success('Image upload successful');
          setTimeout(() => {
            setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: false }));
          }, 2000);
        });
    } else {
      toast.info("Invalid file format");
    }
  };

  const deleteAnObject = async (e) => {
    setTimeout(() => {
      setImageAsset((prevAsset) => ({ ...prevAsset, progress: 0, uri: null }));
    }, 2000);
    setImageAsset((prevAsset) => ({ ...prevAsset, isImageLoading: true }));
    const deleteRef = ref(storage, imageAsset.uri);
    deleteObject(deleteRef).then(() => {
      toast.success('Image delete successful');
    });
  };

  const handleSelectTags = (tag) => {
    if (selectedTag.includes(tag)) {
      setselectedTag(selectedTag.filter(selected => selected !== tag));
    } else {
      setselectedTag([...selectedTag, tag]);
    }
  };

  const pushToCloud = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formData.title,
      imageURL: imageAsset.uri,
      tag: selectedTag,
      name: templates && templates.length > 0
        ? `Template ${templates.length + 1}`
        : "template 1",
      timestamp: timestamp,
    };
    await setDoc(doc(db, "templates", id), _doc).then(() => {
      setFormData({ title: "", imageURL: "" });
      setImageAsset({ isImageLoading: false, uri: null, progress: 0 });
      setselectedTag([]);
      templateRefetch();
      toast.success("Push template to the cloud");
    }).catch(error => {
      toast.error(`Error: ${error.message}`);
    });
  };

  const isAllowed = (file) => {
    const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];
    return allowedTypes.includes(file.type);
  };

  const removeTemplate = async (template) => {
    const deleteRef = ref(storage, template?.imageURL);
    await deleteObject(deleteRef).then(async () => {
      await deleteDoc(doc(db, "templates", template?._id)).then(() => {
        toast.success("Template successfully removed");
        templateRefetch();
      }).catch(err => {
        toast.error(`Error: ${err.message}`);
      });
    });
  };

  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-txtPrimary">Create a new Template</p>
        </div>
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-txtLight uppercase font-semibold">Template ID:</p>
          <p className="text-sm text-txtDark capitalize font-botl">
            {templates && templates.length > 0
              ? `Template ${templates.length + 1}`
              : "template 1"}
          </p>
        </div>
        <input
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-txtPrimary focus:text-txtDark focus:shadow-md outline-none"
          type="text"
          name="title"
          placeholder="Template title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[620px] 2xl:h-[740px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageAsset.isImageLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <PuffLoader color="#0000FF" size={40} />
              <p>{imageAsset.progress.toFixed(2)}%</p>
            </div>
          ) : (
            !imageAsset.uri ? (
              <label className="w-full cursor-pointer h-full">
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="flex items-center justify-center cursor-pointer flex-col gap-4">
                    <FaUpload className="text-2xl" />
                    <p className="text-lg text-txtLight">Click to upload</p>
                  </div>
                </div>
                <input type="file" className="w-0 h-0" accept=".jpg,.png,.jpeg" onChange={handleFileSelect} />
              </label>
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <img src={imageAsset.uri} className="w-full h-full object-cover" loading="lazy" alt="" />
                <div className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer" onClick={deleteAnObject}>
                  <FaTrash className="text-sm text-white" />
                </div>
              </div>
            )
          )}
        </div>
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, i) => (
            <div key={i} className={`border border-gray-400 px-2 py-1 rounded-md cursor-pointer ${selectedTag.includes(tag) ? "bg-blue-500 text-white" : ""}`} onClick={() => handleSelectTags(tag)}>
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        <button type="button" className="w-full bg-blue-300 text-white rounded-md py-3" onClick={pushToCloud}>
          Upload Template
        </button>
      </div>
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 bg-green-200 px-2 w-full flex-1 py-4">
        right container
        {templateIsLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <PuffLoader color="#498FCD" size={40} />
          </div>
        ) : (
          templates && templates.length > 0 ? (
            <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4">
              {templates.map(template => (
                <div key={template._id} className="w-full h-[500px] rounded-md overflow-hidden relative">
                  <img src={template.imageURL} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center bg-red-500 cursor-pointer" onClick={() => removeTemplate(template)}>
                    <FaTrash className="text-sm text-white" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
              <p className="text-xl tracking-wider capitalize text-txtPrimary">
                No data
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
