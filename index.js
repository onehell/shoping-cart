let listOfGoods = document.getElementById("goodsList");
let allItems = document.querySelectorAll(".goodsItems");
let tableData = document.getElementById("tableData");
let inputValue = document.getElementById("inputValue");
let addNewGoods = document.getElementById("add");
let inputPrice = document.getElementById("inputPrice");
function table_sort() {
    const styleSheet = document.createElement('style')
    styleSheet.innerHTML = `
          .order-inactive span {
              visibility:hidden;
          }
          .order-inactive:hover span {
              visibility:visible;
          }
          .order-active span {
              visibility: visible;
          }
      `
    document.head.appendChild(styleSheet)
  
    document.querySelectorAll('th.order').forEach(th_elem => {
      let asc = true
      const span_elem = document.createElement('span')
      span_elem.style = "font-size:0.8rem; margin-left:0.5rem"
      span_elem.innerHTML = "▼"
      th_elem.appendChild(span_elem)
      th_elem.classList.add('order-inactive')
  
      const index = Array.from(th_elem.parentNode.children).indexOf(th_elem)
      th_elem.addEventListener('click', (e) => {
        document.querySelectorAll('th.order').forEach(elem => {
          elem.classList.remove('order-active')
          elem.classList.add('order-inactive')
        })
        th_elem.classList.remove('order-inactive')
        th_elem.classList.add('order-active')
  
        if (!asc) {
          th_elem.querySelector('span').innerHTML = '▲'
        } else {
          th_elem.querySelector('span').innerHTML = '▼'
        }
        const arr = Array.from(th_elem.closest("table").querySelectorAll('tbody tr'))
        arr.sort((a, b) => {
          const a_val = a.children[index].innerText
          const b_val = b.children[index].innerText
          return (asc) ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val)
        })
        arr.forEach(elem => {
          th_elem.closest("table").querySelector("tbody").appendChild(elem)
        })
        asc = !asc
      })
    })
  }
  
  table_sort()
function template({id, name, price, deleteGoods, addToCart}) {
    const listItem = document.createElement("li");
    listItem.classList.add("goodsItems");
    const goodsID = document.createElement("p");
    goodsID.classList.add("goodsId");
    goodsID.innerHTML = id;
    const goodsName = document.createElement("p");
    goodsName.classList.add("goodsName");
    goodsName.innerHTML = name;
    const goodsPrice = document.createElement("p");
    goodsPrice.classList.add("goodsPrice");
    goodsPrice.innerHTML = price;
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "delete";
    deleteButton.addEventListener("click",() => deleteGoods(id));
    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.innerHTML = "add to cart";
    addButton.addEventListener("click",() => addToCart(id, name, price));
    listItem.append(goodsID, goodsName, goodsPrice, deleteButton, addButton );
    listOfGoods.append(listItem);
}
function deleteAllCartValue(id) {
    let allCartGoods = document.querySelectorAll(".tableRow")
        allCartGoods.forEach((item) => {
            let cartId = +item.firstElementChild.innerHTML;
            if (cartId === id) {
                item.remove()
            }
        })
};
function deleteSingleCartValue(id) {
    let allCartGoods = document.querySelectorAll(".tableRow")
        allCartGoods.forEach((item) => {
            let cartId = +item.firstElementChild.innerHTML;
            let cartCountField = item.getElementsByClassName("goodsCount")[0];
            if (cartId === id) {
              if (+cartCountField.innerHTML === 1) {
                item.remove()
              } else {
                cartCountField.innerHTML = +cartCountField.innerHTML - 1;
              }
            }
        })
};
function templateCart(id, name, price) {
    const tableRow =  document.createElement("tr");
    tableRow.classList.add("tableRow");
    const goodsName = document.createElement("td");
    goodsName.innerHTML = name;
    const goodsPrice = document.createElement("td");
    goodsPrice.innerHTML = price;
    const buttonWrapper = document.createElement("td");
    const goodsID = document.createElement("td");
    goodsID.classList.add("goodsId");
    goodsID.innerHTML = id;
    const goodsCount = document.createElement("td");
    goodsCount.innerHTML = 1;
    goodsCount.classList.add("goodsCount")
    const totalPrice = document.createElement("td");
    totalPrice.innerHTML = "10000";
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "delete";
    deleteButton.classList.add("tdButton");
    deleteButton.addEventListener("click", () => deleteSingleCartValue(id));
    const deleteAllButton = document.createElement("button");
    deleteAllButton.addEventListener("click", () => deleteAllCartValue(id));
    deleteAllButton.classList.add("tdButton");
    deleteAllButton.innerHTML = "delete All";
    buttonWrapper.append(deleteButton, deleteAllButton);
    tableRow.append(goodsID, goodsName, goodsCount, totalPrice, goodsPrice, buttonWrapper)
    tableData.append(tableRow); 
}
function isGoodsExist(id, existGoods) {
    let result = false;
    existGoods.find((item) => {
        let cartId = +item.firstElementChild.innerHTML;
        if (cartId === id) {
           result = true;
        } else {
            result = false; 
        }
    })
    return result;
}
function templateCartValue(id, name, price) {
    let allCartGoods = [...document.querySelectorAll(".tableRow")];
    let totalGoods = document.querySelectorAll(".goodsItems")
    if (!isGoodsExist(id, allCartGoods) && totalGoods.length !== allCartGoods.length ) {
        templateCart(id, name, price)  
    } else { 
        let allCartGoods = document.querySelectorAll(".tableRow");
        let currentGoods;
        allCartGoods.forEach((item) => {
            let cartFieldId = +item.getElementsByClassName("goodsId")[0].innerHTML;
            let cartCountValue = +item.getElementsByClassName("goodsCount")[0].innerHTML;
            if (cartFieldId === id) {
                currentGoods = item;
                currentGoods.getElementsByClassName("goodsCount")[0].innerHTML= cartCountValue +1;
            }
        })
    }
   
};
class NewGoods {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    deleteGoods(id) {
        let allGoods = document.querySelectorAll(".goodsItems")
        allGoods.forEach((item) => {
            let cartId = +item.firstElementChild.innerHTML;
            if (cartId === id) {
                item.remove()
            }
        })
    };
    addToCart(id, name, price) {
        templateCartValue(id, name, price)
    }
}
 let samsung = new NewGoods(2, "galaxy", "1000$");
 template(samsung);
 function createNewGoods(name, price = 1000) {
    const id = Math.floor(Math.random() * 1000);
    const newGood = new NewGoods(id, name, price +"$");
    template(newGood);
 }
 addNewGoods.addEventListener("click", () => createNewGoods(inputValue.value,inputPrice.value));