import React from 'react';


const getFileData = (file) => {
   if (typeof file === 'string') {
      return file
   };
   return URL.createObjectURL(file)
};


const ImageViewer = ({ src, className, ...others }) => {
   return (
      <img src={getFileData(src)} className={className}  {...others} style={{ objectFit: "contain" }} />
   )
}

export default ImageViewer;