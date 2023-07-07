import { Backdrop, Box, Button, Card, CardActionArea, Input, Paper, TextField } from '@mui/material';

import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
var formData = new FormData();

function Upload() {
  const onDrop1 = useCallback(acceptedFiles => {
    formData.append('songAudio', acceptedFiles)
  }, [])
  const onDrop2 = useCallback(acceptedFiles => {
    formData.append('songImage', acceptedFiles)
}, [])

const [songName,setSongName] = useState("");
const onclick = () =>
{
    fetch("https://localhost:7117/api/Song", {method: "POST",
    body: formData})
}

const onchange = (e) =>
{
    setSongName(e.target.value)
    formData.set("songName",songName)
    console.log(songName)
}
  const {getRootProps: getRootProps1,getInputProps: getInputProps1,isDragActive: isDragActive1} = useDropzone({onDrop1})
  const {getRootProps: getRootProps2,getInputProps: getInputProps2, isDragActive: isDragActive2} = useDropzone({onDrop2})

  return (
    <Card variant='outlined'>
        <CardActionArea sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: "gray",
        height: 200,
        '& > :not(style)': {
          m: 1,
          width: "100%",
          height: "100%",
        },
      }} {...getRootProps1()}>
        <Paper elevation={3}
          {...getInputProps1()} />
          {
            isDragActive1 ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </CardActionArea> 
        <CardActionArea sx={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: "gray",
        height: 200,
        '& > :not(style)': {
          m: 1,
          width: "100%",
          height: "100%",
        },
      }} {...getRootProps2()}>
        <Paper elevation={3}
          {...getInputProps2()} />
          {
            isDragActive2 ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </CardActionArea> 
        <TextField id="song-name" label="Song name" variant="outlined" onChange={onchange} />
        <Button variant='contained' onClick={onclick}>Upload</Button>
        </Card>
  )
}


export default Upload;