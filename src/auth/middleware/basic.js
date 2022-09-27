'use strrict';

let basicHeaderParts = req.headers.authorization.split(' ');
let encodedString = basicHeaderParts.pop();
let decodedString = base64.decode(encodedString);
let [username, password] = decodedString.split(':');
