import React, { useEffect, useState } from 'react'
import styles from './LeadManagement.module.scss'
import { Grid, Typography } from '@mui/material'
import LeadManagementTable from '../../components/tableData/leadManagementTable/leadManagementTable'
import HeadingText from '../../components/HeadingText/HeadingText'
import LeadManagementModal from '../../components/modal/LeadManagementModal/LeadManagementModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeadManagement = () => {
    const [open, setOpen] = useState(true);
    const [editModal, setEditModal] = useState(false)
    const handleModal = () => setOpen(!open);
    const handleClose = () => { setOpen(false); setEditModal(false); };
    const [inputData, setInputData] = useState<any>({ leadName: "", leadType: "", leadStatus: "", openDate: "", closeDate: "", leadDes: "", businessType: "", businessFrom: "", businessVal: "", businessCost: "", profitAmount: "" });
    const [leadData, setLeadData] = useState()
    const [selectedItem, setSelectedLead] = useState();
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };
    const handleChangeDes = (des: any) => {

        setInputData((preState: any) => ({ ...preState, leadDes: des }))
    };
    console.log(inputData, "inputData...")
    const handleBusinessModal = async (id: any) => {
        console.log(id, "id")
    };

    const getLeadData = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/lead`)
            const leadData = response.data.leadData;
            setLeadData(leadData)
        }
        catch (err) {
            console.log(err)
        }
    };
    const handleCreate = async () => {

        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/lead/create`, inputData);
            await getLeadData();
            toast.success("lead Created successfully!")
            setOpen(false)
        } catch (err) {
            console.log(err)
        }
    };
    const handleEditModal = async (id: any) => {
        setEditModal((prevState: any) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
        setSelectedLead(id)
        const response = await axios.get(`https://hrms-server-ygpa.onrender.com/lead`)
        if (response.status === 200) {
            const resData = response.data.leadData;
            const filteredData = resData.filter((employee: any) => employee._id === id);

            setInputData({
                leadName: filteredData[0].leadName,
                leadType: filteredData[0].leadType,
                leadStatus: filteredData[0].leadStatus,
                openDate: filteredData[0].openDate,
                closeDate: filteredData[0].closeDate,
                leadDes: filteredData[0].leadDes,
                businessType: filteredData[0].businessType,
                businessFrom: filteredData[0].businessFrom,
                businessVal: filteredData[0].businessVal,
                businessCost: filteredData[0].businessCost,
                profitAmount: filteredData[0].profitAmount,
            });
        } else {
            console.error('Failed to fetch employee data');
        }
    };
    const handleEdit = async () => {
        try {
            await axios.put(`https://hrms-server-ygpa.onrender.com/lead/${selectedItem}`, inputData)
            await getLeadData();
        } catch (err) {
            console.log(err)
        } finally {
            setEditModal(false)
        }
    };
    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`https://hrms-server-ygpa.onrender.com/lead/${id}`);
            await getLeadData();
        } catch (err) {
            console.log(err)
        } finally { }
    };

    useEffect(() => {
        getLeadData();
    }, [])
    return (
        <Grid className={styles.leadManagement}>
            <HeadingText heading={'Lead Management'}
                IsAction={true}
                name='Add Lead'
                name2='Download'
                IsName2={true}
                handleClick={handleModal}
                handleClick2={undefined}
            />
            <LeadManagementTable
                data={leadData}
                handleEdit={handleEditModal}
                handleDelete={handleDelete}
                handleDownload={undefined}
                handleaddBusiness={handleBusinessModal}
            />
            <LeadManagementModal
                open={open}
                heading='Create New Lead'
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleChangeText={handleChangeDes}
                handleClick={handleCreate}
            />
            <LeadManagementModal
                open={editModal}
                heading='Create New Lead'
                handleClose={handleClose}
                inputData={inputData}
                handleChange={handleChange}
                handleChangeText={handleChangeDes}
                handleClick={handleEdit}
            />
            <ToastContainer />
        </Grid>
    )
}

export default LeadManagement