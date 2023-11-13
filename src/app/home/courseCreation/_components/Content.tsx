// components/Content.js
import React from "react";

interface ContentData {
  name: string;
  fileType: string;
  comments: string;
}

interface ContentProps {
  contentData: ContentData;
}

const Content = ({ contentData }: ContentProps) => {
  return (
    <div>
      <p>{contentData.name}</p>
      {contentData.fileType === "text" ? (
        <p>Text Content</p>
      ) : (
        <p>Video Content</p>
      )}
      <p>{contentData.comments}</p>
    </div>
  );
};

export default Content;
