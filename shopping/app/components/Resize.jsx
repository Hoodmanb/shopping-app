import { Typography, Box } from "@mui/material";

export default function Resize() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#121212",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Typography
                variant="h1"
                sx={{
                    color: "#7b0000",
                    fontSize: "6rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "5px",
                    position: "relative",
                    textShadow: `
                        -4px -4px 0 black,
                        4px 4px 0 black,
                        -3px 3px 0 #121212,
                        3px -3px 0 #121212
                    `,
                    filter: "blur(0.6px)",
                    transform: "rotate(-2deg)",
                    background: "linear-gradient(to right, #D32F2F 50%, black 50%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    clipPath: "polygon(0% 0%, 45% 10%, 50% 5%, 55% 12%, 60% 8%, 65% 10%, 70% 5%, 100% 0%, 100% 100%, 0% 100%)",
                }}
            >
                ERROR
            </Typography>

            <Typography variant="subtitle1" sx={{ color: "#D32F2F", textAlign: "center", mt: 2 }}>
                This app is not available for large screen sizes yet!
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#D32F2F", textAlign: "center" }}>
                Please resize or switch to a smaller screen
            </Typography>
        </Box>
    );
}
