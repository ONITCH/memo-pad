// リファレンス　
const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

//LSから呼び出し、LSの一つ一つのノートに対して、JASONからくるID、content
// insert ＋のボックスの前に表示させる
getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

// LSにセーブ　クリックしたら新しいノート５３行目を実行
addNoteButton.addEventListener("click", () => addNote());

// LSにJSONとして保存。初めて使うときはORを使って空っぽをデフォルトにする
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

// "stickynotes-notes"はKEY、vlaueがJSON以下。applicationで試せる。
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

// 新しいノートを作成。エレメントはHTMLのこと→createElementでtextareaを表示する。
function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    // classListは、要素のクラス属性のリストを取得して返すプロパティ。下３行はtextelementの中身を作っている
    element.classList.add("note");
    element.value = content;
    element.placeholder = "▶︎"
    // 中身を変えたときにアップデートされるようにする：IDとエレメント＝textarea、IDってなに？？？
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    // ダブルクリックした時のアクションconfirmはOK、キャンセル付きでアラートがなる。
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("▶︎　DELETE?");

        // もし本当に消すなら
        if (doDelete) {
            deleteNote(id, element);
        }

    });

    // returnで返すことでif文の前に戻れる。戻らなかったら削除されたまま。
    return element;
}

// HTMLとLSに保存する、IDを発行するためのmath random。NEW　NOTEの中身は空っぽに。　
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 10000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    //pushは配列（noteの後にnoteObject＝ランダムナンバー）を追加している
    notes.push(noteObject);
    saveNotes(notes);
}

// 編集してセーブする　addNoteと同じような処理
// フィルターメソッドは同じIDナンバーがつかないように。
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

// 削除する
function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);

}

// メモの色をランダム表示
function getRandomColor() {
    const get256 = () => { return Math.floor(Math.random() * 256); };    // 0 ~ 255を返す
    let [r, g, b] = [get256(), get256(), get256()];                 // ランダムでRGBカラーを設定
    let color = `rgb(${r}, ${g}, ${b})`;                            // 文字列生成 'rgb(XX, XXX, XXX)'
    return color;
}

// // element.idList.add("random-color");
// window.addEventListener("load", () => {
//     // クリックすると背景色が切り替わる
//     window.addEventListener("click", () => {
//         document.getElementsByTagName("textarea")[0].style.backgroundColor = getRandomColor();
//     })
// });





