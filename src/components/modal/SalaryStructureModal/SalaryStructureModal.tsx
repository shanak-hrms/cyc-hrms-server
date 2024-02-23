import React from 'react'
import styles from './SalaryStructureModal.module.scss'
import { Grid, Modal, Box, Typography, Divider } from '@mui/material'
import { MdOutlineClose } from "react-icons/md";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';



export interface ISalaryStructureModal {
    open: boolean;
    salStrVal: any;
    handleClose: () => void;
    handleCreate: any;
    handleChange: any;
}

const SalaryStructureModal = ({ open, salStrVal, handleClose, handleCreate, handleChange }: ISalaryStructureModal) => {
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
                            label={'Gross Salary'}
                            name={'basicSalary'}
                            placeholder={''}
                            value={salStrVal.basicSalary}
                            handleChange={handleChange}
                            type={"number"}
                        />
                        <InputField
                            label={'HRA Percentage'}
                            name={'hraPercentage'}
                            placeholder={'40%'}
                            value={"40%"}
                            handleChange={handleChange}
                            type={"number"}
                        />
                    </Box>
                    <Box>
                        <InputField
                            label={'Travel Allowance'}
                            name={'travelAllowance'}
                            placeholder={''}
                            value={salStrVal.travelAllowance}
                            handleChange={handleChange}
                            type={"number"}
                        />
                    </Box>
                    <Box>
                        <CommonButton name="Cancel" onClick={handleClose} />
                        <CommonButton name="Submit" onClick={handleCreate} />
                    </Box>

                </Grid>
            </Grid>
        </Modal>
    )
}

export default SalaryStructureModal