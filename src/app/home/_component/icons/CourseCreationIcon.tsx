import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface CourseCreationIconProps {
  size?: string;
  color?: string;
  marginLeft?: string;
}

const CourseCreationIcon: React.FC<CourseCreationIconProps> = ({
  size = "1x",
  color = "black",
  marginLeft = "0",
}) => {
  return (
    <FontAwesomeIcon
      icon={faPlus}
      style={{ fontSize: size, color, marginLeft }}
    />
  );
};

export default CourseCreationIcon;
