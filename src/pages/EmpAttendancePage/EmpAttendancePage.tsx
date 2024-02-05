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


const EmpAttendancePage = ({ handleLogout }: any) => {
    const [menu, setMenu] = useState(false)
    const [photoModal, setPhotoModal] = useState(false)
    const [requestModal, setRequestModal] = useState(false)
    const handleClose = () => { setPhotoModal(false); setRequestModal(false) }
    const [attendanceData, setAttendanceData] = useState<any>([])
    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>()
    const [emp_id, setEmpId] = useState<any>()
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [stream, setStream] = useState<any>(null);
    const videoRef = useRef<any>();

    const handleMenu = () => {
        setMenu(!menu)
    }
    const handleResponsiveMenu = () => {
        setMenu(false)

    }

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

    const handleCheckOut = async () => {
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('email')
        setEmail(userEmail)
        const loginedUserString = localStorage.getItem('loginedUser')
        if (loginedUserString) {
            const loginedUser = JSON.parse(loginedUserString);
            const { name, emp_id } = loginedUser;
            setName(name)
            setEmpId(emp_id)
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
    const handleRequest = async () => {
        const response = await axios.post(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/request/approval`, {
            employeeId: "65bb86c5b21e8914f90801cd",
            markedWithin5Km: true,
            date: "2024-01-29T12:00:00Z"
        })
        console.log(response, "response")
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
        // if()
        setRequestModal(true)
        console.log("hello")
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
                <Heading
                    menu={menu}
                    IsAction={true}
                    handleCheckIn={handleCheckIn}
                    handleCheckOut={handleCheckOut}
                    handleClick={handleMenu}
                    handleResponsiveMenu={handleResponsiveMenu}
                />
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/attendance' element={<Attendance attendanceData={attendanceData} loading={loading} />} />
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
                handleClose={handleClose}
                handleRequest={handleRequest}
            />
        </Grid>
    )
}

export default EmpAttendancePage;