import React, { Fragment } from 'react'
import styles from './RoutesPage.module.scss'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../../../pages/DashboardPage/DashboardPage'
import StaffPage from '../../../pages/StaffPage/StaffPage'
import EmployeePage from '../../../pages/EmployeePage/EmployeePage'
import EmployeeProfile from '../../staff/employeeProfile/EmployeeProfile'
import TimeSheet from '../../../pages/TimeSheet/TimeSheet'
import Ticket from '../../../pages/Ticket/Ticket'
import ManageLeave from '../../../pages/ManageLeave/ManageLeave'
import Attandance from '../../../pages/Attandance/Attandance'
import CreateNewEmployee from '../../../pages/CreateNewEmployee/CreateNewEmployee'
import EditAddedEmployee from '../../../pages/EditAddedEmployee/EditAddedEmployee'
import EmpAttendancePage from '../../../pages/EmpAttendancePage/EmpAttendancePage'
import Invoice from '../../../pages/Invoice/Invoice'
import InvoicePreview from '../../../pages/invoicePreview/invoicePreview'
import LeadManagement from '../../../pages/LeadManagement/LeadManagement'
import CompanyPolicy from '../../../pages/CompanyPolicy/CompanyPolicy'

const RoutesPage = () => {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/user' element={<StaffPage />} />
                <Route path='/employee-profile' element={<EmployeeProfile />} />
                <Route path='/employee' element={<EmployeePage />} />
                <Route path='/employee/create-employee' element={<CreateNewEmployee />} />
                <Route path='/employee/edit-employee' element={<EditAddedEmployee />} />
                <Route path='/timesheet' element={<TimeSheet />} />
                <Route path='/manage-leave' element={<ManageLeave />} />
                <Route path='/lead-management' element={<LeadManagement />} />
                <Route path='/attandance' element={<Attandance />} />
                <Route path='/ticket' element={<Ticket />} />
                <Route path='/emp-attendance' element={<EmpAttendancePage />} />
                <Route path='/invoice' element={<Invoice />} />
                <Route path='/invoice-preview' element={<InvoicePreview />} />
                <Route path='/company-policy' element={<CompanyPolicy />} />
            </Routes>
        </Fragment>
    )
}

export default RoutesPage