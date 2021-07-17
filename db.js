function calculaEarningYeld(ebit,valor_mercado,divida_liquida){
    let ey = ebit/(valor_mercado+divida_liquida)*100;
    return ey.toFixed(2)
}
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:1998ronca@localhost:3306/formula_magica");
    console.log("Conectou no MySQL");
    global.connection = connection;
    return connection
}

async function selectEmpresa(empresa){
    const conn = await connect();
    const sql = 'SELECT * FROM empresa WHERE ticker=?;'
    const values = [empresa];
    const [rows] = await conn.query(sql,values);
    if(rows.length > 0){
        console.log("\n");
        return console.log(rows)
    }else{
        return console.log(`\nNão foi encontrada nenhuma empresa com o ticker ${empresa}`);
    };
}

async function insertEmpresa(empresa){
    const conn = await connect();
    const sql = 'INSERT INTO empresa (ticker,nome_empresa,ebit,valor_mercado,divida_liquida) VALUES(?,?,?,?,?);'
    const values = [empresa.ticker, empresa.nome_empresa, empresa.ebit, empresa.valor_mercado, empresa.divida_liquida];
    await conn.query(sql,values);
    const ey = calculaEarningYeld(empresa.ebit, empresa.valor_mercado, empresa.divida_liquida);
    const sql2 = 'INSERT INTO ranking (ticker,earning_yeld) VALUES(?,?);'
    const values2 = [empresa.ticker,ey];
    await conn.query(sql2,values2);
};

async function updateEmpresa(ticker, empresa){
    const conn = await connect();
    const sql = 'UPDATE empresa SET nome_empresa = ?, ebit=?,valor_mercado=?,divida_liquida=? WHERE ticker=?';
    const values =  [empresa.nome_empresa,empresa.ebit,empresa.valor_mercado, empresa.divida_liquida, ticker];
    await conn.query(sql,values);
}

async function deleteEmpresa(ticker){
    const conn = await connect();
    const sql = 'DELETE FROM empresa WHERE ticker=?;';
    await conn.query(sql,[ticker]);
}

module.exports = {selectEmpresa, insertEmpresa,updateEmpresa, deleteEmpresa}