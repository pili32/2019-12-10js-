
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