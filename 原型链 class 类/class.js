
// function person (name){
//     console.log(this)

//     // this.say( function (){
//     //     console.log(this)
//     //    alert(`我再说${name}`) 
//     // })
//     this.say = function(){
//          console.log(this)
//        alert(`我再说${name}`) 
        
//     }
// }
// let newPerson = new person("你好") 
// // newPerson()   //如果单独运行newPerson 会报错 newPerson is not a function
// newPerson.say()   //这里的say是newPerson的方法

// function Animal(name){
//     this.name = name;
//  }
//  // All animals can eat,right?
//  Animal.prototype.eat = function(){
//     alert(`${this.name}eats`);
//  }
//  // same Rabbit as before
//  function Rabbit(name){
//         console.log(this.constructor)

//     this.name = name;
//     this.value = "12"
//  }
//  Rabbit.prototype.jump = function(){
//     alert(`${this.name}jumps`);
//  }
//  // setup the inheritance chain
//  Rabbit.prototype.eat= Animal.prototype.eat; // (*)    //

//  let rabbit = new Rabbit("white Rabbit");
// console.log(rabbit)
// console.log(rabbit.constructor)

//  rabbit.eat();  // rabbits can eat too
//  rabbit.jump();
 

// class person {
//   console.log("11")

// }

class person {
    name = "111"
    eat(){
        console.log("eat fun")
    }
    constructor(){  //方法是类的默认构造方法，创建类对象的时候被调用
        this.age = 18
        this.drink = function(){
        console.log("drink fun")

            this.x =  this.age
        }
    }
}
person.prototype.gender ="男"
person.prototype.foo = function(){
    console.log("@22")
}
let newPerson = new person()  
console.log(newPerson)    //  {name:"111",age:18,drink: function}
console.dir(person)                 // class person

newPerson.drink()               //drink fun
console.log(newPerson.name)         // 111  
console.log(person.name)         // person

           

console.log(newPerson.__proto__)    // {foo :function ,gender:"男"}
console.log(person.prototype)       // {foo :function ,gender:"男"}

console.log(newPerson.__proto__.gender)   //男
console.log(person.prototype.gender) //男

console.log(newPerson.__proto__.foo())  //  取不到undefined  但是可以执行@22
console.log(person.prototype.foo()) // 取不到undefined  但是可以执行 @22

console.log(newPerson.prototype)    // undefined
console.log(person.__proto__)    // function () { [native code] } 非法调用


console.log(newPerson.__proto__.eat()) // 取不到undefined  但是可以执行 eat fun
console.log(person.prototype.eat()) // 取不到undefined  但是可以执行 eat fun

console.log(newPerson.__proto__ === person.prototype)  // true

//能够通过newPerson.__proto__取到的就可以用person.prototype取到

// class Person {
//     // stativ version = "1.0";   // 不推荐，并非ES6中实现的标准
//     static sum(a, b) {return a + b;}; // 静态方法 推荐写法
//     constructor() {}
//   }
//   Person.desc = "人类";   // 静态属性 推荐写法
//   Person.sub = function(a, b) {return a - b;};

class Point {
    constructor(){

    }

    toString(){

    }

    toValue(){

    }
}


//等同于
Point.prototype={
    toString(){},
    constructor(){},
    toValue(){}
}

//上面代码中，constructor()、toString()、toValue()这三个方法，
//其实都是定义在Point.prototype上面

class B {}
const b = new B();

b.constructor === B.prototype.constructor // true

class Coint {
    constructor(){
      // ...
    }
  }
  
  //Object.assign 方法将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象
  Object.assign(Coint.prototype, {
    toString(){},
    toValue(){}
  });

  console.dir(Coint)


  //类的内部所有定义的方法，都是不可枚举的
  class Moint {
    constructor(x, y) {
      // ...
    }
  
    toString() {
      // ...
    }
  }
  
  //Object.keys(obj) 参数：要返回其枚举自身属性的对象 返回值：一个表示给定对象的所有可枚举属性的字符串数组
  //Object.values Object.values()和Object.keys()是相反的操作，把一个对象的值转换为数组
  Object.keys(Moint.prototype)
  console.log(Object.keys(Moint.prototype))   //[]

  //Object.getOwnPropertyNames方法返回直接在给定对象中找到的所有属性
  Object.getOwnPropertyNames(Moint.prototype)
  console.log(Object.getOwnPropertyNames(Moint.prototype))   //["constructor", "toString"]
  // ["constructor","toString"]


  //定义类
class Point1 {

    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  
  }
  
  var point = new Point1(2, 3);
  point.toString() // (2, 3)
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false
  point.__proto__.hasOwnProperty('toString') // true

  //上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），
  //所以hasOwnProperty()方法返回true，而toString()是原型对象的属性（因为定义在Point类上），
  //所以hasOwnProperty()方法返回false。这些都与 ES5 的行为保持一致

var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"

//上面代码在p1的原型上添加了一个printName()方法，
//由于p1的原型就是p2的原型，因此p2也可以调用这个方法。
//而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，
//因为这会改变“类”的原始定义，影响到所有实例。