import React from "react";
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({}, ptBR);

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

function TableCustom({ data, columns, isEditable, linkTo, history}) {

  const [page, setPage] = React.useState(0);
  // const [order, setOrder] = React.useState('asc');
  // const [orderBy, setOrderBy] = React.useState('calories');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getValue = (row, field, type) => {
    switch(type) {
      case 'date':
        return row[field].toLocaleDateString();
      case 'numeric':
        return row[field];
      default:
        return row[field];
    }
  }

  return (
    <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table className='table'>
            <TableHead>
              <TableRow>
                {isEditable ? <TableCell> Ações </TableCell> : null}
                {columns.map(head => (
                  <TableCell key={head.title}> {head.title} </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {

                    return (
                      <TableRow key={row.id}>
                        {isEditable ?
                          <TableCell>
                            <IconButton aria-label="editar" onClick={() => history.push(`${linkTo}/${row.id}`)}>
                              <EditIcon />
                            </IconButton>

                            <IconButton aria-label="deletar" onClick={() => history.push(`${linkTo}/${row.id}`)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        : null}

                        {columns.map(column => (
                          <TableCell key={column.field}>
                            {
                              getValue(row, column.field, column.type)
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                  )})}
            </TableBody>
          </Table>


          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="Registros por página"
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
    </ThemeProvider>
  );
};

export default withRouter(TableCustom);
