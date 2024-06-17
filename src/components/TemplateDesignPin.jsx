import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FadeInOutWIthOpacity, scaleInOut } from '../animations'
import { BiFolderPlus, BiHeart } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


const TemplateDesignPin = ({ data, index }) => {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const addToCollection = async () => {

    }
    const addToFavourite = async () => {
    }


    const handleRouteNavigation = () => {
        navigate(`/resumeDetail/${data?._id}`, { replace: true })
    }
    return (
        <motion.div
            key={data?._id}
            {...scaleInOut(index)}
        >
            <div className='w-full h-[500px] 2xl:h-[740px] rounded-md bg-gray-300 overflow-hidden relative'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <img
                    src={data?.imageURL}
                    classNam='w-full h-full object-cover'
                    alt=''
                />
                <AnimatePresence>
                    <motion.div
                        {...FadeInOutWIthOpacity}
                        onClick={handleRouteNavigation}
                        className='absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-center px-4 py-3 z-50 cursor-pointer'
                    >
                        <div className='flex flex-col items-end justify-start w-full gap-8'>
                            <InnerBoxCard label={'Add to collection'} Icon={BiFolderPlus} onHandle={addToCollection} />
                            <InnerBoxCard label={'Add to favourite'} Icon={BiHeart} onHandle={addToFavourite} />
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </motion.div>
    );
};
const InnerBoxCard = ({ label, Icon, onHandle }) => {
    const [isHovered, setIsHovered] = useState(false);
    <div onClick={onHandle}
        className='w-10 h-10 rounded-md bg-gray-200 items-center justify-center hover:shadow-md relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <Icon className='text-base text-txtPrimary cursor-pointer' />
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, scale: .6, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 50 }}
                    exit={{ opacity: 0, scale: .6, x: 50 }}
                    className='px-3 py-2 rounded-md bg-gray-200 absolute -left-44 after:w-2 after:h-2 after:absolute after:-right-1 after:bg-gray-200 after:top-[14px] after:rotate-45'>
                    <p>{label}</p>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
}

export default TemplateDesignPin