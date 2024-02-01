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


const EmpAttendancePage = ({ handleLogout }: any) => {
    const [photoModal, setPhotoModal] = useState(false)
    const handleClose = () => setPhotoModal(false)
    const [attendanceData, setAttendanceData] = useState<any>([])
    const [email, setEmail] = useState<any>()
    const [name, setName] = useState<any>()
    const [emp_id, setEmpId] = useState<any>()
    const [checkedAttendance, setCheckedAttendance] = useState()
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState<any>(null);
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [stream, setStream] = useState<any>(null);
    const videoRef = useRef<any>();

    const formatedData = new Date();
    const date = formatedData.toLocaleDateString();
    const time = formatedData.getTime();
    const clock_in = new Date(time).toLocaleTimeString();
    const clock_out = new Date(time).toLocaleTimeString();

    const fetchData = async () => {
        setLoading(true)
        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/empAttendance');
            const data = result.data.EmpAttendanceData;

            if (Array.isArray(data) && data.length > 0) {
                const lastIndex = data.length - 1;
                const lastItem = data[lastIndex];
                const attendance_id = lastItem._id;
                setCheckedAttendance(attendance_id);
            } else {
                console.log("Data is not an array or is empty");
            }

            setAttendanceData(data);

            const empDataString: any = localStorage.getItem("loginedUser");
            const empData = JSON.parse(empDataString);
            const empEmail = empData.email;
            setEmail(empEmail);
        } catch (error) {
            console.error("Error during GET request:", error);
        } finally {
            setLoading(false)
        }
    };

    const handleCheckOut = async () => {
        try {
            setLoading(true);

            if (checkedAttendance) {
                const response = await axios.put(`https://hrms-server-ygpa.onrender.com/empAttendance/${checkedAttendance}`, { clock_out });

                if (response.status === 200) {
                    console.log("Clock-out successful");
                    await fetchData();
                } else {
                    console.error("Clock-out request failed with status:", response.status);
                }
            } else {
                console.log("Not clocked in");
            }
        } catch (error) {
            console.error("Error during clock-out request:", error);
        } finally {
            setLoading(false);
        }
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

    const handleCheckIn = async () => {
        const empId = localStorage.getItem("empId");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const date = new Date();
        const clock_in = new Date().toISOString();

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
        startCamera();
        setPhotoModal(true);

        // try {
        //     setLoading(true);

        //     const response = await axios.post('https://hrms-server-ygpa.onrender.com/empAttendance/clock-in', {
        //         emp_id: empId,
        //         name: name,
        //         email: email,
        //         date: date,
        //         clock_in: clock_in,
        //     });

        //     console.log(response.data, 'response');

        //     if (response.status === 200) {
        //         console.log("Clock-in successful");
        //         await fetchData();
        //     } else {
        //         console.error("Clock-in request failed with status:", response.status);
        //     }
        // } catch (error) {
        //     console.error("Error during clock-in request:", error);
        // } finally {
        //     setLoading(false);
        // }
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
                    IsAction={true}
                    handleCheckIn={handleCheckIn}
                    handleCheckOut={handleCheckOut}
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
        </Grid>
    )
}

export default EmpAttendancePage;