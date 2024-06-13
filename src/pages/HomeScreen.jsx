import React, { Suspense } from 'react'
import { Header, MainSpinner } from "../components"
import { Route, Routes } from "react-router-dom"
import {HomeContainer} from "../containers"
import CreateTemplate from "./CreateTemplate"
import CreateResume from './CreateResume'
import TemplateDesignPinDetail from './TemplateDesignPinDetail'
const HomeScreen = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* header */}
      <Header />
      {/* custom routes */}
      <main className="w-full">
        <Suspense fallback={<MainSpinner />}>
          <Routes>
            <Route path="/" element={<HomeContainer />} />
            <Route path="/template/create" element={<CreateTemplate />} />
            <Route path="/resume/*" element={<CreateResume />} />
            <Route path="/resumeDetail/:templateID" element={<TemplateDesignPinDetail />} />
          </Routes>
        </Suspense>




      </main>
    </div>
  )
}

export default HomeScreen