const EmptyText = (str) => {
    if (str)
    {
        let string = str.toString();
        let trimStr = string.trim();   // удаление пробелов в начале и в конце
        let newStr = trimStr.replace(/\s+/g, ' ').trim();  // удаление всех лишних пробелов 
        return newStr;   
    } 
    else 
    {
        let newStr="";
        return newStr;
    }
};

export default EmptyText;