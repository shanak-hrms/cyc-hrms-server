import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'
import { Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, } from '@mui/material'
import Calender from './calender/Calender';
import ServiceCard from './ServiceCard/ServiceCard';
import CommonButton from '../common/CommonButton/CommonButton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export interface IDashboard {
    data: any;
}
const Dashboard = ({ data }: IDashboard) => {
    const [attendance, setAttendance] = useState<any>();
    const [holiday, setHolidays] = useState<any>();
    const [userLocation, setUserLocation] = useState<any>(null);
    const [locations, setLocations] = useState<any>();
    const [locationG, setLocationG] = useState()

    const getAttendanceData = async () => {
        const loginedUserStr: any = localStorage.getItem("loginedUser")
        const loginedUser = JSON.parse(loginedUserStr)
        const { email } = loginedUser
        try {
            const result = await axios.get('https://hrms-server-ygpa.onrender.com/api/v1/attendance/get');
            const data = result.data.attendanceData;
            const filterData = data?.filter((item: any) => item.employeeId?.email === email);
            setAttendance(filterData);
            console.log(filterData, "filterData")
            console.log(data, "data")
        }
        catch (err) {
            console.log(err)
        }

    }
    console.log(attendance, "attendance")

    const formateDate = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleDateString()
    };
    const formateTime = (idx: any) => {
        const date = new Date(idx)
        return date.toLocaleTimeString()
    };
    const getMonthlyHolidays = async () => {
        const date = new Date();
        const getMonth = date.getMonth();
        const getYear = date.getFullYear();
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/holiday/get/all-holidays-of-the-month?year=${getYear}&month=${getMonth}`);
            console.log(response, "response")
            setHolidays(response.data)
        }
        catch (err) {
            console.log(err)
        }
    };
    const getYearlyHolidays = async () => {
        const date = new Date();
        const getYear = date.getFullYear();
        try {
            const response = await axios.get(`https:/hrms-server-ygpa.onrender.com/api/v1/holiday/get/all-holidays-of-the-year?year=${getYear}`);
            setHolidays(response.data)
        }
        catch (err) {
            console.log(err)
        }
    };
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
        const distance = R * c * 1000;
        console.log(distance, "distancemm")
        return distance;
    };
    const getOfficeLocation = async () => {
        try {
            const response = await axios.get(`https://hrms-server-ygpa.onrender.com/api/v1/office/get/location/list`);
            console.log(response.data.location, "response..")
            setLocations(response.data.location)
        }
        catch (err) {
            console.log(err)
        }
    };
    const handleClockIn = async () => {
        const loginedUserSting: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser;
        if (!userLocation) {
            alert('Unable to get your current location.');
            return;
        }
        try {
            let withinRange = false;

            for (const officeLocation of locations) {
                const distance = calculateDistance(
                    userLocation.latitude,
                    userLocation.longitude,
                    officeLocation.latitude,
                    officeLocation.longitude
                );

                console.log(distance, "distance to", officeLocation.name);

                if (distance <= 100) {
                    withinRange = true;
                    break;
                }
            }

            if (!withinRange) {
                alert('You are not within 50 meter of any office location.');
                return;
            }

            const desiredDate = new Date();
            const formattedDate = desiredDate.toISOString().slice(0, -5) + 'Z';
            console.log(formattedDate);

            const response = await axios.post(
                'https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkIn',
                { date: formattedDate },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.status === 201) {
                toast.success(response.data.message);
                await getAttendanceData();
            }

        } catch (error: any) {
            console.error('Error occurred:', error);
            toast.error(error.response.data.message)
        }
    };
    const handleClockOut = async (idx: any) => {
        const loginedUserSting: any = localStorage.getItem("loginedUser");
        const loginedUser = JSON.parse(loginedUserSting);
        const { token } = loginedUser;
        if (attendance && attendance.length > 0) {
            const matchId: any = attendance.filter((item: any) => item._id === idx);
            const checkOut = matchId[0].date;
            try {
                const response = await axios.patch(`https://hrms-server-ygpa.onrender.com/api/v1/attendance/checkOut/${idx}`,
                    { date: checkOut },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                if (response.status === 200) {
                    toast.success(response.data.message)
                    getAttendanceData();
                }
            } catch (err: any) {
                if (err.response.status === 400) {
                    toast.error(err.response.data.message)
                }
            }
        } else {
            console.log("attendanceData is undefined or empty");
        }
    };

    const getCurrentLocation = async (latitude: any, longitude: any) => {
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        try {
            const apiKey = 'AIzaSyCplMTApVioqEb09tVxAEmvtUUEJYVX6EQ';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=28.6409857,77.3690384&key=${apiKey}`;
            const response = await axios.get(url);
            console.log(response, "response")
            if (response.data && response.data.results && response.data.results.length > 0) {
                const address = response.data.results[0].formatted_address;
                setLocationG(address);
            } else {
                // setLocationG("Location not found");
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            //   setLocationG("Error fetching location");
        }
    };
    console.log(locationG, "locationG")

    useEffect(() => {
        getOfficeLocation();
        getUserLocation();
        getAttendanceData();
    }, []);
    return (
        <Grid className={styles.dashboardContainer}>
            <Grid container spacing={1} className={styles.dashboard}>
                {data && data.map((item: any) => {
                    return (
                        <Grid item sm={4}>
                            <ServiceCard
                                heading={item.heading}
                                subHeading={item.number}
                                icon={item.icon}
                                color={item.color}
                                bgColor={item.color}
                            />
                        </Grid>
                    )
                })}</Grid>
            <Grid container className={styles.dashboardBody}>
                <Grid item sm={6} >
                    <Box>
                        <CommonButton name={"Clock In"} onClick={handleClockIn} />
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock In</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Clock Out</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {attendance && attendance.slice(-2).map((item: any) => {
                                        return (
                                            <TableRow key={item._id}>
                                                <TableCell>{item.employeeId?.name}</TableCell>
                                                <TableCell>{formateDate(item?.date)}</TableCell>
                                                <TableCell>{formateTime(item?.clockIn)}</TableCell>
                                                <TableCell>
                                                    {item.clockOut === null
                                                        ?
                                                        <CommonButton name={"Clock Out"} onClick={() => handleClockOut(item._id)} />
                                                        :
                                                        <>{formateTime(item?.clockOut)}</>
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Box>
                    <Box>
                        <Typography variant='h5' fontSize={16} fontWeight={500}>Manager Name: </Typography>
                        <Typography variant='h5' fontSize={16} fontWeight={500}>Sherry Lin </Typography>
                    </Box>
                    <Box>
                        <CommonButton name={"Monthly Holidays"} onClick={getMonthlyHolidays} />
                        <CommonButton name={"Yearly Holidays"} onClick={getYearlyHolidays} />
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#00ADB2" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Name</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Date</TableCell>
                                        {/* <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Month</TableCell> */}
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Year</TableCell>
                                        <TableCell sx={{ color: "#000000", fontSize: 14, fontWeight: 600 }}>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableHead>
                                    {holiday && holiday.map((item: any) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{formateDate(item.date)}</TableCell>
                                                {/* <TableCell>{item.month}</TableCell> */}
                                                <TableCell>{item.year}</TableCell>
                                                <TableCell>{item.description}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </Box>

                </Grid>
                <Grid item sm={6} >
                    <Calender />
                </Grid>
            </Grid>
            <ToastContainer />
        </Grid>
    )
}

export default Dashboard;