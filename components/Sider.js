import { useRouter } from 'next/router';
import { useState } from 'react';

const Sider = ({info}) => {
 const router = useRouter();
 const [isHovered, setIsHovered] = useState(false);

 function handleClick() {
    router.push(`/mangainformation/${info?.chapter.md_comics.slug}`);
  }
  return (
    <div className={`sticky top-0 z-50 flex items-center cursor-pointer justify-start`}
      onClick={()=>handleClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    <img className="opacity-80 w-14 hover:opacity-100" src="https://img.icons8.com/doodle/480/null/satoru-gojo.png"/>
      <h1 className={`text-black bg-[#a4814c] p-1 rounded-md  ${isHovered ? "visible" : "invisible"}`}>Click me to go Back</h1>
    </div>
  )
}

export default Sider
