import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Pagination,
  Skeleton,
  LinearProgress
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box } from "@mui/system";
import { LIMIT_PAGE } from "../constants";
import { useEffect, useState } from "react";

const TableData = ({ openEditModal, users, deleteUser, getUsers, total, loader }) => {
  
  const handleChange = async (event, value) => {
    let page = value - 1
    await getUsers(page)
  }



  return (
    <>
    {users.length && !loader ? <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell>
              <strong>Apellido</strong>
            </TableCell>
            <TableCell>
              <strong>E-mail</strong>
            </TableCell>
            <TableCell>
              <strong>Teléfono</strong>
            </TableCell>
            <TableCell>
              <strong>C.C.</strong>
            </TableCell>
            <TableCell>
              <strong>Options</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        {<TableBody>
          {users.map((user, key) => (
            <TableRow key={key}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.cc}</TableCell>
              <TableCell>
                <Button variant="contained" color="success" onClick={()=>openEditModal(user)}>
               <EditIcon/>
                </Button>
                <Button variant="outlined" color="error" onClick={()=>deleteUser(user._id)}>
                 <DeleteIcon/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> }
      </Table>
      <Box display={'flex'} justifyContent={'center'} >
      <Pagination 
      count={Math.ceil(total/LIMIT_PAGE)} 
      style={{
        margin: '0 auto'
      }}
      onChange={handleChange}
      hidePrevButton
      hideNextButton
      />
      </Box>
    </TableContainer>  : 
          (
            <>
            <LinearProgress/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            <br/>
            <Skeleton animation="wave" height={40} variant="rectangular" />
            </>
          )}
    </>
  );
};

export default TableData;
