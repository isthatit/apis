
const router = require("express").Router();

let boardList = [
    {id: 1, title: '1 책 읽으실 분?', content: '1 책 읽으실 분 내용?', count: 10},
    {id: 2, title: '2 책 읽으실 분?', content: '2 책 읽으실 분 내용?', count: 20},
    {id: 3, title: '3 책 읽으실 분?', content: '3 책 읽으실 분 내용?', count: 30},
    {id: 4, title: '4 책 읽으실 분?', content: '4 책 읽으실 분 내용?', count: 40},
    {id: 5, title: '5 책 읽으실 분?', content: '5 책 읽으실 분 내용?', count: 50}
];
let _ids = 5;
const getIds = () => _ids+=1;

let returnValue = {
    result: '',
    detail: '',
    clean : () => {returnValue.result = ''; returnValue.detail = '';}
};

router.get('/', (req, res) => {
    returnValue.clean();
    returnValue.result = "success";
    returnValue.detail = boardList;
    res.json(returnValue);
});

/**
 * @returns {json} board 게시물 정보
 */
router.get('/:boardID', (req, res) => {
    const boardId = req.params.boardID;
    const board = boardList.filter(board=> board.id == boardId).pop();
    returnValue.clean();
    returnValue.result = "success";
    returnValue.detail = board;
    res.json(returnValue);
});

/**
 * 게시물을 등록한다.
 * @param {json} title 제목
 * @param {json} content 내용
 * @returns {json} returnValue 작업결과
 */
router.post('/', (req, res) => {
    returnValue.clean();
    
    const {title, content} = req.body;
    const addValue = {
        id : getIds(),
        title : title,
        content : content,
        count : (boardList.length + 1) * 10,
    }
    
    boardList.push(addValue);
    returnValue.result =  "success";
    returnValue.detail = addValue;
    res.json(returnValue);
});

/**
 * 게시물을 수정한다.
 * @param {json} id 아이디
 * @param {json} title 제목
 * @param {json} content 내용
 * @returns {json} returnValue 작업결과
 */
router.put('/', (req, res) => {
    const boardId = req.body.id;
    const {title, content} = req.body;

    boardList.filter(board => board.id == boardId).map(board => {
        
        board.title = title;
        board.content = content
        returnValue.clean();
        returnValue.result = "success";
        returnValue.detail = board;
    });
    res.json(returnValue);
});


router.delete('/:boardId', (req, res) => {
    const boardID = req.params.boardId;
    const board = boardList.filter(board => board.id == boardID).pop();

    const idx = boardList.findIndex(target => target == board);
    console.log(idx);

    returnValue.clean();
    if(idx > -1){
        boardList.splice(idx, 1);
        returnValue.result = "success";
    }else{
        returnValue.result = "fail";
        returnValue.detail = "does not match"
    }
    res.json(returnValue);
});

module.exports = router;