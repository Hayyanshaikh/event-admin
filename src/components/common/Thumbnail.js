import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as Icons from "react-icons/tb";
import Button from './Button.js'

const Thumbnail = ({ className, required, preloadedImage }) => {
  const [uploadedImage, setUploadedImage] = useState(preloadedImage || null);

  const onDrop = (acceptedFiles) => {
    setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className={`thumbnail ${className ? className : ""}`}>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <figure>
          {uploadedImage ? (
            <img src={uploadedImage} alt="Product Thumbnail" />
          ) : (
            <div className="image_upload">
              <Icons.TbCloudUpload/>
              <span>Drag & drop image here</span>
              <small>or <strong>file browse</strong> from device</small>
              <Button
                label="browse file"
                className="sm"
              />
            </div>
          )}
          <Icons.TbPencil className="thumbnail_edit" />
        </figure>
      </div>
      {required ? <small>{required}</small> : ""}
    </div>
  );
};

export default Thumbnail;
