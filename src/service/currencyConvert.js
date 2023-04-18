export default function currencyConvert(number = 0, suffix = true) {
    let currencyString = number.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    if (!suffix) {
        currencyString = number.toLocaleString('vi-VN', {
            style: 'decimal',
            currency: 'VND',
        });
    }

    return currencyString;
}
