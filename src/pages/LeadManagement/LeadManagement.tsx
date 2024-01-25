import React, { useEffect, useState } from 'react'
import styles from './LeadManagement.module.scss'
import { Grid, Typography } from '@mui/material'
import LeadManagementTable from '../../components/tableData/leadManagementTable/leadManagementTable'
import HeadingText from '../../components/HeadingText/HeadingText'
import LeadManagementModal from '../../components/modal/LeadManagementModal/LeadManagementModal'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadLeadModal from '../../components/modal/ReadLeadModal/ReadLeadModal'
import * as XLSX from 'xlsx';


const LeadManagement = () => {
    const [open, setOpen] = useState(false);
    const [editModal, setEditModal] = useState(false)
    const [readModal, setReadModal] = useState(false)
    const handleModal = () => setOpen(!open);
    const handleClose = () => { setOpen(false); setEditModal(false); setReadModal(false) };
    const [query, setQuery] = useState('')
    const [inputData, setInputData] = useState<any>({ leadName: "", leadType: "", leadStatus: "", openDate: "", closeDate: "", leadDesc: "", businessType: "", businessFrom: "", businessVal: "", businessCost: "", profitAmount: "" });
    const [leadData, setLeadData] = useState<any>()
    const [selectedItem, setSelectedLead] = useState();
    const [readLead, setReadLeadId] = useState<any>()
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    };
    const handleChangeDes = (des: any) => {
        setInputData((preState: any) => ({ ...preState, leadDesc: des }))
    };
    console.log(leadData, "leadData...")
    const handleReadModal = async (id: any) => {

        try {
            await setReadModal((preState: any) => ({ ...preState, [id]: !preState[id] }))
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/lead`)
            const leadData = response.data.leadData;
            const filteredLead = leadData.filter((item: any) => item._id === id)
            setReadLeadId(filteredLead)
            console.log(filteredLead, 'filteredLead')
        }
        catch (err) {
            console.error(err)
        }
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
        if (inputData.leadName === "") {
            toast.error("Lead name require!")
            return;
        } else if (inputData.leadType === "") {
            toast.error("lead type require!")
            return;
        } else if (inputData.openDate === "") {
            toast.error("Open date require!")
            return;
        } else if (inputData.leadDesc === "") {
            toast.error("lead description require!")
            return;
        } else if (inputData.businessType === "") {
            toast.error("business type require!")
            return;
        } else if (inputData.businessFrom === "") {
            toast.error("business from require!")
            return;
        }

        try {
            const response = await axios.post(`https://hrms-server-ygpa.onrender.com/lead/create`, inputData);
            console.log(response, "response..")
            await getLeadData();
            if (response.status === 200) {
                toast.success("lead Created successfully!")
                setOpen(false)
            }
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

    const handleDownload = () => {
        const userData: any[] = [];
        leadData?.forEach((lead: any) => {
            const { leadName, leadType, openDate, closeDate, leadStatus, businessType, businessFrom, businessCost, businessVal, profitAmount, leadDesc } = lead;

            const formateOpenDate = new Date(openDate).toLocaleString()
            const formateCloseDate = new Date(closeDate).toLocaleString();
            const strippedDesc = leadDesc.replace(/<[^>]*>?/gm, '');

            userData.push({ leadName, leadType, openDate: formateOpenDate, closeDate: formateCloseDate, leadStatus, businessType, businessFrom, businessCost, businessVal, profitAmount, leadDesc: strippedDesc });
        });

        const ws = XLSX.utils.json_to_sheet(userData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'table_data.xlsx');
    }
    const handledownloadItem = (id: any) => {
        const userData: any[] = [];
        const data = leadData.filter((item: any) => item._id === id)
        data?.forEach((lead: any) => {
            const { leadName, leadType, openDate, closeDate, leadStatus, businessType, businessFrom, businessCost, businessVal, profitAmount, leadDesc } = lead;

            const formateOpenDate = new Date(openDate).toLocaleString()
            const formateCloseDate = new Date(closeDate).toLocaleString();
            const strippedDesc = leadDesc.replace(/<[^>]*>?/gm, '');

            userData.push({ leadName, leadType, openDate: formateOpenDate, closeDate: formateCloseDate, leadStatus, businessType, businessFrom, businessCost, businessVal, profitAmount, leadDesc: strippedDesc });
        });

        const ws = XLSX.utils.json_to_sheet(userData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'table_data.xlsx');

    }


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
                handleClick2={handleDownload}
                setQuery={setQuery}
                IsSearchBox={true}
            />
            <LeadManagementTable
                data={leadData}
                handleEdit={handleEditModal}
                handleDelete={handleDelete}
                handleaddBusiness={handleReadModal}
                query={query}
                handledownload={handledownloadItem}
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
            <ReadLeadModal
                open={readModal}
                leadData={readLead}
                handleClose={handleClose}
            />
            <ToastContainer />
        </Grid>
    )
}

export default LeadManagement