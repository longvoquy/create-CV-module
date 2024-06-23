import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import { getTemplateDetails } from '../api';
import { MainSpinner } from '../components';
import { FaHouse } from 'react-icons/fa6';
import { BiSolidHeart } from 'react-icons/bi';
import { AnimatePresence } from 'framer-motion';
import TemplateDesignPin from '../components/TemplateDesignPin'
import useTemplate from '../hook/useTemplates';

const TemplateDesignPinDetail = () => {
  const { templateID } = useParams();
  const { data, isError, isLoading, Fetched } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );
  const { data: templates,
    isLoading: temp_loading,
    refetch: temp_refetch
  } = useTemplate();

  if (isLoading) {
    return <MainSpinner />;
  }
  if (isError) {
    return (
      <div className='w-full h-[60vh] flex flex-col items-center justify-center'>
        <p className='text-lg text-txtPrimary font-semibold'>Error when fetching data....Please try again</p>
      </div>)
  }
  return (
    <div className='w-full flex items-centere justify-start flex-col px-4 py-12'>
      template
      {/* bread crump */}
      <div className='w-full flex items-center pb-8 gap-2'>
        <Link
          to={"/"}
          className='flex items-center gap-2 text-txtPrimary text-sm justify-center'
        />
        <FaHouse />Home
        <p>/</p>
        <p>{data?.name}</p>
      </div>
      {/* design main section */}
      <div className='w-full grid grid-cols-1 lg:grid-cols-12'>
        {/* left section */}
        <div className='col-span-1 lg:col-span-8 flex items-start justify-start gap-4'>
          {/* template image */}
          <img className='w-full h-auto object-contain rounded-md'
            src={data?.imageURL}
            alt=''
          />
          {/* title and other option */}
          <div className='w-full flex flex-col items-start justify-start gap-2'>
            {/* title section */}
            <div className='w-full flex items-start justify-between'>
              {/* title */}
              <p className='text-base text-txtPrimary font-semibold'>{data?.title}</p>
              {/* like */}
              {data?.favourites?.length > 0 && (
                <div className='flex items-center gap-1 justify-center'>
                  <BiSolidHeart className='text-base text-red-500' />
                  <p className='text-base text-txtPrimary font-semibold'>{data?.favourites?.length} likes</p>
                </div>
              )}
            </div>
            {/* collection favourite options */}

          </div>
        </div>
        {/* right section */}
        <div className='col-span-1 lg:col-span-4 w-full flex flex-col items-center justify-start px-3 gap-6'>
          <div className='w-full h-72 bg-blue-200 rounded-md oveflow-hidder relative' style={{ background: "url(https://raw.githubusercontent.com/longvoquy/bg/main/vscode-bg.jpg)", backgroundPosition: "center", backdropSize: "cover" }}>
            {/* discover more option  */}
            <div className='absolute inset-0 flex items-center justify-center bg-[rbga(0,0,0,4)]'>
              <Link to={"/"} className='px-4 py-2 rounded-md border-gray-200 text-white'>
                Discover More
              </Link>
            </div>
          </div>

          {/* edit the template option  */}
          <Link
            className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer'
            to={`/resume/${data?.name}?templateId=${templateID}`} >
            <p className='text-white font-semibold text-lg'> Edit this template </p>
          </Link>

          {/* {data?.map(template => (
            <Link
              key={template.id} // Assuming 'id' is the unique identifier
              to={`/resume/${data?.name}?templateId=${templateID}`}
              className='w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer'
            >
              <p className='text-white font-semibold text-lg'> Edit this template </p>
            </Link>
          ))} */}


          {/* tags */}
          <div className='w-full flex items-center justify-start flex-warp gap-2'>
            {data?.tag?.map((tag, index) => (
              <p className='text-xs boder border-gray-300 px-2 py-1 rounded-md whitespace-nowrap'>
                key={index}
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* similar template */}

      {templates?.filter((temp) => temp._id !== data?._id).length > 0 && (
        <div className='w-full py-8 flex flex-col items-start justify-start gap-4'>
          <p className='text-lg font-semibold text-txtDark'> You might also likes</p>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
            <React.Fragment>
              <AnimatePresence>
                {
                  templates?.filter((temp) => temp._id !== data?._id).map((templates, index) => (
                    <TemplateDesignPin
                      key={templates?._id}
                      data={templates}
                      index={index} />
                  )
                  )}
              </AnimatePresence>
            </React.Fragment>
          </div>
        </div>

      )}
    </div>
  )
}

export default TemplateDesignPinDetail