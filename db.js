function calculaEarningYeld(ebit,valor_mercado,divida_liquida){
    let ey = ebit/(valor_mercado+divida_liquida)*100;
    return ey.toFixed(2)
}
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:1998ronca@localhost:3306/formula_magica");
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
        console.log("OBS: Valores em milhões de reais");
        return console.log(rows)
    }else{
        return console.log(`\nOps! Não foi encontrada nenhuma empresa com o ticker ${empresa}.`);
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
    const ey = calculaEarningYeld(empresa.ebit, empresa.valor_mercado, empresa.divida_liquida);
    const sql2 = 'UPDATE ranking SET earning_yeld = ? WHERE ticker=?;';
    const values2 = [ey, ticker];
    await conn.query(sql2,values2);
}

async function deleteEmpresa(ticker){
    const conn = await connect();
    const sql = 'DELETE FROM empresa WHERE ticker=?;';
    await conn.query(sql,[ticker]);
}

async function listarEmpresas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM empresa;');
    return console.log(rows);
}
async function rankearEmpresas(){
    const conn = await connect();
    const[rows] = await conn.query('SELECT * FROM ranking ORDER BY earning_yeld DESC');
    console.log("Esas são as empresas mais baratas da bolsa")
    return console.log(rows);
}

module.exports = {selectEmpresa, insertEmpresa,updateEmpresa, deleteEmpresa, listarEmpresas, rankearEmpresas}