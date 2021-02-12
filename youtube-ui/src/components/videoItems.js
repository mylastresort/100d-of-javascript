import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";






export default ({ video, onVideoSelect }) => {
  return (
    <Grid item xs={12} style={{margin:'0'}}>
      <Paper
      style={{ display: "flex", alignItems: "center", cursor: "pointer",fontSize:'50%', backgroundColor:'transparent' }}
      onClick={() => onVideoSelect(video)} >
        <img src={video.snippet.thumbnails.medium.url} style={{ marginRight: '8px', height: '94px',width: '168px'}}/>
        <Typography variant="subtitle1" style={{backgroundColor:'transparent'}}>
          <b style={{paddingLeft:'10px'}}>{video.snippet.title}</b>
        </Typography>
      </Paper>
    </Grid>
  );
}