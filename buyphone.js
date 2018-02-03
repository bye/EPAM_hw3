const TAX_RATE = 0.18;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;
const SPENDING_THRESHOLD = 700;

let bank_balance = +prompt("Какой суммой располагаете?");
let amount = 0;
let items = 0;
let accessories = 0;


function addTaxes(price) {
    return price += price * TAX_RATE;
}

function formatAmount(amount) {
    return "$" + amount.toFixed(2);
}

// Покупатель набивает карман товарами, приблизительно ориентируясь нв баланс

while (amount < bank_balance){
    amount += addTaxes(PHONE_PRICE);
    items++;

    // К каждому товару в пределах определенной суммы добавляется аксессуар
    if (amount < SPENDING_THRESHOLD) {
        amount += addTaxes(ACCESSORY_PRICE);
        accessories++;
    }
}

alert('Выбрано ' + items + ' телефонов и ' + accessories + ' аксессуаров на общую сумму: ' + formatAmount(amount));

// Если баланс все-таки превышен, ему предлагают избавиться от лишних товаров
// Убираем до тех пор, пока не покупатель не впишется в баланс

while(amount > bank_balance){
  
  let confirmation = confirm('Вы выбрали слишком много товаров и превысили баланс. Убрать лишний товар?');
  
  if(confirmation){
    let item  = prompt('Какой товар желаете убрать: телефон или аксессуар?', 'аксессуар');
    item = item.toLowerCase();

    if(item === 'телефон' && items > 0) {
        amount -= addTaxes(PHONE_PRICE);
        items--;

    } else if (item === 'аксессуар' && accessories > 0){
        amount -= addTaxes(ACCESSORY_PRICE);
        accessories--;

    } else {
        alert('Похоже, данный товар убрать невозможно, попробуйте другой');
    }

    // Озвучивают итоговую сумму поупателю
    alert('Выбрано ' + items + ' телефонов и ' + accessories + ' аксессуаров на общую сумму: ' + formatAmount(amount));

    // Если покупатель решил, что не готов от чего-то отказаться, но не вписался в баланс, с ним вежливо прощаются
  } else {
    alert('Ждем Вас в другой раз');
    break;
  }
}