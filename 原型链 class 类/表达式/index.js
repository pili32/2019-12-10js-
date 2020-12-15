

//1.类的属性名，可以采取表达式
 
let methodsName = 'getArea'

class Aqueare {
    constructor (length){}

    [methodsName](){   //这里的方法名就是 'getArea'

    }
}
console.log(Object.getOwnPropertyNames(Aqueare.prototype))   // ["constructor", "getArea"]
//上面代码中，Square类的方法名getArea，是从表达式得到的