import React, { useState } from "react";
import { Paper, TextField } from "@material-ui/core";






export default ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Paper elevation={6}>
      <TextField fullWidth label="Search..." value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter') onSubmit(searchTerm) }}
      />
    </Paper>
  );
}
