const API_url = `https://fathomless-brushlands-42339.herokuapp.com/todo3`;

let newData = [];

axios
  .get(API_url)
  .then((res) => {
    newData = res.data;
    init();
    checkBoxSwitch()

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
      <div class="checkbox_item w-5 h-5  bg-slate-500">
      <!-- noCheck -->
      <div
        data-status="noCheck"
        class=" border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer"
      ></div>
      <!-- checked -->
      <button data-status="checked" class="select-none hidden">
        <img class="select-none" src="./assets/images/check 1.svg" alt="" />
      </button>
    </div>
      
      <!-- 內容文字 -->
      <p class="ml-4">${item["content"]}</p>
      
      <!-- 刪除按鈕 -->
      <button origin_id="${item["id"]}" value="deleteTodo" class="ml-auto mr-0">
        <img src="./assets/images/close (1) 1 (1).svg" alt="" />
      </button>
      </li>
      `;
    } else {
      todoStr += `<li class="py-4 border-b border-[#E5E5E5] flex items-center">
    <!-- noCheck -->
    <div
      data-status="noCheck"
      class="noCheck border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer"
    ></div>
    <!-- checked -->
    <button data-status="checked" class="checked hidden">
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
// 函式 => 篩選後渲染
function filterRender(filterData) {
  let todoStr = ``;
  filterData.forEach((item, index) => {
    if (index !== filterData.length - 1) {
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
  axios.post(API_url, createObj).then((res) => {
    axios
      .get(API_url)
      .then((res) => {
        newData = res.data;
        init();
      })
      .catch((res) => {
        console.log(res);
      });
  });
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
// 函式 => checkbox切換
function checkBoxSwitch() {
  $('.checkbox_item').click(function(e){
    e.preventDefault()
    $(this).find('div').toggleClass('hidden');
    $(this).find('button').toggleClass('hidden');
    $(this.parentNode).toggleClass('active-text')
  });
}

// DOM => 抓整個todoList的form
const todoList = document.querySelector("#todoList");
// DOM => todoList的ul
const todo_ul = document.querySelector("#todo_ul");
// DOM => 抓取新增待辦的按鈕
const addTodo = document.querySelector("#addTodo");
// DOM => 抓取checkbox的按鈕
const checkbox_item = document.querySelector(".checkbox_item");

// 監聽 => 整個todoList的form
todoList.addEventListener("click", (e) => {
  e.preventDefault();

  // 監聽是否點到「全部」
  if (e.target.textContent === "全部") {
    console.log("點到全部");
    $(allList).addClass("active-border");
    $(hasToDoList).removeClass("active-border");
    $(finishList).removeClass("active-border");
    init();
  }
  // 監聽是否點到「待完成」
  if (e.target.textContent === "待完成") {
    console.log("點到待完成");
    console.log(e.target);
    $(hasToDoList).addClass("active-border");
    $(allList).removeClass("active-border");
    $(finishList).removeClass("active-border");

    const filterData = newData.filter((item) => {
      if (item["check"] === false) {
        return item;
      }
    });
    filterRender(filterData);
  }
  // 監聽是否點到「已完成」
  if (e.target.textContent === "已完成") {
    console.log("點到已完成");
    console.log(e.target);
    $(hasToDoList).removeClass("active-border");
    $(allList).removeClass("active-border");
    $(finishList).addClass("active-border");

    const filterData = newData.filter((item) => {
      console.log(item);
      if (item["check"] === "true") {
        return item;
      }
    });
    filterRender(filterData);
  }
  // 是否點到「清除已完成項目」
  if (e.target.textContent === "清除已完成項目") {
    console.log("點到清除已完成項目");
  }
  // 是否點到列表內的刪除鈕
  if (e.target.parentNode.value === "deleteTodo") {
    newData.forEach((item, index) => {
      const origin_id = e.target.parentNode.getAttribute("origin_id");
      if (Number(origin_id) === item["id"]) {
        console.log(`有執行`);
        API_Delete(origin_id);
        newData.splice(index, 1);
        init();
      } else {
        console.log(
          `沒執行，按鈕的id是${e.target.parentNode.getAttribute(
            "origin_id"
          )}，而清單的id則是${item["id"]}`
        );
      }
    });
  }
});
// 監聽 => 新增待辦的button
addTodo.addEventListener("click", (e) => {
  console.log(innerText.value);

  if (e.target.getAttribute("type") === "button") {
    if (innerText.value === ``) {
      alert("請輸入待辦事項");
      return;
    }
    let createObj = {
      content: innerText.value,
      check: false,
      // origin_id: 0,
    };
    // createObj['content'] = ,
    // createObj['origin_id']=1,
    innerText.value = ``;
    API_Post(createObj);
    // newData.push(createObj);
    init();
  }
});
// 監聽 => 在新增待辦區塊按下「enter」
addTodo.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    if (e.target.value === ``) {
      alert("請輸入待辦事項");
      return;
    }
    let createObj = {
      content: innerText.value,
      check: false,
      // origin_id: 0,
    };
    // createObj['content'] = innerText.value,
    // createObj['origin_id'] = 1,
    innerText.value = ``;
    API_Post(createObj);

    // newData.push(createObj);

    init();
  }
});
