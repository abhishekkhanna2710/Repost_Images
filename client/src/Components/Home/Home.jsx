import React from 'react'
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);


    const fetchImages = async () => {
        try {
            const res = await fetch('http://localhost:5050/api/vi/images');
            const data = await res.json();
            console.log(data)
            setImages(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Serial Number</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {images.map((e) => (
                            <TableRow key={e._id}>
                                <TableCell component="th" scope="row">
                                    {e.serialNumber}
                                </TableCell>
                                <TableCell align="right">{e.title}</TableCell>
                                <TableCell align="right">  <img src={e.image_url} alt="images" /> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home