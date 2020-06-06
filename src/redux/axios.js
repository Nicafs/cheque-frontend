import axios from 'axios';

//criando url base para requisições 
const url = 'http://localhost:3333';

//configurando o typo de requisição e rota base
export default axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json'
  }
});