import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { Box, Button, Typography, TextField, Avatar } from "@mui/material";
import { baseURL } from "../../../utils/baseURL";

interface LogoResponse {
  success: boolean;
  data?: {
    logoUrl: string;
    altText?: string;
  };
  message?: string;
}

const LogoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [existingLogo, setExistingLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const applicationName = "CYC_HRML";

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get<LogoResponse>(`${baseURL}//user/get-logo`);
        if (res.data.success && res.data.data) {
          setExistingLogo(res.data.data.logoUrl);
          setAltText(res.data.data.altText || "");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching logo:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error fetching logo:", error);
        }
      }
    };
    fetchLogo();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file && !existingLogo) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("altText", altText);
    if (file) formData.append("file", file);
    const userTokenString: any = localStorage.getItem("loginedUser")
    const userToken = JSON.parse(userTokenString)
    const { token } = userToken
    try {
      setLoading(true);
      const res = await axios.post<LogoResponse>(`${baseURL}/user/upload-logo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });
      alert(res.data.message || "Logo uploaded successfully");
      if (res.data.success && res.data.data) {
        setExistingLogo(res.data.data.logoUrl);
      }
      setFile(null);
      setPreview(null);
    } catch (error) {
      const err = error as AxiosError;
      console.error("Upload error:", err.response?.data || err.message);
      alert((err.response?.data as { message?: string })?.message || "Failed to upload logo");
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
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        boxShadow: 2,
        marginTop: "25px"
      }}
    >
      <Typography variant="h6" align="center">
        Upload Application Logo
      </Typography>

      {(preview || existingLogo) && (
        <Box display="flex" justifyContent="center">
          <Avatar
            src={preview || existingLogo || ""}
            alt={altText}
            sx={{ width: 100, height: 100 }}
          />
        </Box>
      )}

      <Button variant="outlined" component="label">
        Choose Logo
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>

      <TextField
        label="Alt Text"
        variant="outlined"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Uploading..." : "Upload Logo"}
      </Button>
    </Box>
  );
};

export default LogoUploader;
