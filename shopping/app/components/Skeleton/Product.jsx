import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function ProductSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={"100%"} height={"300px"} />
      <Stack
        flexDirection={"column"}
        width={"100%"}
        alignItems={"start"}
        pl={"20px"}
        mt={"20px"}
        gap={3}>

        <Skeleton variant="text" width={"60px"} height={"20px"} />
        <Skeleton variant="text" width={"90px"} height={"15px"} />

        <Stack direction={"row"} width={"70%"} justifyContent={"space-between"}>
          <Skeleton variant="rounded" width={"40%"} height={"30px"} />
          <Skeleton variant="rounded" width={"40%"} height={"30px"} />
        </Stack>

        <Stack gap={1} width={"95%"}>
          <Skeleton variant="text" width={"100%"} height={"15px"} />
          <Skeleton variant="text" width={"100%"} height={"15px"} />
          <Skeleton variant="text" width={"100%"} height={"15px"} />
          <Skeleton variant="text" width={"100%"} height={"15px"} />
          <Skeleton variant="text" width={"100%"} height={"15px"} />
        </Stack>


        <Stack justifyContent={"space-between"} width={"90%"}
          direction={"row"}

          alignItems={'center'}>
          <Skeleton variant="rounded" width={"40%"} height={"40px"}
            sx={ { borderRadius: "20px" }} />
          <Skeleton variant="rounded" width={"40%"} height={"40px"}
            sx={ { borderRadius: "20px" }} />
        </Stack>

      </Stack>
    </>
  );
}