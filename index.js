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
    const firstSheet = doc.sheetsByIndex[0];
    const rows = await firstSheet.getRows();
    rows.toObject();
    return rows;
    
}

ReadWorkSheet();