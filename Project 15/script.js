const addItems = document.querySelector(".add-items");
const clearBtn = document.querySelector(".clear");
const markBtn = document.querySelector(".mark");
const itemsList = document.querySelector(".travel-items");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]");
  const textValue = text.value;
  const item = {
    textValue,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(travelItems = [], travelItemsList) {
  travelItemsList.innerHTML = travelItems
    .map((travelItem, i) => {
      return `
                <li>
                    <input type="checkbox" data-index=${i} id="item${i}" ${
        travelItem.done ? "checked" : ""
      } />
                    <label for="item${i}">${travelItem.textValue}</label>
                    <span data-index=${i}>🗑️</span>
                </li>
        `;
    })
    .join("");
}

function toggleDone(e) {
  if (e.target.matches("input")) {
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  } else if (e.target.matches("span")) {
    const index = e.target.dataset.index;
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, itemsList);
  }
}

function deleteAll() {
  localStorage.removeItem("items");
  items.splice(0, items.length);
  populateList(items, itemsList);
}

function markAll() {
  items.map((item) => {
    item.done = true;
  });
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

clearBtn.addEventListener("click", deleteAll);
markBtn.addEventListener("click", markAll);

populateList(items, itemsList);
