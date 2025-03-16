import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loading() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw'
            }}
        >
            <CircularProgress sx={{ color: (theme) => theme.customColors.green }} />
            <Typography ml={2} variant="subtitle2">Loading...</Typography>
        </Box>
    );
}
