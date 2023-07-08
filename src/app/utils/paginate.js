export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    // Возвращаем новый массив обрезая начало и конец массива
    return [...items].splice(startIndex, pageSize);
}
