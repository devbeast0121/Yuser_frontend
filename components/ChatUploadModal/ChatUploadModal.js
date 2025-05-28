import React, { useState, useEffect } from "react";
import { BtnClose } from "./ChatUploadModal.elements";


import Modal from "react-overlays/Modal";

import Close from "../../public/icons/close.svg";

import Icon from "../Icon/Icon";
import { inject, observer } from "mobx-react";
import Dropzone from 'react-dropzone-uploader'
import { useStore } from "../../stores/RootStore";







export default inject("store")(
  observer(function ChatUploadModal(props) {
    //   H O O K S
    const rootstore = useStore();
   const [gifData, setGifData]=useState([])
    // React.useEffect(() => {
    //   async function doEffect() {
    //    // const fetchGifs =  await giphyFetch.trending({ offset:0, limit: 10 })
    //    const fetchGifs = (offset: number) =>
    //    await giphyFetch.trending({ offset, limit: 10 });
    //     console.log(fetchGifs,"data gif")
    //     setGifData(fetchGifs.data)
    //   }
    //   doEffect();
    // }, []);
    // const searchTerm = 'dogs'
    // const fetchGifs = () => giphyFetch.search(searchTerm, { offset:0, limit: 10 })
    // console.log(fetchGifs)


    const closeAll = () => {
      props.setShow(false)
    }
  
// specify upload params and url for your files
const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
// called every time a file's `status` changes
const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

// receives array of files that are done uploading when submit button is clicked
const handleSubmit = (files, allFiles) => {
  console.log(files.map(f => f.meta))
  allFiles.forEach(f => f.remove())
}

    
  
    return (

      <Modal  show={props.show} className="modal">
       <div style={{height:500,width:500,backgroundColor:"blueviolet",alignSelf:"center"}}>
       <BtnClose onClick={closeAll}>
                      <Icon
                        color="white"
                        strokeWidth="3"
                        height="auto"
                        width="24px"
                        name={Close}
                      />
                    </BtnClose>

                    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
                 
       </div>
       
      </Modal>

    );
  })
);



