

class Person {
    #count =0;
    constructor(value){
        this.type = value
         
        this.fun  = () =>{
            return  this.type 
        }
    }
    increment(){
        return this.#count ++
    }
   

}

let person = new Person("555")
person.fun() // 555
let arr = new Array()
// console.log(person.increment())  //0
for(var i=0; i<5;i++){
    console.log(person.increment())
    arr.push(person.increment())
}
console.log(arr)   //[1, 3, 5, 7, 9]
//  Person.#count // undefined

/**
 * 类中 属性前面加#count代表的是私有属性
 * 只能在类的内部使用（this.#count）。如果在类的外部使用，就会报错
 */

class FakeMath {
    static PI = 22 / 7;
    static #totallyRandomNumber = 4;
  
    static #computeRandomNumber() {
      return FakeMath.#totallyRandomNumber;
    }
  
    static random() {
      console.log('I heard you like random numbers…')
      return FakeMath.#computeRandomNumber();
    }
  }
  
  FakeMath.PI // 3.142857142857143
  FakeMath.random()
  // I heard you like random numbers…
  // 4
  FakeMath.#totallyRandomNumber // 报错
  FakeMath.#computeRandomNumber() // 报错