export default (invoiceData, customerData, user) => {
  const subTotal = invoiceData.items.reduce((acc, curr) => {
    return acc + curr.cost * curr.quantity;
  }, 0);

  console.log(invoiceData);

  const discount = (invoiceData.discount / 100) * subTotal;

  const tax = (invoiceData.tax / 100) * subTotal;

  const total = subTotal - discount + tax;

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="text-xs">
      <header class="bg-sky-900 text-white px-20 py-10">
        <div class="content">
          <h1 class="text-2xl font-bold">Tax Invoice</h1>
          <h2 class="text-xl mb-3">${user.name}</h2>

          <p>Invoice number: #00${invoiceData.invoiceNo}</p>
          <p>Invoice Date: ${invoiceData.date}</p>
          <p>Email: ${user.email}</p>
          <p>GSTIN: ${user.GSTIN}</p>
        </div>
      </header>
      <main class="px-20 py-10">
        <div class="flex justify-between">
          <div class="mb-6">
            <h1 class="text-xl mb-3">Invoice to:</h1>
            <p>Customer Name: ${customerData.name}</p>
            <p>Phone: ${customerData.phone}</p>
            <p>Email: ${customerData.email}</p>
          </div>
          <div class="">
            <h1 class="text-xl mb-3">Payment details</h1>
            <p>Account no: ${user.accountNumber}</p>
            <p>Account Name: ${user.accountName} </p>
            <p>Branch Name: ${user.branchName} </p>
          </div>
        </div>

        <h2 class="font-bold mb-4">Your items</h2>

        <header class="flex grow bg-sky-800 text-white p-2">
          <p class="basis-1/4">Name</p>
          <p class="basis-1/4">Price</p>
          <p class="basis-1/4">Quantity</p>
          <p class="basis-1/4">Total</p>
        </header>

        ${invoiceData.items
          .map((item) => {
            return `
            <div class="flex grow p-2 border-b-2">
              <p class="basis-1/4">${item.name}</p>
              <p class="basis-1/4">${item.cost}</p>
              <p class="basis-1/4">${item.quantity}</p>
              <p class="basis-1/4">${item.quantity * item.cost}</p>
            </div>`;
          })
          .join("")}
  
        <div class="flex justify-between mt-9">
          <div class="basis-3/4">
            <h1 class="text-xl">Terms and conditions</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
              quibusdam a. Sequi, aspernatur. Rerum quas deleniti facere? Quod
              perspiciatis ut commodi voluptate nesciunt. Nostrum, nam alias
              laborum eaque tempora odio.
            </p>
          </div>
          <div class="flex flex-col grow items-end">
            <p>Subtotal: $${subTotal.toFixed(2)}</p>
            <p>Discount: $${discount.toFixed(2)}</p>
            <p>Tax: $${tax.toFixed(2)}</p>
            <p class="font-bold">Total: $${total.toFixed(2)}</p>
          </div>
        </div>
      </main>
    </body>
  </html>
  
    `;
};
