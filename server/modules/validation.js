function validateUserInput(user, isIdRequired = false) {
    if (!user || typeof user !== "object") return false;

    const requiredFields = ["name", "email", "city", "street", "houseNumber", "username", "phone1"];
    if (isIdRequired) {
        requiredFields.push("id");
    }

    for (const field of requiredFields) {
        if (!(field in user)) return false;
    }

    if (typeof user.name !== "string" || user.name.trim() === "") return false;
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(user.email)) return false;
    if (typeof user.city !== "string" || user.city.trim() === "") return false;
    if (typeof user.street !== "string" || user.street.trim() === "") return false;
    if (typeof user.houseNumber !== "string" || user.houseNumber.trim() === "") return false;
    if (typeof user.username !== "string" || user.username.trim() === "") return false;
    if (typeof user.phone1 !== "string" || user.phone1.trim() === "") return false;
    if (user.phone2 && !/^\d+$/.test(user.phone2)) return false;

    return true;
}

function validateOrdersInput(order, isIdRequired = false) {
    if (!order || typeof order !== "object") return false;

    const requiredFields = ["userId", "date", "status", "remarks"];
    if (isIdRequired) {
        requiredFields.push("id");
    }

    for (const field of requiredFields) {
        if (!(field in order)) return false;
    }

    const date = new Date(order.date);

    if (!(date instanceof Date && !isNaN(date))) return false;

    if (date.getFullYear() < 1000 || date.getFullYear() > 9999) return false;

    if (typeof order.status !== "string" || order.status.trim() === "") return false;
    if (typeof order.remarks !== "string" || order.remarks.trim() === "") return false;

    return true;
}


function validateProductInput(product, isIdRequired = false) {
    if (!product || typeof product !== "object") return false;

    const requiredFields = ["name", "weight", "package",  "inventory",'price'];
    if (isIdRequired) {
        requiredFields.push("id");
    }

    for (const field of requiredFields) {
        if (!(field in product)) return false;
    }

    if (typeof product.name !== "string" || product.name.trim() === "") return false;
    if (typeof product.package !== "string" || product.package.trim() === "") return false;
    


    return true;
}

function validateProductOrderInput(productOrder) {
    if (!productOrder || typeof productOrder !== "object") return false;

    const requiredFields = ["orderId", "productId", "amount"];

    for (const field of requiredFields) {
        if (!(field in productOrder)) return false;
    }

    if (typeof productOrder.orderId !== "number" || productOrder.orderId <= 0) return false;
    if (typeof productOrder.productId !== "number" || productOrder.productId <= 0) return false;
    if (typeof productOrder.amount !== "number" || productOrder.amount <= 0) return false;

    return true;
}

function validateEventsInput(event, isIdRequired = false) {
    if (!event || typeof event !== "object") return false;

    const requiredFields = ["orderId", "text", "date"];
    if (isIdRequired) {
        requiredFields.push("id");
    }

    for (const field of requiredFields) {
        if (!(field in event)) return false;
    }

    if (typeof event.orderId !== "number" || event.orderId <= 0) return false;
    if (typeof event.text !== "string" || event.text.trim() === "") return false;
    const date = new Date(event.date);
    if (!(date instanceof Date && !isNaN(date))) return false;

    return true;
}
function validateLoginInput(body) {

    if (!body || typeof body !== "object") return false;
  
    const requiredFields = ["email", "password"];
    requiredFields.forEach((field) => {
      if (!(field in body)) return false;
    });
  
    if (typeof body.password !== "string" || body.password.trim() === "") return false;
  
    return true;
  
  }
  function validatePasswordInput(passwordData) {

    if (!passwordData || typeof passwordData !== "object") return false;
    const requiredFields = ["email", "password","newPassword"];
    requiredFields.forEach((field) => {
      if (!(field in passwordData)) return false;
    });
  
    if (typeof passwordData.password !== "string" || passwordData.password.trim() === "") return false;
    if (typeof passwordData.newPassword !== "string" || passwordData.newPassword.trim() === "") return false;

  
    return true;
  
  }

module.exports = {
    validateUserInput,
    validateOrdersInput,
    validateProductInput,
    validateProductOrderInput,
    validateEventsInput,
    validateLoginInput,
    validatePasswordInput
};
