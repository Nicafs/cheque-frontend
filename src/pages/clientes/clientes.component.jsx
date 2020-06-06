import React from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { find } from '../../redux/client/client.actions';

const columns = [
  {
    Header: "Nome",
    accessor: "name"
  },
  {
    Header: "E-mail",
    accessor: "email"
  },
  {
    Header: "Data de Nascimento",
    accessor: "birthDate"
  },
  {
    Header: "Sexo",
    accessor: "gender"
  },
  {
    Header: "Celular",
    accessor: "phone"
  },
  {
    Header: "Endereço",
    accessor: "address"
  }
];

class Clientes extends React.Component {
  constructor({props}) {
    super(props);
  }

  componentWillMount() {
    console.log("Entrou no didmount, props:",this.props);
    
    const { dispatch } = this.props;
    
    dispatch(find());
  }

  render() {
    const { data } = this.props;
    return (
      <div className="Clientes">
        <div className="form">
          <div className="row">
            <div className="col-12 col-md-3">
              <div className="form-group">
                <label>Nome</label>
                <Input type="text" className="form-control" id='nameForm'
                  name="Name" value={this.state.user.Name}
                  onChange={e => this.updateField(e)}
                  placeholder="Digite o nome aqui..." />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>E-mail</label>
                <Input type="text" className="form-control" id='emailForm'
                  name="Description" value={this.state.user.Description}
                  onChange={e => this.updateField(e)}
                  placeholder="Digite othis. e-mail aqui..." />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <Button className="btn btn-secundarythis." 
                onClick={() =>['/crud']}>
                Criar
                </Button>
              <Button className="btn btn-primary  ml-2"
                onClick={() =>  this.props.history.push('/clientes/crud')}>
                Voltar
              </Button>
            </div>
          </div>
        </div>

        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={data}
          setData={this.setData}
          updateMyData={this.updateMyData}
          skipPageReset={false}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) =>{
 return {
    data : state.client.data
 };
}
const connectedClientsPage = withRouter(connect(mapStateToProps, null, null, {
 pure: false
})(Clientes));

export { connectedClientsPage as Clientes };
