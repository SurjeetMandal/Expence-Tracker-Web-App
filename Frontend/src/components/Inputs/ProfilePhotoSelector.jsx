import { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({image, setImage}) => {

  const inputRef = useRef(null);
  const[previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if(file){
        // Update image state
        setImage(file)

        // Genereate preview URL from the file
        const preview = URL.createObjectURL(file)
        setPreviewUrl(preview)
    }
  }

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null)
  }

  const onChooseFile = () => {
    inputRef.current.click();
  }

  return (
    <div className='w-full flex justify-center mb-6'>
      <input type="file" 
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden' 
      />
      {
        !image ? (
          <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
            <LuUser className='text-4xl text-primary'/>

            <button type='button' onClick={onChooseFile} 
              className="cursor-pointer w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"  
            >
              <LuUpload />
            </button>

          </div>
        ) : (
          <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>

            <img src={previewUrl} alt="profilePhoto" 
              className='w-20 h-20 rounded-full object-cover'
            />

            <button type='button' onClick={handleRemoveImage} 
              className='cursor-pointer w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
            >
              <LuTrash />
            </button>

          </div>
        )
      }
    </div>
  )
}

export default ProfilePhotoSelector;
