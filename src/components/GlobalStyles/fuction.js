export function convertVnd(number) {
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
