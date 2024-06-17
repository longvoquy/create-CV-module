import React from 'react'
import Filters from '../components/Filters'
import TemplateDesignPin from '../components/TemplateDesignPin'
import useTemplate from '../hook/useTemplates'
import { AnimatePresence } from 'framer-motion';
const HomeContainer = () => {


  const { data: templates,
    isError: temp_isError,
    isLoading: temp_isLoading,
    refetch: temp_refetch }
    = useTemplate();

  const RenderAnTemplate = ({ templates }) => {
    return (
      <React.Fragment>
        {templates && templates.length > 0 ? (
          <React.Fragment>
            <AnimatePresence>
              {templates && templates.map((templates, index) => (
                <TemplateDesignPin
                  key={templates?._id}
                  data={templates}
                  index={index} />
              )
              )}
            </AnimatePresence>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className='text-lg text-txtDark'>No template found</p>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
  return (

    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      HomeContainer

      {/* filter section */}
      <Filters />
      {/* render tmeplate-resume PIN */}
      {temp_isError ? (<React.Fragment>
        <p className='text-lg text-txtDark'>somethine went wrong... Please try again later</p>
      </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='w-full grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
            <RenderAnTemplate templates={templates} />
          </div>
        </React.Fragment>)}
    </div>
  )
}


export default HomeContainer