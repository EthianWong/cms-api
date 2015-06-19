/**
 * Created by fujunou on 2015/3/6.
 */
var cryptoConfig = require('../conf/crypto');
var crypto = require('crypto');

/*生成token*/
module.exports = {
    "enCipher":function(data){
        var string = JSON.stringify(data);
        var cipher = crypto.createCipher(cryptoConfig.algorithm, cryptoConfig.key);
        var crypted = cipher.update(string, cryptoConfig.cipherDecode, cryptoConfig.cipherEncode);
        crypted+=cipher.final(cryptoConfig.cipherEncode);
        return crypted;
    },
    "deCipher":function(enCipher){
        var decipher = crypto.createDecipher(cryptoConfig.algorithm, cryptoConfig.key);
        var deciphered = decipher.update(enCipher, cryptoConfig.cipherEncode, cryptoConfig.cipherDecode);
        deciphered += decipher.final(cryptoConfig.cipherDecode);
        return JSON.parse(deciphered);
    }
};