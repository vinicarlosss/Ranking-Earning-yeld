const readlineSync = require('readline-sync');
const db = require("./db");
const empresas = [["CGRA4", "grazziotin"],
["ENAT3", "enauta"],
["JHSF3", "jhsf participacoes"],
["ODPV3", "odontoprev"],
 ["SAPR4", "sanepar"],
 ["TAEE4", "taesa"],
 ["TRPL4", "transmissão paulista"],
["WIZS3", "Wiz"]
,["LAME3", "lojas americanas"]
,["MGLU3", "Magazine luiza"],
["WEGE3", "weg"],
["SLCE3", "Slc agricola"],
["SBSP3", "CIA Saneamento de São Paulo"],
["ASAI3", "assai atacadista"], 
["CPLE3", "Copel"],
["PCAR3", "Grupo pão de açucar"],
["HYPE3", "Hypera"],
["B3SA3", "B3 Sa"],
["VALE3", "Vale"], 
["ELET3", "Eletrobras"], 
["PETR4", "petrobras"],
["KLBN4", "Klabin"], 
["ENBR3", "EDP Brasil"], 
["QUAL3", "Qualicorp"], 
["NTCO3", "Natura"],
["STBP3", "Santos Brasil"], 
["ARZZ3", "Arezzo"], 
["VIVT3", "Vivo"], 
["ABEV3", "Ambev"],
["EPAR3", "Embpar"], 
["CTNM4", "Tecidos Norte de Minas"], 
["USIM3", "Usiminas"], 
["TASA3", "Taurus Armas"], 
["PSSA3", "Porto seguro"], 
["PTBL3", "Portobello"], 
["MRVE3", "MRV engenharia"],
["LAVV3", "Lavvi"], 
["TGMA3", "Tegma"], 
["HBSA3", "Hidrovias do Brasil"], 
["SEQL3", "Sequoia"],
["GFSA3", "Gafisa"],  
["SQIA3", "Sinqia"],  
["DASA3", "Dasa"],  
["RCSL4", "recrusul"],  
["LWSA3", "Locaweb"],  
["DMVF3", "Varejo Farma"], 
["CMIN3", "csn mineração"],
["ALUP3", "Alupar"], 
["MRFG3", "Marfrig"], 
["MNPR3", "Minupar"], 
["DMMO3", "Dommo Energia"],
["UNIP3", "Unipar"], 
["LIGT3", "Light SA"], 
["GRND3", "Grendene"], 
["SEER3", "Ser Educacional"],
["ANIM3", "Anima Holding"], 
["LREN3", "Lojas Renner"], 
["SHUL4", "Schulz"], 
["MILS3", "Mills"],
["RENT3", "Localiza"], 
["LCAM3", "Locamerica"], 
["MOVI3", "Movida"], 
["LJQQ3", "Lojas quero quero"],
["PETZ3", "Petz"], 
["ESPA3", "MPM"], 
["CAMB3", "Cambucci"], 
["VULC3", "Vulcabras"], 
["TECN3", "technos"],
["VIVA3", "Vivara"], 
["CEDO4", "Cedo Textil"], 
//["PTNT4", "Petenatti"],
["SGPS3", "Springs"], 
["HGTX3", "Hering"], 
["TFCO4", "Track & Field"], 
["UCAS3", "Unicasa"], 
["SOJA3", "Boa Safra"], 
//["AGRO3", "brasilagro"], 
["TESA3", "Terra santa"], 
//["JALL3", "Jalles Machado"], 
["SMTO3", "São martinho"], 
["CAML3", "Camil"], 
["MDIA3", "M.Dias Branco"], 
["BRFS3", "brf"], 
["JBSS3", "JBS"], 
["BEEF3", "Minerva"],
["CRFB3", "Atacadão"], 
["GMAT3", "Grupo Matheus"], 
["BOBR4", "Bombril"],
["ALSO3", "Aliansce"], 
["BRPR3", "Br Properties"], 
["CYRE3", "Cyrela"], 
["HBRE3", "Realty empreendimentos"],
["IGTA3", "iguatemi"], 
["JPSA3", "Jereissati"], 
["LOGG3", "log comercial"], 
["MULT3", "Multiplan"],
["SCAR3", "São Carlos"], 
["SIMH3", "Simpar"], 
["EUCA4", "EUCATEX"],
["RANI4", "IRANI"], 
["SUZB3", "Suzano"], 
["BRAP3", "Bradespar"],
["CSNA3", "siderurgica nacional"], 
["BRKM3", "BRASKEM"], 
["MGEL4", "Mangels"], 
["GOAU3", "Metarlugia gerdau"],
["GGBR3", "Gerdau"], 
["ATOM3", "Atom empreendimentos"], 
["OPCT3", "Oceanpact"], 
["CSAN3", "Cosan"], 
["PRIO3", "Petro Rio"], 
["BRDT3", "Petrobras Distribuidora"], 
["RECV3", "Petroreconcavo"], 
["UGPA3", "Ultrapar"], 
["BLAU3", "Blau Farmaceutica"], 
["PNVL3", "Dimed"], 
["PGMN3", "Pague menos"], 
["OFSA3", "Ouro fino"],
["PFRM3", "Profarma"],
["RADL3", "Raia Drogasil"], 
["AALR3", "Alar"], 
["FLRY3", "Fleury"], 
["HAPV3", "Hapvida"], 
["MATD3", "Hospital mat dei"], 
["PARD3", "Hermes Pardini"], 
["GNDI3", "Notre Dame"], 
["RDOR3", "Rede dor"], 
["BMOB3", "Bemobi"], 
["CASH3", "Méliuz"], 
["MOSI3", "Mosaico tecnologia"],
["NGRD3", "Neogrid"], 
["TOTS3", "Totvs"], 
["POSI3", "Positivo"], 
["INTB3", "Intelbras"],
["AMBP3", "Ambipar"], 
["CSMG3", "Copasa"], 
["ORVR3", "Orizon"], 
["TIET3", "AES Tietê"],
["CMIG4", "Cemig"], 
["CLSC4", "Celesc"], 
["CEEB3", "Eletricidade Bahia"], 
["CPFE3", "cpfl"],
["KEPL3", "kepler weber"], 
["EMAE4", "Empresa Metrop"], 
["ENGI4", "Energisa"], 
["ENEV3", "Eneva"],
["EGIE3", "Engie"], 
["EQTL3", "Equatorial"], 
["POWE3", "Power"], 
["NEOE3", "Neoenergia"],
["OMGE3", "Omega"]];
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
    console.log("\n ----Menu Principal----\nO que você deseja fazer?\n1 - Inserir Empresa\n2 - Atualizar Empresa\n3 - Excluir Empresa\n4 - Selecionar Empresa\n5 - Listar Empresas\n6 - Rankear ações mais baratas da bolsa\n7 - Top 10 ações mais baratas\n0 - Sair\n");
    return validaFaixaInteiro("Digite a opcao que voce deseja: \n", 0, 7);
};

(async () => {
    while(true){
        escolha = menu();
        if (escolha == 0){
            break
        }else if(escolha == 1){

            await db.insertEmpresa(empresas);
        }else if(escolha == 2){

            await db.updateEmpresa(empresas);
        }else if(escolha == 3){

            await db.deleteEmpresa(readlineSync.question("\nDigite o ticker da empresa que deseja apagar do sitema: \n"));
        }else if(escolha == 4){
            await db.selectEmpresa(readlineSync.question("\nDigite o ticker da empresa desejada: \n"));
        }else if(escolha == 5){
            await db.listarEmpresas();
        }else if(escolha == 6){
            await db.rankearEmpresas();
        }else if(escolha == 7){
            const resposta = await db.topEmpresas();
            for(let i = 0; i < resposta.length; i++){
                console.log(`${i+1}`+"°--> " + "Ticker: " + `${resposta[i].ticker} ` + "Earning yeld: " + `${resposta[i].earning_yeld}`);
            }
        }
    };
    console.log("\nObrigado por utilizar o Ranking Earning yeld\n");
})();
