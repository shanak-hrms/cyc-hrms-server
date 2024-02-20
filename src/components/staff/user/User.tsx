import React from 'react'
import styles from './User.module.scss'
import { Box, Grid, Typography } from '@mui/material'
import UserCard from '../../common/UserCard/UserCard'
import CustomLoader from '../../CustomLoader/CustomLoader'
import HeadingText from '../../HeadingText/HeadingText'


export interface IUser {
    _id: string,
    role: string,
    image?: string,
    name: string,
    email: string,
}
export interface IUserDataType {
    handleClick: () => void;
    handleAction: any;
    data: any;
    loading: boolean;
    actionOpen: boolean | any;
    handleEdit: any;
    handleAddSalary: any;
    handlePayroll: any;
    handleProfile: any
    handleDelete: any;
    handleAssignModal?: any;
    handleAsserstModal?: any;
    handleChangeRoleModal?: any;
}
const User = ({ handleClick, data, handleAction, loading, actionOpen, handleEdit, handleAddSalary, handlePayroll, handleDelete, handleProfile, handleAssignModal, handleAsserstModal, handleChangeRoleModal }: IUserDataType) => {

    return (
        <Grid className={styles.userContainer}>
            <HeadingText
                heading={'Manage Staff'}
                IsAction={true}
                name='Add Staff'
                handleClick={handleClick}
            />
            {loading ? <CustomLoader /> :
                <Grid container spacing={2} >
                    {data && data.filter((item: any) => item.role === "HR" || item.role === "MANAGER" || item.role === "DIRECTOR").map((item: IUser, idx: number) => {
                        return (
                            <Grid item sm={3}>
                                <UserCard
                                    label={item.role}
                                    image={item.image}
                                    name={item.name}
                                    email={item.email}
                                    IsButton={false}
                                    IsLabel={true}
                                    actionOpen={actionOpen[item._id]}
                                    handleClick={(() => handleAction(item._id))}
                                    handleEdit={() => handleEdit(item._id)}
                                    handleAddSalary={() => handleAddSalary(item._id)}
                                    handlePayroll={() => handlePayroll(item._id)}
                                    handleDelete={() => handleDelete(item._id)}
                                    handleProfile={() => handleProfile(item._id)}
                                    handleAsserstModal={() => handleAsserstModal(item._id)}
                                    handleChangeRoleModal={() => handleChangeRoleModal(item._id)}
                                    handleAssignModal={() => handleAssignModal(item._id)}
                                />
                            </Grid>
                        )
                    })}
                    <>
                        {data && data.filter((item: any) => item.role === "EMPLOYEE").map((item: IUser, idx: number) => {
                            return (
                                <Grid item sm={3}>
                                    <UserCard
                                        label={item.role}
                                        image={item.image}
                                        name={item.name}
                                        email={item.email}
                                        IsButton={false}
                                        IsLabel={true}
                                        actionOpen={actionOpen[item._id]}
                                        handleClick={(() => handleAction(item._id))}
                                        handleEdit={() => handleEdit(item._id)}
                                        handleAddSalary={() => handleAddSalary(item._id)}
                                        handlePayroll={() => handlePayroll(item._id)}
                                        handleDelete={() => handleDelete(item._id)}
                                        handleProfile={() => handleProfile(item._id)}
                                        handleAsserstModal={() => handleAsserstModal(item._id)}
                                        handleChangeRoleModal={() => handleChangeRoleModal(item._id)}
                                        handleAssignModal={() => handleAssignModal(item._id)}
                                    />
                                </Grid>
                            )
                        })}
                    </>
                </Grid>}

        </Grid>
    )
}

export default User