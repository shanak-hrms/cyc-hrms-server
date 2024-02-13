import React, { useState, useEffect, useRef } from 'react'
import styles from './EmpAttendancePage.module.scss'
import { Grid } from '@mui/material'
import Sidebar from '../../components/sidebar/Sidebar'
import { menuData } from './menuData'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Attendance from './Attendance/Attendance'
import Heading from './Heading/Heading'
import axios from 'axios'
import Leave from './Leave/Leave'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoader from '../../components/CustomLoader/CustomLoader'
import LeavePolicy from '../../components/LeavePolicy/LeavePolicy'
import ClaimsRequest from '../ClaimsRequest/ClaimsRequest'
import CompanyPolicy from '../CompanyPolicy/CompanyPolicy'
import TakePicture from './TakePicture/TakePicture'
import TakePhotoModal from '../../components/modal/TakePhotoModal/TakePhotoModal'
import LeadManagement from '../LeadManagement/LeadManagement'
import RequestModal from '../../components/modal/RequestModal/RequestModal'
import NewHeading from '../../components/NewHeading/NewHeading'

export interface IEmpAttendancePage {
    open: any;
    menu: any;
    handleSidebarMemu: any;
    handleClickLogout: any;
    handleLogout: any;
    handleResponsiveMenu?: any;
}
const EmpAttendancePage = ({ open, menu, handleSidebarMemu, handleClickLogout, handleLogout, handleResponsiveMenu }: IEmpAttendancePage) => {
    // const [menu, setMenu] = useState(false)
    const [photoModal, setPhotoModal] = useState(false)
    const [requestModal, setRequestModal] = useState(false)
    const [reqAtten, setReqAtten] = useState(false)
    const [requestVal, setRequestVal] = useState<any>({ date: "" })
    const [reqAttenVal, setReqAttenVal] = useState<any>({ time: "" })
    const handleRequestModal = () => setRequestModal(!requestModal);
    const handleClose = () => { setPhotoModal(false); setRequestModal(false); setReqAtten(false) }
    // const handleMenu = () => setMenu(!menu);
    // const handleResponsiveMenu = () => setMenu(false);
    const [attendanceData, setAttendanceData] = useState<any>([])
    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>()
    const [emp_id, setEmpId] = useState<any>()
    const [userToken, setUserToken] = useState()
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [stream, setStream] = useState<any>(null);
    const [appAttId, setAppAttId] = useState()
    const videoRef = useRef<any>();
    console.log(reqAttenVal, "reqAttenVal....")
    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/attendance/get');
            const data = result.data.attendanceData;
            setAttendanceData(data);
        } catch (error) {
            console.error("Error during GET request:", error);
        } finally {
            setLoading(false)
        }
    };
    const handleClockOut = async (idx: any) => {
        if (attendanceData && attendanceData.length > 0) {
            const matchId: any = attendanceData.filter((item: any) => item._id === idx);
            const checkOut = matchId[0].date;
            try {
                const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkOut/${idx}`,
                    { date: checkOut },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                )
                if (response.status === 200) {
                    await fetchData();
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("attendanceData is undefined or empty");
        }
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        setEmail(userEmail)
        const loginedUserString = localStorage.getItem('loginedUser')
        if (loginedUserString) {
            const loginedUser = JSON.parse(loginedUserString);
            const { name, emp_id, token } = loginedUser;
            setName(name)
            setEmpId(emp_id)
            setUserToken(token)
        } else {
            console.log('No logined user found');
        };
        fetchData();

    }, []);

    useEffect(() => {
        const getUserLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getUserLocation();

    }, []);
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };
    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const takePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const picture = canvas.toDataURL('image/jpeg');
                console.log('Captured picture:', picture);
            } else {
                console.error('Failed to get 2D context for canvas');
            }
        } else {
            console.error('videoRef.current is null');
        }
    };

    const handleChangeRequest = (e: any) => {
        const { name, value } = e.target;
        setRequestVal({ ...requestVal, [name]: value })
    }
    const handleRequestAtt = async () => {
        const { date } = requestVal;
        const desiredDate = new Date(date);
        const formattedDate = desiredDate.toISOString();

        const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/request/approval`, {
            date: formattedDate
        },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

        if (response.status === 201) {
            await fetchData();
            setRequestModal(false);
        }
    };
    const handleReqAttModal = async (idx: any) => {
        try {
            await setReqAtten((preState: any) => ({ ...preState, [idx]: !preState[idx] }))
            await setAppAttId(idx)
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleChangeReqAtt = (e: any) => {
        const { name, value } = e.target;
        setReqAttenVal({ ...reqAttenVal, [name]: value })
    }
    const handleCheckIn = async () => {

        if (!userLocation) {
            alert('Unable to get your current location.');
            return;
        }

        const officeLocation = { latitude: 28.613310, longitude: 77.380090 };
        const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            officeLocation.latitude,
            officeLocation.longitude
        );

        if (distance > 5) {
            alert('You are not within 5km of the office location.');
            return;
        }
        // startCamera();
        // setPhotoModal(true);

        try {
            const desiredDate = new Date();
            const formattedDate = desiredDate.toISOString().slice(0, -5) + 'Z';
            console.log(formattedDate);


            const response = await axios.post(
                'https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkIn',
                { date: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            )
            if (response.status === 201) {
                await fetchData();
                await setPhotoModal(false);
            }

        } catch (error) {
            console.error('Error occurred:', error);
        }

    };

    const handlePreviousCheckIn = async () => {
        const { time } = reqAttenVal;
        try {
            const response = await axios.patch(
                `https://hrms-server-ygpa.onrender.com/api/v1/attendance/Approved/attendance/checkIn/${appAttId}`,
                { time: time },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            console.log(response, "response...");
            if (response.status === 200) {
                await fetchData();
                await setReqAtten(false);
                // await setPhotoModal(false);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };


    return (
        <Grid container className={styles.empAttendancePageContainer}>
            <Grid className={styles.empAttendanceSidebar}>
                <Sidebar
                    menuData={menuData}
                    handleLogout={handleLogout}
                />
            </Grid>
            <Grid className={styles.empAttendanceScreen}>
                {/* <Heading
                    menu={menu}
                    IsAction={false}
                    handleClick={handleMenu}
                    handleResponsiveMenu={handleResponsiveMenu}
                /> */}
                <NewHeading open={open} menu={menu} handleClickLogout={handleClickLogout} handleSidebarMemu={handleSidebarMemu} handleLogout={handleLogout} handleResponsiveMenu={handleResponsiveMenu} />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/attendance' element={
                        <Attendance
                            open={reqAtten}
                            handleClose={handleClose}
                            handleChange={handleChangeReqAtt}
                            reqAttenVal={reqAttenVal}
                            handleAttendance={handlePreviousCheckIn}
                            attendanceData={attendanceData}
                            loading={loading}
                            handleCheckIn={handleCheckIn}
                            handleClockOut={handleClockOut}
                            handleReqAppModal={handleRequestModal}
                            handleReqAttModal={handleReqAttModal}
                        />
                    } />
                    <Route path='/leaves' element={<Leave />} />
                    <Route path='/leave-policy' element={<LeavePolicy />} />
                    <Route path='/loader' element={<CustomLoader />} />
                    <Route path='/claims-request' element={<ClaimsRequest />} />
                    <Route path='/company-policy' element={<CompanyPolicy />} />
                    <Route path='/take-picture' element={<TakePicture />} />
                    <Route path='/lead-management' element={<LeadManagement />} />
                </Routes>
            </Grid>
            <ToastContainer />
            <TakePhotoModal
                open={photoModal}
                videoRef={videoRef}
                takePicture={takePicture}
                handleClose={handleClose}
            />
            <RequestModal
                open={requestModal}
                requestVal={requestVal}
                handleClose={handleClose}
                handleRequest={handleRequestAtt}
                handleChange={handleChangeRequest}
            />
        </Grid>
    )
}

export default EmpAttendancePage;