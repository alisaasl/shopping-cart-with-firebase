/* creating firebase*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://foodcart-fa696-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDb = ref(database, "shoppingList")
/*            */

const addBtn = document.getElementById("add-button");
const inputBtn = document.getElementById("input-field")
const list = document.getElementById("list")

addBtn.addEventListener("click", function () {
    let inputValue = inputBtn.value;
    clearInputField()

    push(shoppingListDb, inputValue);



})

onValue(shoppingListDb, function (snapshot) {

if(snapshot.exists()){
    let arr = Object.entries(snapshot.val())

    clearList()
    for (let i = 0; i < arr.length; i++) {
        let currentItem = arr[i]
        // let currentItemID = currentItem[0]
        // let currentItemValue = currentItem[1]



        appendListItem(currentItem)
    }
}
else{
    list.innerHTML = "No items here.."
}
    

})



function clearInputField() {
    inputBtn.value = ""
}
function clearList() {
    list.innerHTML = ""
}

function appendListItem(item) {
    // list.innerHTML += `<li>${item}</li>`

    let itemID = item[0]
    let itemValue = item[1]

    let newItem = document.createElement("li")

    newItem.textContent = itemValue

    newItem.addEventListener("dblclick", function(){
        let location = ref(database, `shoppingList/${itemID}`)

        remove(location)

    })

    list.append(newItem)


}
