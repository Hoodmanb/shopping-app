import { Typography, Box } from "@mui/material";

export default function Offline() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                color: "#2196F3",
                textAlign: "center",
                px: 2,
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
                Access Denied
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
                You are not logged in. Please log in to continue.
            </Typography>
            <Box
                component="a"
                href="/auth/login"
                sx={{
                    backgroundColor: "#2ECC71",
                    borderRadius: "20px",
                    color: "text.secondary",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    px: 4,
                    py: 1,
                    "&:hover": {
                        backgroundColor: "#28b463",
                    },
                }}
            >
                Login
            </Box>
        </Box>
    );
}
