import hero_img from "/Frame.png"
import vector from "/Vector.png"
import hero_design_1 from "/24.png"
import hero_design_2 from "/62.png"
import { useNavigate } from "react-router-dom"

const FeaturePage = () => {
  const navigate = useNavigate()

  const handleClickSigin = () => {
    navigate("/signup")
  }

  return (
    <div className="bg-[#e8e7fd] w-[100%] h-screen relative">

      <img src={hero_design_1} alt="" className="absolute top-110 w-7 md:w-auto -left-4 md:left-0"/>
      <img src={hero_design_2} alt="" className="absolute top-94 md:top-70 md:right-0 -right-1 w-7 md:w-auto"/>

      <div className="padding flex h-full items-center flex-col md:flex-row md:gap-8 lg:gap-0">
        <div className="md:w-1/2 flex justify-between">
          <img src={hero_img} alt="" className="lg:w-3/4 mt-14 md:mt-0"/>
        </div>

        <div className="md:w-1/2 flex flex-col mb-12 lg:mb-28">
          <p className="text-4xl lg:text-6xl font-semibold lg:leading-17">Managing investment<br className="hidden lg:block"/> has never been <div className="inline-block">easier<img src={vector} className="hidden md:block w-[12vw]" alt=""/></div></p>
          <p className="text-gray-600 text-base mt-6">Investment management refers to the handling of financial assets and other investments—not only buying and selling them.</p>
          <button onClick={handleClickSigin} className="mt-6 self-start bg-primary px-6 py-2 rounded-sm text-base text-white  hover:bg-purple-200 hover:text-primary transition-all cursor-pointer">Let’s Get a Rich</button>
        </div>
      </div>
    </div>
  )
}

export default FeaturePage
