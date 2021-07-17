const readlineSync = require('readline-sync');
const db = require("./db");
console.log(typeof(empresas[0][2]));
function validaFaixaInteiro(pergunta, inicio, fim){
    while(true){
        let valor = readlineSync.question(pergunta);
        if(inicio<= valor && valor <= fim){
            return(valor)
        }else{
            console.log(`Valor inválido, favor digitar entre ${inicio} e ${fim}`);
            continue
        };
    };
};

function menu(){
    console.log("\n ----Menu Principal----\nO que você deseja fazer?\n1 - Inserir Empresa\n2 - Atualizar Empresa\n3 - Excluir Empresa\n4 - Selecionar Empresa\n0 - Sair\n");
    return validaFaixaInteiro("Digite a opcao que voce deseja: ", 0, 4);
};

(async () => {
    console.log("Começou!");
    while(true){
        escolha = menu();
        if (escolha == 0){
            break
        }else if(escolha == 1){
            await db.insertEmpresa(empresas);
        }else if(escolha == 2){
            console.log("\n2");
        }else if(escolha == 3){
            await db.deleteEmpresa(readlineSync.question("\nDigite o ticker da empresa que deseja apagar do sitema: "));
        }else if(escolha == 4){
            await db.selectEmpresa(readlineSync.question("\nDigite o ticker da empresa desejada: "));
        };
    };
    console.log("\nObrigado por utilizar o Ranking Earning yeld\n");
})();