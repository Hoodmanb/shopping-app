import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ProductsSkeleton() {
  return (
    <Stack spacing={1} flexDirection={"row"} flexWrap={"wrap"}
    width={"100%"} justifyContent={"space-between"} 
    alignItems={"center"}>
      {[0, 1, 2, 3, 4, 5].map(el => (
        <Skeleton variant="rounded" key={el} sx={{
            width:"48%",
            minWidth:"120px",
            maxWidth:"190px",
            height:"140px"}}/>
      ))
    }
    </Stack>
  );
}
