import React from 'react'
import styles from './SalaryStructureModal.module.scss'
import { Grid, Modal, Box, Typography, Divider } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';



export interface ISalaryStructureModal {
    open: boolean;
    handleClose: () => void;
    handleCreate:()=>void;
}

const SalaryStructureModal = ({ open, handleClose, handleCreate }: ISalaryStructureModal) => {
    return (
        <Modal
            open={open}
            className={styles.salaryStructureModal}
        >
            <Grid className={styles.salaryStructure}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Create Salary</Typography>
                    <MdOutlineClose fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />
                <Grid className={styles.salaryField}>
                    <Box>
                        <InputField
                            label={'Basic Salary'}
                            name={'basicSalary'}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                        <InputField
                            label={'HRA Percentage'}
                            name={'hraPercentage'}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Basic Salary'}
                            name={'basicSalary'}
                            placeholder={''}
                            value={''}
                            handleChange={undefined}
                            type={undefined}
                        />
                    </Box>
                    <Box>
                        <CommonButton name="Cancel" onClick={handleClose} />
                        <CommonButton name="Submit" onClick={handleCreate}/>
                    </Box>

                </Grid>
            </Grid>
        </Modal>
    )
}

export default SalaryStructureModal