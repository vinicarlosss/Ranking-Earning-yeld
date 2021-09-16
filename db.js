const axios = require("axios");
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
    for(let i = 0; i<empresa.length; i++){
        let periodo = ["2021_T2", "2021_T1", "2020_T4", "2020_T3"];
        let resultado = undefined
        let ebit = 0
        await axios.get(`https://www.okanebox.com.br/api/demonstrativofinanceiro/${empresa[i][0]}/`)
        .then(function(data){
            resultado = data.data
            let c = 0

            while (c < resultado.length){
                if (resultado[c]['DS_CONTA'] == "Resultado Antes do Resultado Financeiro e dos Tributos"){
                    for(let j = 0; j<4; j++){
                        ebit += resultado[c][periodo[j]];
                    }
                    break
                }else{
                    c += 1
                };
            };
            ebit = (ebit/1000000).toFixed(2);
        });
        const conn = await connect();
        const sql = 'INSERT INTO empresa (ticker,nome_empresa,ebit,valor_mercado,divida_liquida) VALUES(?,?,?,?,?);'
        resultado = undefined;
        await axios.get(`https://www.okanebox.com.br/api/analisefundamentalista/${empresa[i][0]}`)
        .then(function(data){
            resultado = data.data
        });
        const values = [empresa[i][0], empresa[i][1], ebit, (resultado[2].value/1000000).toFixed(2), (resultado[9].value/1000000).toFixed(2)];
        await conn.query(sql,values);
        const ey = calculaEarningYeld(ebit, (resultado[2].value/1000000),(resultado[9].value/1000000));
        const sql2 = 'INSERT INTO ranking (ticker,earning_yeld) VALUES(?,?);'
        const values2 = [empresa[i][0],ey];
        await conn.query(sql2,values2);
    };
};

async function updateEmpresa(empresa){
    for(let i = 0; i<empresa.length; i++){
        const conn = await connect();
        const sql = 'UPDATE empresa SET nome_empresa = ?, ebit=?,valor_mercado=?,divida_liquida=? WHERE ticker=?';
        const values =  [empresa[i][1], empresa[i][2], empresa[i][3], empresa[i][4], empresa[i][0]];
        await conn.query(sql,values);
        const ey = calculaEarningYeld(empresa[i][2], empresa[i][3], empresa[i][4]);
        const sql2 = 'UPDATE ranking SET earning_yeld = ? WHERE ticker=?;';
        const values2 = [ey, empresa[i][0]];
        await conn.query(sql2,values2);
    };

}

async function deleteEmpresa(ticker){
    const conn = await connect();
    const sql = 'DELETE FROM empresa WHERE ticker=?;';
    await conn.query(sql,[ticker]);
}

async function listarEmpresas(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM empresa;');
    console.log("Numero de empresas: " + rows.length);
    return console.log(rows);
}
async function rankearEmpresas(){
    const conn = await connect();
    const[rows] = await conn.query('SELECT * FROM ranking ORDER BY earning_yeld DESC');
    console.log("Numero de empresas: " + rows.length);
    console.log("Ranking das empresas da bolsa");
    return console.log(rows);
}
async function topEmpresas(){
    const conn = await connect();
    const[rows] = await conn.query('SELECT * FROM ranking ORDER BY earning_yeld DESC LIMIT 10;');
    console.log(`Essas são as ${rows.length} empresas mais baratas da bolsa`);
    return rows;
}

module.exports = {selectEmpresa, insertEmpresa,updateEmpresa, deleteEmpresa, listarEmpresas, rankearEmpresas, topEmpresas}
