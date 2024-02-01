import React, { useRef } from 'react'
import styles from './TakePhotoModal.module.scss'
import { Grid, Modal, Typography } from '@mui/material'
import CommonButton from '../../common/CommonButton/CommonButton';
import { FaCamera } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export interface ITakePhotoModal {
    open: boolean;
    videoRef: any;
    takePicture: any;
    handleClose:any;
}
const TakePhotoModal = ({ open, videoRef, takePicture,handleClose }: ITakePhotoModal) => {

    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 500, margin: "auto" }}
        >
            <Grid className={styles.takePhotoModalContainer}>
                <IoMdClose fontSize={28} onClick={handleClose} />
                <video ref={videoRef} autoPlay muted style={{ width: '100%', maxWidth: '500px' }}></video>
                <CommonButton name="Take Picture" onClick={takePicture} />
            </Grid>
        </Modal>
    )
}

export default TakePhotoModal