"use strict";

var API_url = "https://fathomless-brushlands-42339.herokuapp.com/todo3";
var newData = [];
axios.get(API_url).then(function (res) {
  newData = res.data;
  init();
  checkBoxSwitch();
})["catch"](function (res) {
  console.log(res);
}); // 函式 => 初始化渲染

function init() {
  var todoStr = "";
  newData.forEach(function (item, index) {
    if (index !== newData.length - 1) {
      todoStr += "<li class=\"py-4 border-b border-[#E5E5E5] flex items-center\">\n      <div class=\"checkbox_item w-5 h-5  bg-slate-500\">\n      <!-- noCheck -->\n      <div\n        data-status=\"noCheck\"\n        class=\" border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer\"\n      ></div>\n      <!-- checked -->\n      <button data-status=\"checked\" class=\"select-none hidden\">\n        <img class=\"select-none\" src=\"./assets/images/check 1.svg\" alt=\"\" />\n      </button>\n    </div>\n      \n      <!-- \u5167\u5BB9\u6587\u5B57 -->\n      <p class=\"ml-4\">".concat(item["content"], "</p>\n      \n      <!-- \u522A\u9664\u6309\u9215 -->\n      <button origin_id=\"").concat(item["id"], "\" value=\"deleteTodo\" class=\"ml-auto mr-0\">\n        <img src=\"./assets/images/close (1) 1 (1).svg\" alt=\"\" />\n      </button>\n      </li>\n      ");
    } else {
      todoStr += "<li class=\"py-4 border-b border-[#E5E5E5] flex items-center\">\n    <!-- noCheck -->\n    <div\n      data-status=\"noCheck\"\n      class=\"noCheck border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer\"\n    ></div>\n    <!-- checked -->\n    <button data-status=\"checked\" class=\"checked hidden\">\n      <img class=\"\" src=\"./assets/images/check 1.svg\" alt=\"\" />\n    </button>\n    \n    <!-- \u5167\u5BB9\u6587\u5B57 -->\n    <p class=\"ml-4\">".concat(item["content"], "</p>\n    \n    <!-- \u522A\u9664\u6309\u9215 -->\n    <button origin_id=\"").concat(item["id"], "\" value=\"deleteTodo\" class=\"ml-auto mr-0\">\n      <img src=\"./assets/images/close (1) 1 (1).svg\" alt=\"\" />\n    </button>\n    </li>\n    \n    <!-- ul_footer -->\n    <li class=\"flex items-center justify-between py-[25px]\">\n      <p class=\"text-sm\">").concat(newData.length, " \u500B\u5F85\u5B8C\u6210\u9805\u76EE</p>\n      <button class=\"text-sm text-[#9F9A91]\">\u6E05\u9664\u5DF2\u5B8C\u6210\u9805\u76EE</button>\n    </li>\n    ");
    }
  });
  todo_ul.innerHTML = todoStr;
} // 函式 => 篩選後渲染


function filterRender(filterData) {
  var todoStr = "";
  filterData.forEach(function (item, index) {
    if (index !== filterData.length - 1) {
      todoStr += "<li class=\"py-4 border-b border-[#E5E5E5] flex items-center\">\n      <!-- noCheck -->\n      <div\n        data-status=\"noCheck\"\n        class=\"border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer\"\n      ></div>\n      <!-- checked -->\n      <button data-status=\"checked\" class=\"hidden\">\n        <img class=\"\" src=\"./assets/images/check 1.svg\" alt=\"\" />\n      </button>\n      \n      <!-- \u5167\u5BB9\u6587\u5B57 -->\n      <p class=\"ml-4\">".concat(item["content"], "</p>\n      \n      <!-- \u522A\u9664\u6309\u9215 -->\n      <button origin_id=\"").concat(item["id"], "\" value=\"deleteTodo\" class=\"ml-auto mr-0\">\n        <img src=\"./assets/images/close (1) 1 (1).svg\" alt=\"\" />\n      </button>\n      </li>\n      ");
    } else {
      todoStr += "<li class=\"py-4 border-b border-[#E5E5E5] flex items-center\">\n    <!-- noCheck -->\n    <div\n      data-status=\"noCheck\"\n      class=\"border border-[#9F9A91] rounded-[5px] w-5 h-5 cursor-pointer\"\n    ></div>\n    <!-- checked -->\n    <button data-status=\"checked\" class=\"hidden\">\n      <img class=\"\" src=\"./assets/images/check 1.svg\" alt=\"\" />\n    </button>\n    \n    <!-- \u5167\u5BB9\u6587\u5B57 -->\n    <p class=\"ml-4\">".concat(item["content"], "</p>\n    \n    <!-- \u522A\u9664\u6309\u9215 -->\n    <button origin_id=\"").concat(item["id"], "\" value=\"deleteTodo\" class=\"ml-auto mr-0\">\n      <img src=\"./assets/images/close (1) 1 (1).svg\" alt=\"\" />\n    </button>\n    </li>\n    \n    <!-- ul_footer -->\n    <li class=\"flex items-center justify-between py-[25px]\">\n      <p class=\"text-sm\">").concat(newData.length, " \u500B\u5F85\u5B8C\u6210\u9805\u76EE</p>\n      <button class=\"text-sm text-[#9F9A91]\">\u6E05\u9664\u5DF2\u5B8C\u6210\u9805\u76EE</button>\n    </li>\n    ");
    }
  });
  todo_ul.innerHTML = todoStr;
} // 函式 => 新增待辦資料


function API_Post(createObj) {
  axios.post(API_url, createObj).then(function (res) {
    axios.get(API_url).then(function (res) {
      newData = res.data;
      init();
    })["catch"](function (res) {
      console.log(res);
    });
  });
} // 函式 => 刪除待辦資料


function API_Delete(origin_id) {
  axios["delete"]("https://fathomless-brushlands-42339.herokuapp.com/todo3/".concat(origin_id)).then(function (res) {
    console.log(res.data);
  })["catch"](function (err) {
    console.log(err);
  });
} // 函式 => 刪除全部待辦資料


function API_DeleteAll() {
  for (var i = 1; i <= newData.length; i++) {
    axios["delete"]("https://fathomless-brushlands-42339.herokuapp.com/todo3/".concat(i)).then(function (res) {
      console.log(res.data);
    })["catch"](function (err) {
      console.log(err);
    });
  }
} // 函式 => checkbox切換


function checkBoxSwitch() {
  $('.checkbox_item').click(function (e) {
    e.preventDefault();
    $(this).find('div').toggleClass('hidden');
    $(this).find('button').toggleClass('hidden');
    $(this.parentNode).toggleClass('active-text');
  });
} // DOM => 抓整個todoList的form


var todoList = document.querySelector("#todoList"); // DOM => todoList的ul

var todo_ul = document.querySelector("#todo_ul"); // DOM => 抓取新增待辦的按鈕

var addTodo = document.querySelector("#addTodo"); // DOM => 抓取checkbox的按鈕

var checkbox_item = document.querySelector(".checkbox_item"); // 監聽 => 整個todoList的form

todoList.addEventListener("click", function (e) {
  e.preventDefault(); // 監聽是否點到「全部」

  if (e.target.textContent === "全部") {
    console.log("點到全部");
    $(allList).addClass("active-border");
    $(hasToDoList).removeClass("active-border");
    $(finishList).removeClass("active-border");
    init();
  } // 監聽是否點到「待完成」


  if (e.target.textContent === "待完成") {
    console.log("點到待完成");
    console.log(e.target);
    $(hasToDoList).addClass("active-border");
    $(allList).removeClass("active-border");
    $(finishList).removeClass("active-border");
    var filterData = newData.filter(function (item) {
      if (item["check"] === false) {
        return item;
      }
    });
    filterRender(filterData);
  } // 監聽是否點到「已完成」


  if (e.target.textContent === "已完成") {
    console.log("點到已完成");
    console.log(e.target);
    $(hasToDoList).removeClass("active-border");
    $(allList).removeClass("active-border");
    $(finishList).addClass("active-border");

    var _filterData = newData.filter(function (item) {
      console.log(item);

      if (item["check"] === "true") {
        return item;
      }
    });

    filterRender(_filterData);
  } // 是否點到「清除已完成項目」


  if (e.target.textContent === "清除已完成項目") {
    console.log("點到清除已完成項目");
  } // 是否點到列表內的刪除鈕


  if (e.target.parentNode.value === "deleteTodo") {
    newData.forEach(function (item, index) {
      var origin_id = e.target.parentNode.getAttribute("origin_id");

      if (Number(origin_id) === item["id"]) {
        console.log("\u6709\u57F7\u884C");
        API_Delete(origin_id);
        newData.splice(index, 1);
        init();
      } else {
        console.log("\u6C92\u57F7\u884C\uFF0C\u6309\u9215\u7684id\u662F".concat(e.target.parentNode.getAttribute("origin_id"), "\uFF0C\u800C\u6E05\u55AE\u7684id\u5247\u662F").concat(item["id"]));
      }
    });
  }
}); // 監聽 => 新增待辦的button

addTodo.addEventListener("click", function (e) {
  console.log(innerText.value);

  if (e.target.getAttribute("type") === "button") {
    if (innerText.value === "") {
      alert("請輸入待辦事項");
      return;
    }

    var createObj = {
      content: innerText.value,
      check: false // origin_id: 0,

    }; // createObj['content'] = ,
    // createObj['origin_id']=1,

    innerText.value = "";
    API_Post(createObj); // newData.push(createObj);

    init();
  }
}); // 監聽 => 在新增待辦區塊按下「enter」

addTodo.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    if (e.target.value === "") {
      alert("請輸入待辦事項");
      return;
    }

    var createObj = {
      content: innerText.value,
      check: false // origin_id: 0,

    }; // createObj['content'] = innerText.value,
    // createObj['origin_id'] = 1,

    innerText.value = "";
    API_Post(createObj); // newData.push(createObj);

    init();
  }
});
//# sourceMappingURL=all.js.map
