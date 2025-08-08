import React from 'react';
import styles from './SalaryStructureModal.module.scss';
import { Grid, Modal, Box, Typography, Divider } from '@mui/material';
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
        <Modal open={open} className={styles.salaryStructureModal}>
            <Box className={styles.salaryStructure} p={3} bgcolor="white" borderRadius={2}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontSize={22} fontWeight={500}>Create Salary</Typography>
                    <MdOutlineClose fontSize={22} cursor="pointer" onClick={handleClose} />
                </Box>

                <Divider sx={{ marginBlockStart: 1, marginBlockEnd: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <InputField
                            label="Gross Salary (Without TA)"
                            name="grossSalaryWithoutTA"
                            value={salStrVal.grossSalaryWithoutTA}
                            placeholder=""
                            handleChange={handleChange}
                            type="number"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputField
                            label="Travel Allowance (optional)"
                            name="travelAllowance"
                            value={salStrVal.travelAllowance}
                            placeholder=""
                            handleChange={handleChange}
                            type="number"
                        />
                    </Grid>

                    {/* Buttons row */}
                    <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2} mt={2}>
                        <CommonButton name="Cancel" onClick={handleClose} />
                        <CommonButton name="Submit" onClick={handleCreate} />
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default SalaryStructureModal;
