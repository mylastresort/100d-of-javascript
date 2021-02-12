import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Search, VideoList, VideoDetails } from "./components";
import youtube from "./google api/fetchytbapi";






export default () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <Grid style={{ justifyContent: "center",width:'fit-content',display:'flex'}} container spacing={10}>
      <Grid item xs={11} style={{width:'100vw'}}>
        <Grid container spacing={10} >
          <Grid item xs={12}>
            <Search onSubmit={getResults} />
          </Grid>
          <Grid item xs={8} >
            <VideoDetails video={selectedVideo} />
          </Grid>
          <Grid item xs={4} style={{float:'right'}}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  async function getResults(keyword) {
    const { data: { items: videos } } = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 26,
        key: 'AIzaSyCByDY3ZWyjgjp5pIrlZxumd57W0Cyd3wk',
        q: keyword,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }
}