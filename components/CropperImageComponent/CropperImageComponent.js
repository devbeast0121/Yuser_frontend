import React, { useState, useCallback } from 'react'
import {
    Overlay,
    MainContainer,
    CropperContainer,
    BottomContainer,
    MiddleContainer,
    ZoomText
} from './CropperImageComponent.elements';
import Button from '../Button/Button';
import { COLORS, SPACING } from '../../styles/Styling.js';
import Cropper from 'react-easy-crop';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { nanoid } from 'nanoid';
import client from '../../pages/api/client';
import { inject, observer } from 'mobx-react';
import { useStore } from '../../stores/RootStore';
import { ThemeContext } from '../../pages/_app';

export default inject("store")(
    observer(function CropperImageComponent(props) {


    const [cropPreviewImage, setCropPreviewImage] = useState({ x: 0, y: 0 })
    const [zoomPreviewImage, setZoomPreviewImage] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [avatarId, setAvatarId]= useState("")
    const [assetId, setAssetId]= useState("")
    const rootstore = useStore()
    const { theme, setTheme } = React.useContext(ThemeContext)

    const cancelChanges = () => {
        props.setPreviewImageSelected(false)
        props.setPreviewImage("")
        URL.revokeObjectURL(null)
    }


    function urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.blob();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }
    
    
   
    async function imageUpload(image){
        let b = new File([await (await fetch(image)).blob()],"image");
        //console.log(b);
       const file= await urltoFile(image, 'newfile.jpeg','image/jpeg')
        .then(function(file){ return file});
      const fileId=await rootstore.uploadImage(file,"image/jpeg", 'yuser_uploads')
      //setAssetId(fileId)
      return fileId
     
    }
    const saveChanges = async () => {
        const croppedImage = await getCroppedImg(props.previewImage, croppedAreaPixels)
       const fileId= await imageUpload(croppedImage)
       
        if (props.previewType == "avatar" && fileId!=="") {
            props.setAvatar(fileId)
            let profileObj={}
          profileObj.avatar=fileId
         await rootstore.editProfile(profileObj)
        
        } else if(props.previewType==="featured" && fileId !=="") {
            props.setFeaturedPhoto(fileId)
            let profileObj={}
        profileObj.featuredPhoto=fileId
       await rootstore.editProfile(profileObj)
       
        }
        props.setPreviewImageSelected(false)
        props.setPreviewImage("")
        URL.revokeObjectURL(null)
    }

    const onCropCompletePreviewImage = useCallback((croppedArea, croppedAreaPixels) => {
        //console.log(croppedArea, croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])


    //based on https://codesandbox.io/s/gj6kk
    //----------------
    const createImage = url =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })

    /**
     * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
     * @param {File} image - Image File url
     * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
     */
    async function getCroppedImg(imageSrc, pixelCrop) {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        )

        // As Base64 string 
         return canvas.toDataURL('image/jpeg');
          // return new Promise((resolve, reject) => {
        //     canvas.toBlob(file => {
        //         resolve(URL.createObjectURL(file))
        //     }, 'image/jpeg')
        // })
        // As a blob
        // return new Promise((resolve, reject) => {
        //     canvas.toBlob(file => {
        //         resolve(URL.createObjectURL(file))
        //     }, 'image/jpeg')
        // })
    }

    return (
        <Overlay>
            <MainContainer previewType={props.previewType}>
                <CropperContainer previewType={props.previewType}>
                    <Cropper
                        image={props.previewImage}
                        crop={cropPreviewImage}
                        zoom={zoomPreviewImage}
                        aspect={props.previewType == "avatar" ? 1 / 1 : 5 / 3}
                        onCropChange={setCropPreviewImage}
                        onCropComplete={onCropCompletePreviewImage}
                        onZoomChange={setZoomPreviewImage}
                        cropShape={props.previewType == "avatar" ? "round" : "rect"}
                        objectFit="contain" //'contain', 'horizontal-cover', 'vertical-cover' or 'auto-cover'
                    />
                </CropperContainer>
                <MiddleContainer>
                    <ZoomText>{"ZOOM"}</ZoomText>
                    <Slider
                        value={zoomPreviewImage}
                        onChange={setZoomPreviewImage}
                        min={1}
                        max={3}
                        step={0.1}
                        trackStyle={{
                            background: COLORS.blue,
                        }}
                        handleStyle={{
                            height: 18,
                            width: 18,
                            marginTop: -7,
                            marginLeft: -7,
                            opacity: 1,
                            backgroundColor: COLORS.blue,
                            border: 0
                        }}
                        railStyle={{
                            backgroundColor: theme.name === "dark" ? COLORS.white : COLORS.whiteLight
                        }}
                    />
                </MiddleContainer>
                <BottomContainer>
                    <Button
                        text={"Cancel"}
                        onClick={cancelChanges}
                        isIcon={false}
                        color={"transparent"}
                        width={150}
                        border={true}
                        borderColor={COLORS.purple}
                        padding={true}
                        colorText={({ theme }) => theme.textPrimary.color}
                    />
                    <Button
                        text={"Save"}
                        onClick={saveChanges}
                        isIcon={false}
                        color={COLORS.purple}
                        colorText={COLORS.white}
                        width={150}
                        border={true}
                        borderColor={COLORS.purple}
                        padding={true}
                    />
                </BottomContainer>
            </MainContainer>
        </Overlay>

    )
}
    ))