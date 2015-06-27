(function(){

    var CryptoConfig = require('../private/crypto');
    var Crypto = require('crypto');

    module.exports = {
        "enCipher":function(data){
            var string = JSON.stringify(data);
            var cipher = Crypto.createCipher(CryptoConfig.algorithm, CryptoConfig.key);
            var crypted = cipher.update(string, CryptoConfig.cipherDecode, CryptoConfig.cipherEncode);
            crypted+=cipher.final(CryptoConfig.cipherEncode);
            return crypted;
        },
        "deCipher":function(enCipher){
            var decipher = Crypto.createDecipher(CryptoConfig.algorithm, CryptoConfig.key);
            var deciphered = decipher.update(enCipher, CryptoConfig.cipherEncode, CryptoConfig.cipherDecode);
            deciphered += decipher.final(CryptoConfig.cipherDecode);
            return JSON.parse(deciphered);
        }
    };

}).call(this);