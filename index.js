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


async function GetDoc(){
    const doc =  new GoogleSpreadsheet (arquivo.id, jwt)
    doc.loadInfo();
    return doc;
}

GetDoc();