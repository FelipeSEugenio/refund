const expenses = document.querySelector("ul"); // Não tem id na <ul>, então mantém querySelector
const newExpense = document.getElementById("expense");
const typeNewExpense = document.getElementById("category");
const newExpenseAmount = document.getElementById("amount");
const form = document.querySelector("form"); // Não tem id no <form>, então mantém querySelector
const totalExpenses = document.getElementById("expenses-total");
let totalAmount = document.getElementById("total-amount");


// Formatação do Input Amount
newExpenseAmount.oninput = () => {
    // Takes what was typed and replaces it with nothing
    let value = newExpenseAmount.value.replace(/\D/g, "")

    // Turns into cents
    value = Number(value) / 100

    // Update the value
    newExpenseAmount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    // Returns this value to the block above
    return value
}

// Retrieving the values ​​from the form.
form.addEventListener("submit", (event) =>{
    event.preventDefault()

    const newExpenseItem = document.createElement("li")
    const expenseName = document.createElement("strong")
    const expenseType = document.createElement("span")
    const expenseInfo = document.createElement("div")
    const expenseIcon = document.createElement("img")
    const expenseAmount = document.createElement("span")
    const expenseAmountSmall = document.createElement("small")
    const expenseDelete = document.createElement("img")

    expenseDelete.src = "./img/remove.svg"

    // Adding image based on type
    switch(typeNewExpense.value){
        case "food": expenseIcon.src = "./img/food.svg"
            break
        case "accommodation": expenseIcon.src = "./img/accommodation.svg"
            break
        case "services": expenseIcon.src = "./img/transport.svg"
            break
        case "transport": expenseIcon.src = "./img/services.svg"
            break
        case "others": expenseIcon.src = "./img/others.svg"
            break
    }

    // Addition of Classes.
    newExpenseItem.classList.add("expense")
    expenseInfo.classList.add("expense-info")
    expenseAmount.classList.add("expense-amount")
    expenseDelete.classList.add("remove-icon")
    
    // Putting the elements together.
    // Adds the names inside the strong and span tags.
    expenseName.append(newExpense.value)
    expenseType.append(typeNewExpense.value)

    // Adds the value within the span that receives the price in reais.
    expenseAmount.append(newExpenseAmount.value)

    // Groups the name and type elements into a div.
    expenseInfo.append(expenseName, expenseType)

    // Gathers all the elements and inserts them into the list.
    newExpenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)
    expenses.prepend(newExpenseItem)

    // Cleaning the Inputs.
    newExpenseAmount.value = ""
    newExpense.value = ""
    typeNewExpense.value = ""

    // Updating the quantity of items in the list.
    totalExpenses.textContent = document.querySelectorAll('li').length + " Despesas"
})

// Deletes the item by clicking the remove icon.
expenses.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-icon")) {
        event.target.closest("li").remove();

        // Updating the quantity of items in the list.
        totalExpenses.textContent = document.querySelectorAll('li').length + " Despesas"
    }
});