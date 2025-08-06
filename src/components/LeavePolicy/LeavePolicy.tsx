import React, { useEffect, useState } from 'react';
import styles from './LeavePolicy.module.scss';
import { Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../utils/baseURL';

interface Policy {
  _id: string;
  applicationName: string;
  title: string;
  description: string; 
  version: number;
  effectiveDate: string;
  updatedBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const LeavePolicy: React.FC = () => {
  const [leavePolicy, setLeavePolicy] = useState<Policy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getPolicy = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/leave-policy`);
      if (response.status === 200) {
        setLeavePolicy(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching policy:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPolicy();
  }, []);

  return (
    <Grid className={styles.leavePolicyModal}>
      {loading ? (
        <Typography variant="body1">Loading policy...</Typography>
      ) : leavePolicy ? (
        <Paper sx={{ p: 3, mb: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            {leavePolicy.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Effective Date:{" "}
            {new Date(leavePolicy.effectiveDate).toLocaleDateString()} | Version{" "}
            {leavePolicy.version}
          </Typography>
          <div
            className={styles.policyDetails}
            dangerouslySetInnerHTML={{ __html: leavePolicy.description }}
          />
        </Paper>
      ) : (
        <Typography variant="body1">No policy found.</Typography>
      )}
    </Grid>
  );
};

export default LeavePolicy;
