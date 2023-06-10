import React from 'react'
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



function Home() {
    const baseUrl = 'http://localhost:5173/';
    const [images, setImages] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarErrorOpen, setSnackbarErrorOpen] = React.useState(false);


    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('http://localhost:5050/api/vi/images');
            const data = await res.json();

            const updatedData = data.map((item) => ({
                ...item,
            }));

            setImages(updatedData);
        } catch (error) {
            console.log(error);
        }
    };


    const DeleteAction = async (id) => {
        try {
            const res = await fetch(`http://localhost:5050/api/vi/images/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                fetchImages();
                setSnackbarOpen(true); // Show the success Snackbar
            } else {
                console.log('Error deleting image:', res.status);
                setSnackbarOpen(false); // Hide the success Snackbar
                setSnackbarErrorOpen(true); // Show the error Snackbar
            }
        } catch (error) {
            console.log('Error deleting image:', error);
            setSnackbarOpen(false); // Hide the success Snackbar
            setSnackbarErrorOpen(true); // Show the error Snackbar
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
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
                                <TableCell>{e.serialNumber} </TableCell>
                                <TableCell align="right">{e.title}</TableCell>
                                <TableCell align="right">
                                    <img src={e.image_url} alt="images" />
                                </TableCell>
                                <TableCell align="right">

                                    <DeleteIcon onClick={() => DeleteAction(e._id)} />
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        open={snackbarOpen}
                                        autoHideDuration={3000}
                                        onClose={handleCloseSnackbar}
                                    >
                                        <MuiAlert
                                            onClose={handleCloseSnackbar}
                                            severity="success"
                                            sx={{ backgroundColor: 'green', color: 'white' }}
                                        >
                                            Delete successful
                                        </MuiAlert>
                                    </Snackbar>
                                    <Snackbar
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        open={snackbarErrorOpen}
                                        autoHideDuration={3000}
                                        onClose={() => setSnackbarErrorOpen(false)}
                                        message="Error deleting image"
                                    />



                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home