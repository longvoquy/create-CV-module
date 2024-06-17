import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TemplatesData } from '../components/support'
const CreateResume = () => {
  return (
    <div className='w-full flex flex-col items-center justify-class py-4'>
      <Routes>
        {TemplatesData.map(template => (
          <Route
            key={template?.id}
            path={`/${template.name}`}
            Component={template.component} />
        ))}
      </Routes>
    </div>
  )
}

export default CreateResume