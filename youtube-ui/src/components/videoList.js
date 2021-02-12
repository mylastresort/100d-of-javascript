import React from "react";
import { Grid } from "@material-ui/core";
import VideoItems from "./videoItems";






export default ({ videos, onVideoSelect }) => {
  return (
    <Grid container spacing={10}>
      {videos.map(video => <VideoItems onVideoSelect={onVideoSelect} video={video} />)}
    </Grid>
  );
}
