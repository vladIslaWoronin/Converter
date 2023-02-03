// Elements
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

// Rates
const USDRate = document.querySelector('.course-item-value[data-value="USD"]');
const EURRate = document.querySelector('.course-item-value[data-value="EUR"]');
const GBPRate = document.querySelector('.course-item-value[data-value="GBP"]');

getRates();
setInterval(getRates, 10000)

async function getRates() {
    const url = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const response = await url.json();
    const data = await response;
    const rates = {
        USD: data.Valute.USD,
        EUR: data.Valute.EUR,
        GBP: data.Valute.GBP,
    };

    showRates(rates);
    changeRates(rates)
    changeColor(rates)
    console.log(data);
}

function showRates(rates) {


    USDRate.innerText = (rates.USD.Value).toFixed(2);
    EURRate.innerText = (rates.EUR.Value).toFixed(2);
    GBPRate.innerText = (rates.GBP.Value).toFixed(2);
}

function changeRates(rates) {
    select.addEventListener('change', function () {
        if (select.value === 'USD') {
            result.value = ((input.value) / (rates.USD.Value)).toFixed(2);
        } else if (select.value === 'EUR') {
            result.value = ((input.value) / (rates.EUR.Value)).toFixed(2);
        } else if (select.value === 'GBP') {
            result.value = ((input.value) / (rates.GBP.Value)).toFixed(2);
        }
    })
    input.addEventListener('input', function () {
        if (select.value === 'USD') {
            result.value = ((input.value) / (rates.USD.Value)).toFixed(2);
        } else if (select.value === 'EUR') {
            result.value = ((input.value) / (rates.EUR.Value)).toFixed(2);
        } else if (select.value === 'GBP') {
            result.value = ((input.value) / (rates.GBP.Value)).toFixed(2);
        }
    });
};

function changeColor(rates) {
    if (rates.USD.Previous < rates.USD.Value) {
        USDRate.classList.remove('bottom')
        USDRate.classList.add('top')
    } else if (rates.USD.Previous > rates.USD.Value) {
        USDRate.classList.remove('top')
        USDRate.classList.add('bottom')
    };

    if (rates.EUR.Previous < rates.EUR.Value) {
        EURRate.classList.remove('bottom')
        EURRate.classList.add('top')
    } else if (rates.EUR.Previous > rates.EUR.Value) {
        EURRate.classList.remove('top')
        EURRate.classList.add('bottom')
    };

    if (rates.GBP.Previous < rates.GBP.Value) {
        GBPRate.classList.remove('bottom')
        GBPRate.classList.add('top')
    } else if (rates.GBP.Previous > rates.GBP.Value) {
        GBPRate.classList.remove('top')
        GBPRate.classList.add('bottom')
    };
};