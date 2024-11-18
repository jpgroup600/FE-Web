import React from 'react'
import Shop from "../assets/images/Shop.svg"
import User from "../assets/images/users.svg"
import { Link } from 'react-router-dom'


const OptionSingup = () => {
  return (
    <>
    <div class="flex justify-center items-center h-80 ">
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-8">회원가입</h1>
    
    <div class="flex space-x-8">
      {/* <!-- Individual / Business Member Section --> */}
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full border border-orange-300">
          <img src={Shop} alt='' />
        </div>
        <div className='shop-link'>
            <Link to="/signup2">
        <p class="mt-2 text-center text-orange-600">개인/기업으로 가입</p>
        </Link>
        </div>
      </div>

      {/* <!-- General Member Section --> */}
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center w-20 h-20 rounded-full  ">
          <span class="text-green-600 text-4xl"></span>
        </div>
        <p class="mt-2 text-center text-gray-700"></p>
      </div>

      {/* <!-- Influencer Section --> */}
      <div class="flex flex-col items-center">
        <div class="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full border border-green-300">
        <img src={User} alt='' />
        </div>
        <div className='shop-link  border-green-300'>
            <Link to="/signup3">
        <p class="mt-2 text-center text-green-600">인플루언서로 가입</p>
        </Link>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default OptionSingup