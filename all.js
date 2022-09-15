let data = [];
// {
// routine:""
// checked : "false"
//}

//新增待辦事項
const addTxt = document.querySelector(".addTxt");
const addBtn = document.querySelector(".addTodo");
addBtn.addEventListener("click",addTodos);
function addTodos(e){
    // 取消預設事件 不然每次刪除會跑到連結 # 然後網頁跳到最上面去
    e.preventDefault(); 
    //防止未填入
    if(addTxt.value.trim() ==""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill in the blank!',
          })
    return;
    };
    let addRoutine = {};
    addRoutine.routine = addTxt.value;
    addRoutine.checked = "";
    data.push(addRoutine);
    addTxt.value = ""; //填寫完後清除值
    renderList();
};

//新增鍵盤enter可輸入
addTxt.addEventListener("keyup",(e)=>{
    if(e.key ==="Enter"){
        addTodos(e);
    }
})

const list = document.querySelector(".list");
const unfishedNum = document.querySelector(".unfinished")

//初始畫面的渲染
function renderList(todo){
    let newTodos = "";
    let count = 0;
    data.forEach((item,index)=>{
    newTodos += `
    <li>
        <div class="dailyWork">
            <input type="checkbox" id="${index}" ${item.checked} >
            <label for="${index}" data-id="${index}"> ${item.routine}</label>
        </div>
        <a href="#">
         <i class="far fa-trash-alt delete" data-delete = "garbageCan" data-num="${index}"></i>
        </a>
    </li>`
    if(item.checked ===""){
        count+=1;
    }
    })
    list.innerHTML = newTodos;
    unfishedNum.textContent = `${count} undone list`
}

//換畫面
function newRenderList(showData){
    let changeTodos = "";
    showData.forEach((item,index)=>{
        changeTodos += `
    <li>
        <div class="dailyWork">
            <input type="checkbox" id="${index}" ${item.checked} >
            <label for="${index}" data-id="${index}">${item.routine}</label>
        </div>
        <a href="#">
         <i class="far fa-trash-alt delete" data-delete = "garbageCan" data-num="${index}"></i>
        </a>
    </li>`
    });
    list.innerHTML = changeTodos;
};

   
//刪除某筆事項
list.addEventListener("click",(e)=>{
    //取得自訂屬性
    let num = e.target.getAttribute("data-num");
    let id = e.target.getAttribute("data-id");
    let routineId = e.target.getAttribute("id");
    //確保按到垃圾桶
    if(e.target.getAttribute("data-delete") == "garbageCan"){
        e.preventDefault()
        data.splice(num,1);
        //data-num為自訂屬性 藉由forEach的索引值來刪除特定筆數的資料
    }else{
        data.forEach((item,index)=>{
          if(id == index || routineId == index){
            if(item.checked === "checked"){
                item.checked = "";
            }else{
                item.checked = "checked"
            }
          }
        })
    };
    renderList();
});



//頁面切換
const tabMenu = document.querySelector(".menu");
tabMenu.addEventListener("click",(e)=>{
    e.preventDefault()
    let toggleStatus = e.target.getAttribute("data-tab");
    let showData = [];
    if(toggleStatus ==="all"){
        renderList();
    }else if(toggleStatus ==="undone"){
        showData = data.filter((item)=> item.checked ==="");
        newRenderList(showData);
    }else if(toggleStatus ==="done"){
        showData = data.filter((item)=> item.checked ==="checked");
        newRenderList(showData);
    }
    
});


//delete all done list
const deleteAllDone = document.querySelector(".finished");
deleteAllDone.addEventListener("click",(e)=>{
    e.preventDefault();
    let deleteData = [];//組只有未完成的資料
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          data.forEach((item) => {
            if (!item.checked) {
          deleteData.push(item);
          }
         });
          data = deleteData; //將未勾選checked的資料傳到外面的data
          renderList(); //用新組成的data重新進行畫面渲染
       }
      })
});
