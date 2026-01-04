import React, { lazy } from "react";

import { useState, useCallback } from "react";

import useImages from "~/hooks/useImages";

import { ImageList, ImageListItem } from "@mui/material";
import LoadingCircular from "~/components/LoadingCircular";
import { useImageMutation } from "~/hooks/useImageMutation";
import { Paging } from "~/types";
import { useRecoilValue } from "recoil";
import { userState } from "~/atoms";
import NoData from "~/components/NoData";
import { BASE_URL } from "~/config/config";
import Item from "./Item";

function Home() {
  const user = useRecoilValue(userState);
  const [allImages, setAllImages] = useState([]);
  const [paging, setPaging] = useState<Paging>({ page: 1, size: 10 });
  const { data, isInitialLoading, error } = useImages({
    page: paging?.page,
    size: paging?.size,
  });

  const items = data;
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

  if (!items?.length) {
    return <NoData />;
  }

  return (
    <>
      {/* <Grid container>
        {items?.map((_item: any, i: number) => {
          return (
            <Grid key={_item.id} size={{ xs: 12, md: 4 }}>
              <Image user={user} handleDelete={handleDelete} data={_item} />
            </Grid>
          );
        })}
      </Grid> */}

      <ImageList variant="masonry" cols={3} gap={8}>
        {items.map((_item: any) => (
          <Item key={_item.id} data={_item} />
        ))}
      </ImageList>
    </>
  );
}

export default Home;
