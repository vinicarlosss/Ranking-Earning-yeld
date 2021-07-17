const readlineSync = require('readline-sync');
const db = require("./db");
function validaFaixaInteiro(pergunta, inicio, fim){
    while(true){
        let valor = readlineSync.question(pergunta);
        if(inicio<= valor && valor <= fim){
            return(valor)
        }else{
            console.log(`\nValor inválido, favor digitar entre ${inicio} e ${fim}\n`);
            continue
        };
    };
};

function menu(){
    console.log("\n ----Menu Principal----\nO que você deseja fazer?\n1 - Inserir Empresa\n2 - Atualizar Empresa\n3 - Excluir Empresa\n4 - Selecionar Empresa\n5 - Listar Empresas\n6 - Rankear ações mais baratas da bolsa\n0 - Sair\n");
    return validaFaixaInteiro("Digite a opcao que voce deseja: \n", 0, 6);
};

(async () => {
    while(true){
        escolha = menu();
        if (escolha == 0){
            break
        }else if(escolha == 1){
            
            let ticker = readlineSync.question("\nDigite o ticker da empresa: \n");
            let nome_empresa = readlineSync.question("\nDigite o nome da empresa: \n");
            let ebit = Number(readlineSync.question("\nDigite o Ebit da empresa: \n"));
            let valor_mercado = Number(readlineSync.question("\nDigite o valor de mercado da empresa: \n"));
            let divida_liquida = Number(readlineSync.question("\nDigite o valor da divida líquida da empresa: \n"));
            await db.insertEmpresa({ticker: ticker, nome_empresa: nome_empresa, ebit: ebit, valor_mercado: valor_mercado, divida_liquida: divida_liquida});
        }else if(escolha == 2){

            let ticker = readlineSync.question("\nDigite o ticker da empresa: \n");
            let nome_empresa = readlineSync.question("\nDigite o nome da empresa: \n");
            let ebit = Number(readlineSync.question("\nDigite o Ebit da empresa: \n"));
            let valor_mercado = Number(readlineSync.question("\nDigite o valor de mercado da empresa: \n"));
            let divida_liquida = Number(readlineSync.question("\nDigite o valor da divida líquida da empresa: \n"));
            await db.updateEmpresa(ticker,{nome_empresa: nome_empresa, ebit: ebit, valor_mercado: valor_mercado, divida_liquida: divida_liquida});
        }else if(escolha == 3){

            await db.deleteEmpresa(readlineSync.question("\nDigite o ticker da empresa que deseja apagar do sitema: \n"));
        }else if(escolha == 4){
            await db.selectEmpresa(readlineSync.question("\nDigite o ticker da empresa desejada: \n"));
        }else if(escolha == 5){
            await db.listarEmpresas();
        }else if(escolha == 6){
            await db.rankearEmpresas();
        };
    };
    console.log("\nObrigado por utilizar o Ranking Earning yeld\n");
})();