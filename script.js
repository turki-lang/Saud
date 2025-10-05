async function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;
  try {
    const res = await fetch('products.json');
    const products = await res.json();
    productList.innerHTML = "";
    if (products.length === 0) {
      productList.innerHTML = "<p>لا توجد منتجات حالياً.</p>";
      return;
    }
    products.forEach((p) => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price} ريال</p>
        <button onclick="orderWhatsApp('${p.name}', '${p.price}', '${p.whatsapp}')">اطلب الآن</button>
      `;
      productList.appendChild(item);
    });
  } catch (err) {
    console.error('خطأ في تحميل المنتجات:', err);
  }
}

function orderWhatsApp(name, price, number) {
  const msg = `مرحباً، أريد شراء ${name} بسعر ${price} ريال.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

// لوحة التحكم تبقى كما هي للنسخة المحلية فقط
function checkPassword() {
  const pw = document.getElementById("password").value;
  if (pw === "playshopksa") {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("admin-panel").classList.remove("hidden");
  }
}