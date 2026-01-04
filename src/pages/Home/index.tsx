import React, { lazy } from "react";

import { useState, useCallback } from "react";

import useImages from "~/hooks/useImages";

import { Box, CircularProgress, Grid } from "@mui/material";
import LoadingCircular from "~/components/LoadingCircular";
import InfiniteScroll from "react-infinite-scroll-component";
import { useImageMutation } from "~/hooks/useImageMutation";
import { type Paging } from "~/types";
import Image from "~/components/Image";
import { useRecoilValue } from "recoil";
import { userState } from "~/atoms";
import NoData from "~/components/NoData";

function Home() {
  const user = useRecoilValue(userState);
  const [allImages, setAllImages] = useState([]);
  const [paging, setPaging] = useState<Paging>({ page: 1, size: 10 });
  const {
    data: results,
    isInitialLoading,
    error,
  } = useImages({
    page: paging?.page,
    size: paging?.size,
  });
  const { mDelete } = useImageMutation();

  const handleDelete = useCallback(async (_id: string) => {
    const res = mDelete.mutateAsync(
      {
        ids: [_id],
      },
      {
        onSuccess: () => {
          setAllImages(allImages.filter((image: any) => image._id !== _id));
        },
      }
    );
  }, []);

  if (error) {
    console.log("Error:", error);
    return <p>Error: </p>;
  }

  if (isInitialLoading) {
    return <LoadingCircular fullHeight />;
  }

  if (!results?.length) {
    return <NoData />;
  }

  return (
    <>
      {/* <Counter /> */}
      <InfiniteScroll
        dataLength={results?.length}
        next={() => {
          console.log(123456);

          return setPaging((prev) => ({
            ...prev,
            size: prev?.size + 10,
          }));
        }}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={false}
        // scrollThreshold={0}
        loader={<LoadingCircular />}
        height={"100%"}
        hasChildren={!!results?.length}
      >
        <Grid container>
          {results?.map((singleData: any, i: number) => {
            return (
              <Grid key={singleData._id} size={{ xs: 12, md: 4 }}>
                <Image
                  user={user}
                  handleDelete={handleDelete}
                  singleData={singleData}
                />
              </Grid>
            );
          })}
        </Grid>
      </InfiniteScroll>
    </>
  );
}

export default Home;
