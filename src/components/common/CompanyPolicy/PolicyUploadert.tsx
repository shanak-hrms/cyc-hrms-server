import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, TextField, Paper, CircularProgress } from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { baseURL } from "../../../utils/baseURL";

const PolicyUploader: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [effectiveDate, setEffectiveDate] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken;

    const applicationName = "CYC_HRMS";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Title and Policy Description are required.");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                applicationName,
                title,
                description,
                effectiveDate: effectiveDate || new Date().toISOString(),
                isActive: true,
            };

            const res = await axios.post(`${baseURL}/user/company-policy`, payload, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });
            alert(res.data.message || "Policy uploaded successfully!");
            setTitle("");
            setDescription("");
            setEffectiveDate("");
        } catch (error: any) {
            console.error("Upload error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to upload policy");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 3,
                maxWidth: 900,
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h5" align="center">
                Upload / Update Company Policy
            </Typography>

            <TextField
                label="Policy Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <TextField
                type="date"
                label="Effective Date"
                InputLabelProps={{ shrink: true }}
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
            />

            <Paper sx={{ p: 2, minHeight: 300 }}>
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    placeholder="Write your company policy here..."
                    style={{ minHeight: 200 }}
                />
            </Paper>

            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 2 }}
            >
                {loading ? <CircularProgress size={24} /> : "Upload Policy"}
            </Button>
        </Box>
    );
};

export default PolicyUploader;
