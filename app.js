const form = document.getElementById('my-form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const tableBody = document.querySelector('table#my-table tbody');
let data = [];
// localStorage.clear();
// Get data from local storage and display it in the table
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('user ')) {
        const userData = JSON.parse(localStorage.getItem(key));
        data.push(userData);
        displayUserData(userData);
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const userData = {expenseAmount: amountInput.value, description: descriptionInput.value, category: categoryInput.value};
    data.push(userData);
    displayUserData(userData);
    localStorage.setItem(`user ${localStorage.length + 1}`, JSON.stringify(userData));
    form.reset();
});

function displayUserData(userData) {
    const row = document.createElement('tr');
    for (const property in userData)
    {
        const cell = document.createElement('td');
        cell.textContent = userData[property];
        row.appendChild(cell);
    }
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('span');
    const editCell = document.createElement('td');
    const editButton = document.createElement('span');

    deleteButton.id = 'delete-button';
    editButton.id = 'edit-button';
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';



    deleteButton.addEventListener('click', function() {
        const rowIndex = Array.from(tableBody.children).indexOf(row);
        data.splice(rowIndex, 1);
        localStorage.removeItem(`user ${rowIndex + 1}`);
        tableBody.removeChild(row);
    });


    editButton.addEventListener('click', function() {
        // Repopulate form fields with user data
        amountInput.value = userData.expenseAmount;
        descriptionInput.value = userData.description;
        categoryInput.value = userData.category;

        // Remove user data from the array and localStorage
        const rowIndex = Array.from(tableBody.children).indexOf(row);
        data.splice(rowIndex, 1);
        localStorage.removeItem(`user ${rowIndex + 1}`);

        // Remove row from the table
        tableBody.removeChild(row);
    });




    deleteCell.appendChild(deleteButton);
    // deleteCell.appendChild(editButton);
    editCell.appendChild(editButton);
    row.appendChild(deleteCell);
    row.appendChild(editCell);
    // row.appendChild(editCell);
    tableBody.appendChild(row);
}
