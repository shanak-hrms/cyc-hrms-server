import React, { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import StaffPage from '../../../pages/StaffPage/StaffPage'
import EmployeePage from '../../../pages/EmployeePage/EmployeePage'
import EmployeeProfile from '../../staff/employeeProfile/EmployeeProfile'
import ManageLeave from '../../../pages/ManageLeave/ManageLeave'
import Attandance from '../../../pages/Attandance/Attandance'
import LeadManagement from '../../../pages/LeadManagement/LeadManagement'
import CompanyPolicy from '../../../pages/CompanyPolicy/CompanyPolicy'
import PaySlip from '../../../pages/PaySlip/PaySlip'
import LeavePolicy from '../../LeavePolicy/LeavePolicy'
import { RequestApproval } from '../../../pages/RequestApproval/RequestApproval'
import ManageClaimRequest from '../../../pages/ManageClaimRequest/ManageClaimRequest'
import AddStaff from '../../../pages/AddStaff/AddStaff'
import UpdateStaff from '../../../pages/UpdateStaff/UpdateStaff'
import UpdateStatusList from '../../../pages/UpdateStatusList/UpdateStatusList'
import EmpPaySlip from '../../../pages/EmpAttendancePage/EmpPaySlip/EmpPaySlip'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/staff' element={<StaffPage />} />
                <Route path='/add-staff' element={<AddStaff />} />
                <Route path='/update-staff' element={<UpdateStaff />} />
                <Route path='/employee-profile' element={<EmployeeProfile />} />
                <Route path='/employee' element={<EmployeePage />} />
                <Route path='/manage-leave' element={<ManageLeave />} />
                <Route path='/request' element={<ManageClaimRequest />} />
                <Route path='/lead-management' element={<LeadManagement />} />
                <Route path='/status-request' element={<UpdateStatusList />} />
                <Route path='/attandance' element={<Attandance />} />
                <Route path='/leave-policy' element={<LeavePolicy />} />
                <Route path='/company-policy' element={<CompanyPolicy />} />
                <Route path='/pay-slip' element={<EmployeePage />} />
                <Route path='/manager-pay-slip' element={<EmpPaySlip />} />
                <Route path='/pay-slip-preview' element={<PaySlip />} />
                <Route path='/request-approval-list' element={<RequestApproval />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage