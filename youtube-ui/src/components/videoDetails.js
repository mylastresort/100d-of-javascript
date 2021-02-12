import React from "react";
import { Paper, Typography } from "@material-ui/core";





export default ({ video }) => {
  if (!video) return <p>Loading...</p>

  return (
    <>
      <Paper elevation={6} style={{width:'50vw', height: "60vh",minHeight:'400px',minWidth:'600px' ,backgroundColor:'orange'}}>
        <iframe frameBorder="0" width="100%" height="100%" src={`https://www.youtube.com/embed/${video.id.videoId}`} />
        <Paper elevation={6}>
          <Typography variant="h4">
            {video.snippet.title} - {video.snippet.channelTitle}
          </Typography>
          <Typography variant="subtitle1">
            {video.snippet.channelTitle}
          </Typography>
          <Typography variant="subtitle2">{video.snippet.description}</Typography>
        </Paper>
      </Paper>

    </>
  );
}