import React from 'react'
import styles from './BusinessModal.module.scss'
import { Box, Grid, Modal, Divider, Typography, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { RxCross2 } from "react-icons/rx";
import InputField from '../../inputField/InputField';
import CommonButton from '../../common/CommonButton/CommonButton';
import SelectField from '../../SelectField/SelectField';


export interface IBusinessModal {
    open: boolean;
    handleClose: any;
    businessValue: any;
    handleChange: any;
    handleClick: any;
};
const BusinessModal = ({ open, handleClose, businessValue, handleChange, handleClick }: IBusinessModal) => {
    const data = {
        "leadType": [
            {
                "id": 1,
                "label": "Event"
            },
            {
                "id": 2,
                "label": "Room"
            }
        ],
        "leadFrom": [
            {
                "id": 1,
                "label": "Direct"
            },
            {
                "id": 2,
                "label": "Vendor"
            }
        ]
    }
    return (
        <Modal
            open={open}
            sx={{ width: 500, height: 'fit-content', margin: 'auto' }}
        >
            <Grid className={styles.businessModal}>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant='h5' fontSize={22} fontWeight={500}>Add Business</Typography>
                    <RxCross2 fontSize={22} cursor={"pointer"} onClick={handleClose} />
                </Box>
                <Divider style={{ marginBlockStart: 2, marginBlockEnd: 4 }} />
                <Grid className={styles.selectField}>
                    <SelectField
                        title={'Lead Type'}
                        data={data.leadType}
                        option={businessValue.leadType}
                        name={'leadType'}
                        handleChange={handleChange}
                    />
                    <SelectField
                        title={'Lead From'}
                        data={data.leadFrom}
                        option={businessValue.leadFrom}
                        name={'leadFrom'}
                        handleChange={handleChange}
                    />
                </Grid>
                {/* <Grid sx={{ marginBlock: 2 }}>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Lead From</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="direct" control={<Radio />} label="Direct" />
                            <FormControlLabel value="vender" control={<Radio />} label="Vender" />
                        </RadioGroup>
                    </FormControl>
                </Grid> */}
                {businessValue.leadFrom === "Direct"
                    ?
                    ""
                    :
                    <Grid className={styles.businesDetails}>
                        <Grid>
                            <InputField
                                label={'Business Value'}
                                name={'businessVal'}
                                placeholder={''}
                                value={businessValue.businessVal}
                                handleChange={handleChange}
                                type={"number"}
                            />
                            <InputField
                                label={'Business Cost'}
                                name={'businessCost'}
                                placeholder={''}
                                value={businessValue.businessCost}
                                handleChange={handleChange}
                                type={"number"}
                            />
                        </Grid>
                        <InputField
                            label={'Profit Amount'}
                            name={'profitAmount'}
                            placeholder={''}
                            value={businessValue.profitAmount}
                            handleChange={handleChange}
                            type={"number"}
                        />
                    </Grid>
                }
                <Grid className={styles.action}>
                    <CommonButton name={"Close"} onClick={handleClose} />
                    <CommonButton name={"Submit"} onClick={handleClick} />
                </Grid>
            </Grid>
        </Modal>
    )
}

export default BusinessModal