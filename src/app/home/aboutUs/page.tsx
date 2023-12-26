import PopupWindow from "../_component/PopupWindow";
import Image from "next/image";
import defaultImageCourse from "@/../public/assets/default-course-image.png";
const AboutUs = () => {
  
  return (
    <div>
      <Image
        src={defaultImageCourse}
        alt="Default Course Image"
        width={300}
        height={200}
      />
    </div>
  );
};



export default AboutUs;
