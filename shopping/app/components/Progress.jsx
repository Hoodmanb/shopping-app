import { Typography, Box, CircularProgress } from "@mui/material";

export default function Progress() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "#ffffff",
                textAlign: "center",
                px: 2,
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, color: "#2196F3" }}>
                🚧 Page in Progress 🚧
            </Typography>
            <Typography variant="h5" sx={{ color: "#bbbbbb", mb: 3 }}>
                We're working hard to bring this page to life. Check back soon!
            </Typography>
            {/* <CircularProgress sx={{ color: "#2ECC71" }} /> */}
        </Box>
    );
}
