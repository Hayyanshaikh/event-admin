import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import Input from "../../components/common/Input.js";
import Modal from "../../components/common/Modal.js";
import Alert from "../../components/common/Alert.js";
import Badge from "../../components/common/Badge.js";
import Button from "../../components/common/Button.js";
import Profile from "../../components/common/Profile.js";
import CheckBox from "../../components/common/CheckBox.js";
import Dropdown from "../../components/common/Dropdown.js";
import Textarea from "../../components/common/Textarea.js";
import Pagination from "../../components/common/Pagination.js";
import PageHeading from "../../components/common/PageHeading.js";
import SelectOption from "../../components/common/SelectOption.js";

const Media = () => {
  const [filterImages, setFilterImages] = useState("");
  const [alertActive, setAlertActive] = useState({
    title: "",
    desc: "",
    action: "",
  });
  const [media, setMedia] = useState([]);
  const [renderMedia, setRenderMedia] = useState(media);

  const [imageDetail, setImageDetail] = useState();

  const handleUploadFile = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageURL = URL.createObjectURL(selectedFile);
      setRenderMedia([
        ...media,
        {
          url: imageURL,
          name: selectedFile.name,
          lastModifiedDate: selectedFile.lastModifiedDate.toLocaleDateString(),
          type: selectedFile.type.split("/")[1],
          size: formatFileSize(selectedFile.size),
        },
      ]);
      setMedia([
        ...media,
        {
          url: imageURL,
          name: selectedFile.name,
          lastModifiedDate: selectedFile.lastModifiedDate.toLocaleDateString(),
          type: selectedFile.type.split("/")[1],
          size: formatFileSize(selectedFile.size),
        },
      ]);
    }
  };

  const handleFileterImages = (value) => {
    setFilterImages(value);
    var filterValue = new RegExp(value, "i");
    setRenderMedia(
      media.filter((item) =>
        [item.name].some((field) => filterValue.test(field))
      )
    );
  };

  const handleSelectedImage = (name, url, lastModifiedDate, type, size) => {
    setImageDetail({
      url: url,
      name: name,
      lastModifiedDate: lastModifiedDate,
      type: type,
      size: size,
    });
  };

  const handleSingleImageDownload = (url, name) => {
    if (url) {
      setTimeout(() => {
        saveAs(url, name);
      }, 1000);
    }
    setAlertActive({
      title: "Download Image",
      desc: name,
      action: "active",
    });
    setTimeout(() => {
      setAlertActive({
        title: "Download Image",
        desc: name,
        action: "",
      });
    }, 5000);
  };

  const iconClick = (value) => {
    navigator.clipboard.writeText(value);
    setAlertActive({
      title: "Copied Link",
      desc: value,
      action: "active",
    });
    setTimeout(() => {
      setAlertActive({
        title: "Copied Link",
        desc: value,
        action: "",
      });
    }, 5000);
  };

  const formatFileSize = (size) => {
    const KB = 1024;
    const MB = KB * 1024;
    if (size < KB) {
      return size + " B";
    } else if (size < MB) {
      return (size / KB).toFixed(2) + " KB";
    } else {
      return (size / MB).toFixed(2) + " MB";
    }
  };

  const hanldeReload = () => {
    setMedia([]);
    setRenderMedia([]);
  };

  const handleAllImagesDownload = async () => {
    const zip = new JSZip();

    await Promise.all(
      media.map(async (image, index) => {
        const imageUrl = image.url;
        const imageName = image.name;

        try {
          const response = await fetch(imageUrl);

          const blob = await response.blob();
          zip.file(`${image.name}.${image.type}`, blob);

          if (index === media.length - 1) {
            const content = await zip.generateAsync({ type: "blob" });
            saveAs(content, "all_images.zip");
          }
        } catch (error) {
          console.error(error);
        }
      })
    );
  };

  const handleDropPlace = (ev) => {
    ev.preventDefault();
    var item = ev.dataTransfer.items;
    [...item].forEach((it, i) => {
      if (it.kind === "file") {
        const file = it.getAsFile();

    if (ev.target.classList.contains("drag")) {
      ev.target.classList.remove("dragover");
    }
        const imageURL = URL.createObjectURL(file);
        setRenderMedia([
          ...media,
          {
            url: imageURL,
            name: file.name,
            lastModifiedDate: file.lastModifiedDate.toLocaleDateString(),
            type: file.type.split("/")[1],
            size: formatFileSize(file.size),
          },
        ]);
        setMedia([
          ...media,
          {
            url: imageURL,
            name: file.name,
            lastModifiedDate: file.lastModifiedDate.toLocaleDateString(),
            type: file.type.split("/")[1],
            size: formatFileSize(file.size),
          },
        ]);
      }
    });
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };
  const handleDragEnter = (ev) => {
    ev.preventDefault();
    if (ev.target.classList.contains("drag")) {
      ev.target.classList.add("dragover");
    }
  };
  const handleDragLeave = (ev) => {
    ev.preventDefault();
    if (ev.target.classList.contains("drag")) {
      ev.target.classList.remove("dragover");
    }
  };
  return (
    <>
      <section className="media">
        <PageHeading>
          <h2 className="page_heading">Media Upload File</h2>
          <div className="page_heading_btns hide_600">
            <label className="button sm" onChange={handleUploadFile}>
              <input type="file" />
              <span>Add File</span>
              <Icons.TbPlus />
            </label>
          </div>
        </PageHeading>
        <div className="container">
          <div className="sec_main">
            <div className="sec_main_wrapper">
              <div className="sec_main_wrapper_item">
                <div className="media_main">
                  <div className="media_head">
                    <div className="media_features">
                      <label className="button sm">
                        <input
                          type="file"
                          id="addFile"
                          onChange={handleUploadFile}
                        />
                        <span>Add File</span>
                        <Icons.TbPlus />
                      </label>
                      <Button
                        label="download all"
                        className="sm outline"
                        onClick={handleAllImagesDownload}
                        icon={<Icons.TbDownload />}
                      />
                      <Button
                        label="Refresh"
                        className="sm outline"
                        onClick={hanldeReload}
                        icon={<Icons.TbReload />}
                      />
                    </div>
                    <Input
                      type="text"
                      value={filterImages}
                      onChange={handleFileterImages}
                      placeholder="Search Image..."
                      icon={<Icons.TbSearch />}
                    />
                  </div>
                  <div className="media_body">
                    <div className="media_files_wrapper">

                  <label  
                    htmlFor="addFile"
                    className="drag file_upload_content"
                    onDragLeave={handleDragLeave}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDropPlace}
                    onDragOver={dragOverHandler}>
                    <h4>Drag your documents, photos, or videos here to start uploading.</h4>
                    <span>OR</span>
                    <label className="button sm" onChange={handleUploadFile}>
                      <input type="file" />
                      <span>brows file</span>
                    </label>
                  </label>
                      <div className="media_files">
                      {renderMedia.map((file, key) => (
                        <button
                          className="media_file"
                          key={key}
                          onClick={() =>
                            handleSelectedImage(
                              file.name,
                              file.url,
                              file.lastModifiedDate,
                              file.type,
                              file.size
                            )
                          }
                        >
                          <figure className="media_file_img">
                            <img src={file.url} alt="" />
                          </figure>
                          <div className="media_file_name">
                            <span className="line_clamp">{file.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    </div>
                    {imageDetail && (
                      <div className="media_preview">
                        <figure className="media_preview_img">
                          <img src={imageDetail.url} alt="" />
                        </figure>
                        <ul>
                          <li>
                            <Alert
                              icon={<Icons.TbSquareRoundedCheck />}
                              title={alertActive.title}
                              description={alertActive.desc}
                              className={`success ${alertActive.action}`}
                            />
                            <Input
                              type="text"
                              value={imageDetail.url}
                              // onChange={handleFileterImages}
                              label="Full Url"
                              placeholder="Search Image..."
                              icon={<Icons.TbCopy />}
                              onClick={() => iconClick(imageDetail.url)}
                            />
                          </li>
                          <li className="line_clamp break_all">File Name : {imageDetail.name}</li>
                          <li className="line_clamp break_all">File Type : {imageDetail.type}</li>
                          <li className="line_clamp break_all">File Size : {imageDetail.size}</li>
                          <li className="line_clamp break_all">
                            Last modify date : {imageDetail.lastModifiedDate}
                          </li>
                          <li className="line_clamp">
                            <Button
                              label="download"
                              className="sm outline"
                              onClick={() =>
                                handleSingleImageDownload(
                                  imageDetail.url,
                                  imageDetail.name
                                )
                              }
                              icon={<Icons.TbDownload />}
                            />
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Media;
