import React, { useEffect, useState } from 'react'
import styles from './ClaimsRequest.module.scss'
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import HeadingText from '../../components/HeadingText/HeadingText'
import ClaimsRequestModal from '../../components/modal/ClaimsRequestModal/ClaimsRequestModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEdit, MdDelete } from "react-icons/md";
import CommonButton from '../../components/common/CommonButton/CommonButton'


const ClaimsRequest = () => {
    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const handleClose = () => { setOpen(false); setEditModal(false) };
    const [inputData, setInputData] = useState({ emp_id: "", name: "", claimsType: "", message: "", attachment: "" });
    const [claimRequestData, setClaimRequestData] = useState<any>();
    const [empId, setEmpId] = useState<any>("");
    const [name, setName] = useState<any>("");
    const [claimMessage, setClaimMessage] = useState();
    const [claimsRequestId, setClaimRequestId] = useState()
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };
    const handleChengeMessage = (des: any) => {
        setClaimMessage(des)
        setInputData((preState: any) => ({ ...preState, message: claimMessage }))
    };
    const handleChangefile = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            console.log('Selected file:', file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    }
    const handleClickModal = () => {
        setOpen(!open);
        setInputData((preState: any) => ({ ...preState, emp_id: empId, name: name, attachment: selectedFile }))
    };
    const getUserData = async () => {
        try {
            const loginedUserString: any = localStorage.getItem('loginedUser')
            const loginedUser = JSON.parse(loginedUserString)
            const { name, emp_id } = loginedUser;
            setEmpId(emp_id)
            setName(name)
            console.log(emp_id, "loginedUser..")
        }
        catch (err) {
            console.log(err)
        }
    };
    const getData = async () => {
        const response = await axios.get(`https://hrms-server-ygpa.onrender.com/claim-request`)
        const data = response.data.claimsRequestData;
        setClaimRequestData(data);
    }
    const handleCreateClaimRequest = async () => {
        if (inputData.attachment === "" || inputData.claimsType === "", inputData.message === "") {
            toast.error("Please fill all the field!")
            return;
        }
        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/claim-request/create`, inputData)
            console.log(response, "response....");
            if (response.status === 200) {
                toast.success("Claim request created successfully!")
                setOpen(false)
            }
            await getData();
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleEditModal = async (idx: any) => {
        await setEditModal((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
        await setClaimRequestId(idx);
        await setInputData((preState: any) => ({ ...preState, emp_id: empId, name: name, attachment: selectedFile }))

    };
    const handleEditClaimRequest = async () => {
        if (inputData.attachment === "" || inputData.claimsType === "", inputData.message === "") {
            toast.error("Please fill all the field!")
            return;
        }
        try {
            const response = await axios.put(`https://hrms-server-ygpa.onrender.com/claim-request/${claimsRequestId}`, inputData)
            if (response.status === 200) {
                setEditModal(false)
                toast.success("Claim request updated successfully")
            }
            await getData();
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (idx: any) => {
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/claim-request/${idx}`);
            await getData();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const formatedMessage = (message: any) => {
        if (message !== undefined && message !== null) {
            const messageString = String(message);

            const cleanedMessage = messageString.replace(/<\/?p>/g, '');

            return cleanedMessage;
        } else {
            return '';
        }
    }
    useEffect(() => {
        getData();
        getUserData();
    }, [])

    return (
        <Grid>
            {selectedFile && <img src={selectedFile} />}

            <HeadingText
                heading={'Claims Special Request'}
                IsAction={true}
                name='Claim'
                handleClick={handleClickModal}
            />
            <TableContainer>
                <Table>
                    <TableHead sx={{ backgroundColor: "#383A3C" }}>
                        <TableRow>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Employee Id</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Name</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Claim Type</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Message</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Attachment</TableCell>
                            <TableCell sx={{ color: "#68C5AE", textAlign: "center" }}>Action</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claimRequestData && claimRequestData.map((item: any) => {
                            return (
                                <TableRow>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <CommonButton name={item.emp_id} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.name}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{item.claimsType}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>{formatedMessage(item.message)}</TableCell>
                                    <TableCell sx={{ textAlign: "center" }}  >
                                        <CommonButton name={"View"} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: "center" }}>
                                        <MdEdit fontSize={22} cursor={"pointer"} onClick={(() => handleEditModal(item._id))} />
                                        <MdDelete fontSize={22} cursor={"pointer"} onClick={(() => handleDelete(item._id))} />
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <ClaimsRequestModal
                open={open}
                heading='Claim Special Request'
                empId={empId}
                name={name}
                buttonName={"Submit"}
                inputData={inputData}
                handleChange={handleChange}
                handleChangefile={handleChangefile}
                handleClose={handleClose}
                handleClick={handleCreateClaimRequest}
                handleChengeMessage={handleChengeMessage}
            />
            <ClaimsRequestModal
                open={editModal}
                heading='Update Claim Special Request'
                empId={empId}
                name={name}
                buttonName={"Update"}
                inputData={inputData}
                handleChange={handleChange}
                handleChangefile={handleChangefile}
                handleClose={handleClose}
                handleClick={handleEditClaimRequest}
                handleChengeMessage={handleChengeMessage}
            />
            <ToastContainer />
        </Grid>
    )
}

export default ClaimsRequest