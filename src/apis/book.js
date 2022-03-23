const router = require("express").Router();
const propertyReader = require("properties-reader");
console.log(__dirname);
const props = propertyReader("./src/props.property");


router.get('/:bookId?', (req, res) => {

    const request = require('request');
    const search = req.params.bookId | '';
    const _Encod = "UTF-8";
    const client_secret = props.get("client_secret");
    const client_id =props.get("client_id");

    let api_url = 'https://openapi.naver.com/v1/search/book?query=' + encodeURI(search); // json 결과
    let options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const result = JSON.parse(body);
            res.json(result);
        } else {
            res.json(error);
            console.log('error = ' + response.statusCode);

        }
    });
});

module.exports = router;