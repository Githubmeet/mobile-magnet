// In-memory data storage for shipping details and bill summary
let shippingDetails = [];
let billSummary = {
    subtotal: 0,
    taxRate: 0.1, // 10% tax rate
    shipping: 50, // Example shipping charge
    total: 0
};

// Function to display shipping details
function displayShippingDetails() {
    const shippingTable = document.createElement('table');
    shippingTable.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    headRow.appendChild(nameHeader);

    const addressHeader = document.createElement('th');
    addressHeader.textContent = 'Address';
    headRow.appendChild(addressHeader);

    const cityHeader = document.createElement('th');
    cityHeader.textContent = 'City';
    headRow.appendChild(cityHeader);

    const stateHeader = document.createElement('th');
    stateHeader.textContent = 'State';
    headRow.appendChild(stateHeader);

    const pinCodeHeader = document.createElement('th');
    pinCodeHeader.textContent = 'Pin Code';
    headRow.appendChild(pinCodeHeader);

    const phoneHeader = document.createElement('th');
    phoneHeader.textContent = 'Phone';
    headRow.appendChild(phoneHeader);

    thead.appendChild(headRow);
    shippingTable.appendChild(thead);

    const tbody = document.createElement('tbody');

    for (let i = 0; i < shippingDetails.length; i++) {
        const detail = shippingDetails[i];
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = detail.fullName;
        row.appendChild(nameCell);

        const addressCell = document.createElement('td');
        addressCell.textContent = detail.address;
        row.appendChild(addressCell);

        const cityCell = document.createElement('td');
        cityCell.textContent = detail.city;
        row.appendChild(cityCell);

        const stateCell = document.createElement('td');
        stateCell.textContent = detail.state;
        row.appendChild(stateCell);

        const pinCodeCell = document.createElement('td');
        pinCodeCell.textContent = detail.zipCode;
        row.appendChild(pinCodeCell);

        const phoneCell = document.createElement('td');
        phoneCell.textContent = detail.phone;
        row.appendChild(phoneCell);

        tbody.appendChild(row);
    }

    shippingTable.appendChild(tbody);

    const adminPanel = document.createElement('div');
    adminPanel.classList.add('admin-panel');

    const shippingDetailsContainer = document.createElement('div');
    shippingDetailsContainer.classList.add('shipping-details-container');

    const shippingDetailsHeading = document.createElement('h2');
    shippingDetailsHeading.textContent = 'Shipping Details';
    shippingDetailsContainer.appendChild(shippingDetailsHeading);
    shippingDetailsContainer.appendChild(shippingTable);

    adminPanel.appendChild(shippingDetailsContainer);

    const billSummaryContainer = document.createElement('div');
    billSummaryContainer.classList.add('bill-summary-container');

    const billSummaryHeading = document.createElement('h2');
    billSummaryHeading.textContent = 'Bill Summary';
    billSummaryContainer.appendChild(billSummaryHeading);

    const billSummaryTable = document.createElement('table');
    billSummaryTable.classList.add('table', 'table-striped');

    const billSummaryRow = document.createElement('tr');

    const subtotalCell = document.createElement('td');
    subtotalCell.textContent = `Subtotal: ₹${billSummary.subtotal.toFixed(2)}`;
    billSummaryRow.appendChild(subtotalCell);

    const taxCell = document.createElement('td');
    taxCell.textContent = `Tax: ₹${billSummary.tax.toFixed(2)}`;
    billSummaryRow.appendChild(taxCell);

    const shippingCell = document.createElement('td');
    shippingCell.textContent = `Shipping: ₹${billSummary.shipping.toFixed(2)}`;
    billSummaryRow.appendChild(shippingCell);

    const totalCell = document.createElement('td');
    totalCell.textContent = `Total: ₹${billSummary.total.toFixed(2)}`;
    billSummaryRow.appendChild(totalCell);

    billSummaryTable.appendChild(billSummaryRow);
    billSadminPanel.appendChild(billSummaryContainer);

    document.body.appendChild(adminPanel);
    }
    // Function to display bill summary
    function displayBillSummary(billSummary) {
    const billSummaryTable = document.getElementById('billSummaryTable');
    billSummaryTable.innerHTML = '';
    const row = document.createElement('tr');

const subtotalCell = document.createElement('td');
subtotalCell.textContent = `₹${billSummary.subtotal.toFixed(2)}`;
row.appendChild(subtotalCell);

const taxCell = document.createElement('td');
taxCell.textContent = `₹${billSummary.tax.toFixed(2)}`;
row.appendChild(taxCell);

const shippingCell = document.createElement('td');
shippingCell.textContent = `₹${billSummary.shipping.toFixed(2)}`;
row.appendChild(shippingCell);

const totalCell = document.createElement('td');
totalCell.textContent = `₹${billSummary.total.toFixed(2)}`;
row.appendChild(totalCell);

billSummaryTable.appendChild(row);
}
// Function to calculate bill summary
function calculateBillSummary() {
const cartTotal = shippingDetails.reduce((total, detail) => total + detail.subtotal, 0);
billSummary.subtotal = cartTotal;
billSummary.tax = billSummary.subtotal * billSummary.taxRate;
billSummary.total = billSummary.subtotal + billSummary.tax + billSummary.shipping;
displayBillSummary(billSummary);
}
// Handle form submission
document.getElementById('shippingForm').addEventListener('submit', function (e) {
e.preventDefault(); // Prevent the default form submission
const shippingData = {
    fullName: document.getElementById('fullName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    zipCode: document.getElementById('zipCode').value,
    phone: document.getElementById('phone').value,
    subtotal: parseFloat(document.getElementById('subtotal').value)
};

shippingDetails.push(shippingData);
calculateBillSummary();
displayShippingDetails();
this.reset(); // Reset the form after submission
});
// Initial display of the admin panel
displayShippingDetails();
