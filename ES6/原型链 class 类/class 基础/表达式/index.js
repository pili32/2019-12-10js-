

//1.类的属性名，可以采取表达式
 
let methodsName = 'getArea'

// class Aqueare {
//     constructor (length){}

//     [methodsName](){   //这里的方法名就是 'getArea'

//     }
// }
// console.log(Object.getOwnPropertyNames(Aqueare.prototype))   // ["constructor", "getArea"]
//上面代码中，Square类的方法名getArea，是从表达式得到

 class Point {
     constructor(x,y){  //在这里接收Point的参数
        this.x = x
        this.y = y
        console.log( this.x*this.y)
     }

     toString(){
        console.log( this.x*this.y)
     }
 }

 const point = new Point(10,4)
 //通过下面方法执行toString()
point.toString()     // 25: 40
new Point(10,4) ;   //  21:40


//表达式
 let newInt = class Int{
    className(){
       console.log("邵先森")
    }
 }

 let A = new newInt() 
 A.className()   //邵先森
 let C = A
 C.className()   //邵先森

//  let B = new Int()   //Int is not defined 

 //如果类的内部没用到的话，可以省略Me，也就是可以写成下面的形式
 let newInt1 = class {
   className(){
      console.log("邵先森")
   }
 }
 let F = new newInt1() 
 F.className()   //邵先森

 //采用 Class 表达式，可以写出立即执行的 Class
 const shao = new class{

   constructor(x){
      this.name = x
   }
   className(){
      console.log( this.name)
   }

 }("邵先森")
 shao.className() //邵先森

 
/**
 * 静态方法
 * static
 * 如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”
 */

 class Foo {
    static className(){
       return 'hello'
    }
 }
 Foo.className() //hello
var foo = new Foo()
// foo.className()  //Cannot read property 'className' of undefined

/**
 * 上面代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，
 * 可以直接在Foo类上调用（Foo.classMethod()），
 * 而不是在Foo类的实例上调用。
 * 如果在实例上调用静态方法，会抛出一个错误，表示不存在该方法。
 */

 class Person {
  
   static className(){
      return "hello"
   }
   className1(){
      return "world"
   }

 }
Person.className() // hello

 let person = new Person()
 person.className1() //  world
//  person.className()  //  person.className is not a function
//  Person.className1()  //Person.className1 is not a function

 /**如上108代码，静态方法只能本身的类调用，而不能实例调用
  * 如上109代码，className1方法只能实例调用，而不能本身的类调用
  *  
  */


  class Fun {
     static className(){
        return "父类调用"
     }
     className(){
      return "实例父类调用"
     }
  }

  class Funs extends Fun {

  }

  Fun.className() //父类调用  
 let funs = new Funs()
 funs.className()  //实例父类调用

 /**如上代码,使用extends时， 父类的静态方法可以被子类调用
  * 子类的实例可以调用父类实例的方法
  * 静态方法可以和实例方法名字一样

  */

  class  Parent {
     static mes(){
         return "super调用父类方法"
     }
     
  }

  class Children extends Parent{
     static classMethod(){
        return super.mes() +',mes'
     }
  }
  Children.classMethod()  //super调用父类方法,mes

   /**如上代码,使用extends时，子类使用super可以调用父类mes方法
    * 
    * 
  */

   class Value{
      prop ="我是动态prop"
      static prop ="我是静态属性prop"     
      constructor(){
         this.count = "我是实例的count"
      }
  }
  let value = new Value()
   value.count  //1
   value.prop //我是动态prop
   Value.prop  //我是静态属性prop
   /**如上代码, 在类中属性前面加上static 就是类的静态属性，只能类调用
    * 
    * 
  */



