
/**    继承
 *  Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多
 * 下面代码定义了一个Children类，该类通过extends关键字，继承了Parent类的所有属性和方法
 */


//-------------  一.Class 的继承  ---------------------
class Parent {

}
//子类继承父类extends
class Children extends Parent {

}


class Parents {

}

class Childrens extends Parents{

    constructor(x,y,z){
        super(x,y,z)  //调用父类的constructor(x,y)
        this.color = z
    }
    toString(){
        return this.color + '' + super.toString() //调用父类的toString
    }
}

/**
 * 上面代码中，constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，
 * 用来新建父类的this对象。子类必须在constructor方法中调用super方法，否则新建实例时会报错。
 * 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，
 * 然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
 * 
 */

 class Point {}
 class ColorPoint extends Point{
     constructor(){}
 }
 let cp   = new ColorPoint()   // ReferenceError
 /**
  * 上面代码中，ColorPoint继承了父类Point，但是它的构造函数没有调用super方法，导致新建实例时报错
  * ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，
  * 实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
  * 
  */

  class Point {
      constructor(x,y){
        this.x = x;
        this.y = y
      }
  }

  class ColorPoint extends Point {
      constructor(x,y,color){
        this.color = color;  // ReferenceError
        super(x,y)
        this.color = color //正确
      }
  }
  let cp = new ColorPoint(25, 8, 'green');
  cp instanceof ColorPoint // true
  cp instanceof Point // true


  /**
   * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
   * 上面代码中，实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。
   * 最后，父类的静态方法，也会被子类继承
   */

   class A {
       static hello () {
           console.log('hello world')
       }

   }

   class B extends A {

}
B.hello() // hello world

//上面代码中，hello()是A类的静态方法，B继承A，也继承了A的静态方法

//-------------  二.Object.getPrototypeOf() ---------------------
/** 
 * 
 */

Object.getPrototypeOf(ColorPoint) === Point  //true

//-------------  二.super 关键字 ---------------------
/**
 * super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同
 * 第一种情况，super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数
 */

 class A{}
 class B extends A{
     constructor(){
         super()
     }
 }

 /**
  * 上面代码中，子类B的构造函数之中的super()，代表调用父类的构造函数。这是必须的，否则 JavaScript 引擎会报错
  * 注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，
  * 因此super()在这里相当于A.prototype.constructor.call(this)
  */

  class A {
      constructor(){
          console.log(new.target.name)
      }
  }

  class B extends A{
      constructor(){
          super()
      }
  }

  new A()  //A
  new B()  //B

  /**
   * 上面代码中，new.target指向当前正在执行的函数。
   * 可以看到，在super()执行时，它指向的是子类B的构造函数，而不是父类A的构造函数。
   * 也就是说，super()内部的this指向的是B
   * 
   */

   class A{}

   class B extends B{
       m(){
           super() //报错
       }
   }
   //上面代码中，super()用在B类的m方法之中，就会造成语法错误

   //第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类

   class A {
        p(){

            return 4  
        }
   }

   class B extends A{
       constructor(){
           
           super();

           console.log(super.P)
       }
   }

   /**
    * 上面代码中，子类B当中的super.p()，就是将super当作一个对象使用
    * 这时，super在普通方法之中，指向A.prototype
    * 所以super.p()就相当于A.prototype.p()
    */
   class A {
    constructor() {
      this.p = 2;
    }
  }
  
  class B extends A {
    get m() {
      return super.p;
    }
  }
  
  let b = new B();
  b.m // undefined

  /**
   * 上面代码中，p是父类A实例的属性，super.p就引用不到它
   * 如果属性定义在父类的原型对象上，super就可以取到
   */

   class A {}
   A.prototype.p =5

   class B extends A{
       constructor(){
           super()
           console.log(super.p)
       }
   }

   let b = new B()  //2
   b.p

   /**
    * 上面代码中，属性x是定义在A.prototype上面的，所以super.x可以取到它的值
    * ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
    * 
    */

   class A {
    constructor() {
      this.x = 1;
    }
    print() {
      console.log(this.x);
    }
  }
  
  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    m() {
      super.print();
    }
  }
  
  let b = new B();
  b.m() // 2

  /**
   * 上面代码中，super.print()虽然调用的是A.prototype.print()
   * 但是A.prototype.print()内部的this指向子类B的实例导致输出的是2，而不是1。也就是说
   * 实际上执行的是super.print.call(this)
   * 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性
   */

   class A{
       constructor () {
           this.x = 70
       }
   }

   class B extends A{
       constructor(){
           this.x = 10;
           super()
           super.x = 20;
           console.log(super.x)
           console.log(this.x )   //20
        }
   }

   /**
    * 上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined
    * 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
    * 
    */

    class Point {
        static className(){
            console.log("static",msg)
        }
        className(){
            console.log('instance',msg)
        }
    }

    class Child extends Point{
        static className(msg){
            super.className(msg)
        }

        className(msg){
            super.className(msg)
        }
    }

    var child = new Child(1) //static 1
    child.className(2)  //instance 2

    /**
     * 上面代码中，super在静态方法之中指向父类，在普通方法之中指向父类的原型对象
     * 另外，在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
     */

    class A {
        constructor() {
          this.x = 1;
        }
        static print() {
          console.log(this.x);
        }
      }
      
      class B extends A {
        constructor() {
          super();
          this.x = 2;
        }
        static m() {
          super.print();
        }
      }
      
      B.x = 3;
      B.m() // 3

      /**
       * 上面代码中，静态方法B.m里面，super.print指向父类的静态方法。这个方法里面的this指向的是B，而不是B的实例
       * 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错
       */

       class A{}

       class B extends A{
           constructor(){
               super();
               console.log(super.valueOf() instanceof  B)  //true
           }
       }
       let b = new B();

       /**
        * 上面代码中，super.valueOf()表明super是一个对象，因此就不会报错。
        * 同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例
        * 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
        */

        var obj ={
            toString(){
                return "MyObj" + super.toString()
            }
        }

        obj.toString()  // MyObject: [object Object]