import React, { useState } from 'react'
import { MdLayersClear } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { slideUpDownWithScale } from '../animations'
import { FiltersData } from './support'
import useFilter from '../hook/useFilter'
import { useQueryClient } from 'react-query'

const Filters = () => {
    const [isClearHovered, setIsClearHovered] = useState(false)

    const { data: filterData, isLoading, isError } = useFilter();
    const queryClient = useQueryClient();
    const handleFilterValue = (value) => {

        // const previousState = queryClient.getQueryData("globalFilter");
        // const updateState ={...previousState, searchTerm: value}
        // queryClient.setQueryData("globalFilter", updateState);
        //set 3 to 1
        queryClient.setQueryData("globalFilter",
            {
                ...queryClient.getQueryData("globalFilter"),
                searchTerm: value
            });
    }
    const clearFilter = () => {
        queryClient.setQueryData("globalFilter",
            {
                ...queryClient.getQueryData("globalFilter"),
                searchTerm: ""
            });
    }
    return (
        <div className="w-full flex items-center justify-start py-4">
            <div className="border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative"
                onMouseEnter={() => setIsClearHovered(true)}
                onMouseLeave={() => setIsClearHovered(false)}
                onClick={clearFilter}
            >
                <MdLayersClear className="text-xl" />
                <AnimatePresence>
                    {isClearHovered && (
                        <motion.div
                            {...slideUpDownWithScale}
                            className='absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1'
                        >
                            <p className="whitespace-nowarp text-xs">Clear All</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className='w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none'>
                {FiltersData && FiltersData.map((item) => (
                    <div key={item.id}
                        className={`border border-gray-300 rounded-md px-3 py-2 cursor-pointer group hover:shadow-md ${filterData?.searchTerm === item.value && "bg-gray-300 shadow-md"}`}
                        onClick={() => handleFilterValue(item.value)}
                    >
                        <p className="text-sm text-txtPrimary group-hover:text-txtDark whitespace-nowrap">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Filters