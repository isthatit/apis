
const router = require("express").Router();

let result = [
    {id: 1, title: '1 책 읽으실 분?', content: '1 책 읽으실 분 내용?', count: 10},
    {id: 2, title: '2 책 읽으실 분?', content: '2 책 읽으실 분 내용?', count: 20},
    {id: 3, title: '3 책 읽으실 분?', content: '3 책 읽으실 분 내용?', count: 30},
    {id: 4, title: '4 책 읽으실 분?', content: '4 책 읽으실 분 내용?', count: 40},
    {id: 5, title: '5 책 읽으실 분?', content: '5 책 읽으실 분 내용?', count: 50}
];

router.get('/', (req, res) => {
    res.json(result);
});


router.get('/:boardID', (req, res) => {
    const boardID = req.params.boardID;
    const board = result.filter(board=> board.id == boardID);
    res.json({board});
});

/**
 * 게시물을 등록한다.
 * @param {json} title 제목
 * @param {json} content 내용
 */
router.post('/', (req, res) => {
    console.log(req.body)
    const addValue = {
        id : result.length + 1,
        title : req.body.title,
        content : req.body.content,
        count : (result.length + 1) * 10,
    }
    console.log(addValue);

    result.push(addValue);

    res.json(result);
});

router.put('/', (req, res) => {
    const boardId = req.body.id;
    const title = req.body.title;
    const content = req.body.content;

    result.filter(board => board.id == boardId).map(board => {
        
        board.title = title;
        board.content = content
    });

    console.log(result);

    res.json(result);
});


router.delete('/:boardId', (req, res) => {
    const boardID = req.params.boardId;
    const board = result.filter(board => board.id == boardID).pop();

    const idx = result.findIndex(target => target == board);

    if(idx > -1){
        result.splice(idx, 1);
    }

    res.json(result)
});

module.exports = router;