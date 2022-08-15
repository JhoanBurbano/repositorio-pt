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
  Skeleton
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import useUsers from "../hooks/useUsers";
import { Box } from "@mui/system";
import { LIMIT_PAGE } from "../constants";

const TableData = ({ openEditModal }) => {
  const { users, deleteUser, changePage, total } = useUsers();
  function handleChange (event, value) {
    changePage(value - 1)
  }
  return (
    <>
    {users.length ? <TableContainer component={Paper}>
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
      <Box style={
        {
          display: 'flex',
          justifyContent: 'center'
        }
      }>
      <Pagination 
      count={LIMIT_PAGE} 
      style={{
        margin: '0 auto'
      }}
      onChange={handleChange}
      />
      </Box>
    </TableContainer>  : 
          (
            <>
            <Skeleton variant="rectangular" />
            <br/>
            <Skeleton variant="rectangular" />
            <br/>
            <Skeleton variant="rectangular" />
            <br/>
            <Skeleton variant="rectangular" />
            <br/>
            <Skeleton variant="rectangular" />
            <br/>
            </>
          )}
    </>
  );
};

export default TableData;
