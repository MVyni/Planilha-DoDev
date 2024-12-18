const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const credentials = require("./credentials.json");
const arquivo = require("./arquivo.json");

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const jwt = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
});

const doc =  new GoogleSpreadsheet (arquivo.id, jwt)

async function GetDoc(){
    doc.loadInfo();
    return doc;
}


async function ReadWorkSheet() {
    await doc.loadInfo();
    const firstSheet = doc.sheetsByIndex[0];
    const rows = await firstSheet.getRows();
    
    const list = rows.map((e) => {e.toObject()});
    return list;
}

async function AddUser(data= {}){
    const response = await fetch("https://api-generator.retool.com/ddYO0f/Usuário", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
            body: JSON.stringify(data),
    });
    return response.json();
}

async function TrackData(){
    data = ReadWorkSheet();
    data.map(async(user) => { 
        let response = await AddUser(user)
        console.log(response);
    })
    return console.log("Dados copiados com sucesso.");
}