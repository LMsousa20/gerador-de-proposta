const express = require("express");
const app = express();
const cors = require('cors');
const { Pool } = require('pg')
const PORT = process.env.PORT || 3001;
    const pool = new Pool({
        user: "hlptpkjq",
        host: "babar.db.elephantsql.com",
        database: "hlptpkjq",
        password: "SXpzGhm225WohWIIkxpJIC5kIRVfUM5U",
        // port: 5432
    })
        
app.use(cors())
app.use(express.json())

app.get('/users', async (req, res) => {
 
    try {
        const retorno = await pool.query(`SELECT * FROM "public"."clientes" LIMIT 100`)
        var reposta = res.status(200).send(retorno.rows)
  
        return reposta
    }
    catch (err) {
        return res.status(400).send(err)
    }
  })

app.get('/users/:idclient', async (req, res) => {
    var client = req.params.idclient;
    console.log(client)
    console.log(typeof client)
  
    try {
        const retorno = await pool.query(`SELECT * FROM clientes WHERE cnpj='${client}'`)
        var reposta = res.status(200).send(retorno.rows)
  
        return reposta
    }
    catch (err) {
        return res.status(400).send(err)
    }
  })

app.listen(PORT, () => console.log(`Servidor Rodando na PORT ${PORT}!`));