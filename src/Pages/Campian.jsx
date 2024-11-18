import React, { useContext } from 'react'
import Category from '../Components/Category'
import { AppProvider } from '../ContextApi/Api';
import CampianData from './CampianData';

const Campian = () => {
  const {item} = useContext(AppProvider);
  return (
    <>
    <div className="container capian-secation 2xl:px-7">
        <div className=" px-12">
            <div className="capion-heading 2xl:px-12">
                <h1 className='2xl:px-12'>Campaigns</h1>
            </div>
            <div className="event-banner"></div>
        </div>

        {/* <Category /> */}
        <CampianData />
    </div>
    </>
  )
}

export default Campian