// "Элементы формы (находим в документе Input'ы)"
const squareInput = document.getElementById('square-input');
const squareRange = document.getElementById('square-range');
const inputs = document.querySelectorAll('input');

// Радиокнопки
const typeReconstructionElements = document.querySelectorAll('input[name="type"]');
const typeBuildingElements = document.querySelectorAll('input[name="building"]');
const roomsElements = document.querySelectorAll('input[name="rooms"]');

// Чекбоксы
const ceilings = document.querySelector('input[name="ceiling"]');
const walls = document.querySelector('input[name="walls"]');
const floor = document.querySelector('input[name="floor"]');

// Базовая цена и элемент для вывода стоимости
const basePricePerMeter = 6000;
const totalPriceElement = document.getElementById('total-price');

// Обходим всем инпуты
inputs.forEach(function(item){
    item.addEventListener('input', calculate);
});

// Связка range с текстовым полем
squareRange.addEventListener('input', function(){
    squareInput.value = squareRange.value;
});

// Связка текстового поля с range
squareInput.addEventListener('input', function(){
    squareRange.value = squareInput.value;
});

// Запуск ф-ции расчета со старта
calculate();

// Функция calculate для пересчета стоимости
function calculate(){

    // Площадь квартиры
    const square = parseInt(squareInput.value);

    // Тип ремонта
    let typeReconstructionCost;
    typeReconstructionElements.forEach(function(item){
        if(item.checked){
            typeReconstructionCost = parseFloat(item.value);
        }
    });

    // Тип дома
    let typeBuildingCost;
    typeBuildingElements.forEach(function(item){
        if(item.checked){
            typeBuildingCost = parseFloat(item.value);
        }
    });

    // Количество комнат
    let roomsCost;
    roomsElements.forEach(function(item){
        if(item.checked){
            roomsCost = parseFloat(item.value);
        }
    });

    // Доп. опции
    const ceilingCost = ceilings.checked ? parseFloat(ceilings.value) : 1;
    const wallsCost = walls.checked ? parseFloat(walls.value) : 1;
    const floorCost = floor.checked ? parseFloat(floor.value) : 1;

    // Общая стоимость
    const totalPrice = basePricePerMeter * square * typeReconstructionCost * typeBuildingCost * roomsCost * 
    ceilingCost * wallsCost * floorCost; 

    // Преобразование числа в строку
    const formatter = new Intl.NumberFormat('ru');

    totalPriceElement.innerText = formatter.format(totalPrice);
}