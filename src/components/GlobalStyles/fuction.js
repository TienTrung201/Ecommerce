export function convertVnd(number) {
    if (number) {
        return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return 0;
}
