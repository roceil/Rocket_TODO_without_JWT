
const API_url = `https://fathomless-brushlands-42339.herokuapp.com/todo3`;

let newData = [];
let createObj = {
  content: ``,
  check: false,
  origin_id: 0,
};

axios
  .get(API_url)
  .then((res) => {
    newData = res.data;
    init();
  })
  .catch((res) => {
    console.log(res);
  });

// 函式 => 初始化渲染
function init() {
  let todoStr = ``;
  newData.forEach((item, index) => {
    if (index !== newData.length - 1) {
      todoStr += `<li class="py-4 border-b border-[#E5E5E5] flex items-center">
      <!-- noCheck -->
      <div
        data-status="noCheck"
        class="border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer"
      ></div>
      <!-- checked -->
      <button data-status="checked" class="hidden">
        <img class="" src="./assets/images/check 1.svg" alt="" />
      </button>
      
      <!-- 內容文字 -->
      <p class="ml-4">${item["content"]}</p>
      
      <!-- 刪除按鈕 -->
      <button origin_id="${item["origin_id"]}" value="deleteTodo" class="ml-auto mr-0">
        <img src="./assets/images/close (1) 1 (1).svg" alt="" />
      </button>
      </li>
      `;
    } else {
      todoStr += `<li class="py-4 border-b border-[#E5E5E5] flex items-center">
    <!-- noCheck -->
    <div
      data-status="noCheck"
      class="border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer"
    ></div>
    <!-- checked -->
    <button data-status="checked" class="hidden">
      <img class="" src="./assets/images/check 1.svg" alt="" />
    </button>
    
    <!-- 內容文字 -->
    <p class="ml-4">${item["content"]}</p>
    
    <!-- 刪除按鈕 -->
    <button origin_id="${item["id"]}" value="deleteTodo" class="ml-auto mr-0">
      <img src="./assets/images/close (1) 1 (1).svg" alt="" />
    </button>
    </li>
    
    <!-- ul_footer -->
    <li class="flex items-center justify-between py-[25px]">
      <p class="text-sm">${newData.length} 個待完成項目</p>
      <button class="text-sm text-[#9F9A91]">清除已完成項目</button>
    </li>
    `;
    }
  });
  todo_ul.innerHTML = todoStr;
}
// 函式 => 新增待辦資料
function API_Post(createObj) {
  axios.post(API_url, createObj);
}

// 函式 => 刪除待辦資料
function API_Delete(origin_id) {
  axios
    .delete(
      `https://fathomless-brushlands-42339.herokuapp.com/todo3/${origin_id}`
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 函式 => 刪除全部待辦資料
function API_DeleteAll() {
  for (let i = 1; i <= newData.length; i++) {
    axios
      .delete(`https://fathomless-brushlands-42339.herokuapp.com/todo3/${i}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// DOM => 抓整個todoList的form
const todoList = document.querySelector("#todoList");
// DOM => todoList的ul
const todo_ul = document.querySelector("#todo_ul");
// DOM => 抓取新增待辦的按鈕
const addTodo = document.querySelector("#addTodo");

// 監聽 => 整個todoList的form
todoList.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log(e.target.textContent);

  // 監聽是否點到「全部」
  if (e.target.textContent === "全部") {
    console.log("點到全部");
  }
  // 監聽是否點到「待完成」
  if (e.target.textContent === "待完成") {
    console.log("點到待完成");
  }
  // 監聽是否點到「已完成」
  if (e.target.textContent === "已完成") {
    console.log("點到已完成");
  }
  // 是否點到「清除已完成項目」
  if (e.target.textContent === "清除已完成項目") {
    console.log("點到清除已完成項目");
  }
  // 是否點到列表內的刪除鈕
  if (e.target.parentNode.value === "deleteTodo") {
    newData.forEach((item, index) => {
      const origin_id = e.target.parentNode.getAttribute("origin_id")
      if (Number(origin_id) === item['id']) {
        console.log(`有執行`);
        API_Delete(origin_id)
        newData.splice(index, 1);
        init();
      } else {
        console.log(`沒執行，按鈕的id是${e.target.parentNode.getAttribute("origin_id")}，而清單的id則是${item['id']}`);
      }
    });
  }
  // 是否點到列表內的checkbox
  if (e.target.getAttribute("data-status") === "noCheck") {
    console.log("點到noCheck");
    // todo => status為noCheck狀態時，最外層的li加上「active-text」的class
    console.log(e.target.parentNode);
  }
  // 是否點到列表內的checked勾勾
  if (e.target.parentNode.getAttribute("data-status") === "checked") {
    console.log("點到check的勾勾");
    // todo => status為checked狀態時，最外層的li加上「active-text」的class
    console.log(e.target.parentNode.parentNode);
  }
});
// 監聽 => 新增待辦的button
addTodo.addEventListener("click", (e) => {
  if (e.target.getAttribute("type") === "button") {
    createObj['content'] = innerText.value,
    createObj['origin_id']=1,
    innerText.value = ``;
    API_Post(createObj);
    newData.push(createObj);
    init();
  }
});
// 監聽 => 在新增待辦區塊按下「enter」
addTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    createObj['content'] = innerText.value,
    createObj['origin_id']=1,
    innerText.value = ``;
    API_Post(createObj);

    newData.push(createObj);
    console.log(createObj['origin_id']);
    init();
  }
});
