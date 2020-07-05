import React from "react";
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import EnhancedTableHead from './EnhancedTableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';

const theme = createMuiTheme({}, ptBR);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function TableCustom({ data, columns, isEditable, handleSelected, isSelectable, linkTo, history}) {

  const classes = useStyles();
  const [selected, setSelected] = React.useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];

    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1),
    //   );
    // }
    
    if(selected !== row) {
      handleSelected(row);
      setSelected(row);
    } else {
      handleSelected({});
      setSelected({});
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getValue = (row, field, type) => {
    if(type === 'compost') {
      const splits = field.split('.');
      let retorno = row;
      splits.map(split => { 
          if(retorno[split]) { 
          retorno = retorno[split]; 
        } else { 
          retorno = '';
        } 
        return retorno;
      })

      if(retorno) {
        return retorno;
      }
      return '';
    }

    if(row[field]) {
      switch(type) {
        case 'date':
          return new Date(row[field]).toLocaleDateString();
        case 'numeric':
          return row[field];
        default:
          return row[field];
      }
    }
    return '';
  }

  const isSelected = (id) => selected.id === id;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table 
            className={classes.table}
            aria-labelledby="Tabela de Informações"
            aria-label="Tabela de Informações"
          >

          <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              isEditable={isEditable}
              headCells={columns}
            />

            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);

                    return (
                      <TableRow 
                        key={index}
                        hover
                        onClick={(event) => isSelectable ? handleClick(event, row) : null}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        selected={isItemSelected}>

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
                          <TableCell key={column.field} align={column.type === 'numeric' ? 'right' : 'left'}>
                              {
                                getValue(row, column.field, column.type)
                              }
                          </TableCell>
                        ))}
                      </TableRow>
                  )})}

              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={columns.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

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
      </Paper>
    </ThemeProvider>
  );
};

export default withRouter(TableCustom);
