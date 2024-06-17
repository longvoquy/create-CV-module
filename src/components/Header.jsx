import { AnimatePresence, motion } from 'framer-motion';
import React from 'react'
import { queryClient } from 'react-query'
import  useFilter from '../hook/useFilter';
import { FadeInOutWIthOpacity } from '../animations';
const Header = () => {
  const { data: filterData } = useFilter();
  const handleSearchTerm = (e) => {
    queryClient.setQueryData("globalFilter",
      {
        ...queryClient.getQueryData("globalFilter"),
        searchTerm: e.target.value
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

    /* input */
    <div className="flex-1 border border-gray-300 px-4 py-1 rounded-md flex items-center justify-between bg-gray-200">
      <input
        value={filterData?.searchTerm ? filterData?.searchTerm : ""}
        onChange={handleSearchTerm}
        type="text"
        placeholder='Search here .....'
        className="flex-1 outline-none border-none h-10 bg-transparent text-base font-semibold" />
      <AnimatePresence>
        {filterData?.searchTerm.length > 0 && (
          <motion.div
            {...FadeInOutWIthOpacity}
            onClick={clearFilter}
            className='w-8 h-8 flex items-center justify-center bg-gray-300 rounded-md cursor-pointer active:scale-95 duration-150'>
            <p className='text-2xl text-black' >x</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    /* profile section*/
  );
};

export default Header