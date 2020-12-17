
/**
 * new是从构造函数生成实例对象的命令。
 * ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，
 * 返回new命令作用于的那个构造函数。
 * 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，
 * 因此这个属性可以用来确定构造函数是怎么调用的
 * Class 内部调用new.target，返回当前 Class。
 * 
 */

function Fun(name) {
    if (new.target !== undefined) {
        console.log(new.target)
        this.name = name
    } else {
        throw new Error('必须使用 new 命令调用')
    }
}


function Person(name) {
    if (new.target !== undefined) {
        this.name = name
    } else {
        throw new Error('必须使用 new 命令调用')
    }
}
let fun = new Fun("邵")
fun.name //邵
let person = Person("邵")
person.name //必须使用 new 命令调用 

class Rectangle {
    constructor(length, width) {
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

var obj = new Rectangle(3, 4); // 输出 true

//需要注意的是，子类继承父类时，new.target会返回子类
class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle);
      // ...
    }
  }
  
  class Square extends Rectangle {
    constructor(length, width) {
      super(length, width);
    }
  }
  
  var obj = new Square(3); // 输出 false

  /**
   * 
   * 上面代码中，new.target会返回子类。
   * 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类
   * 
   */

  class Shape {
    constructor() {
      if (new.target === Shape) {
        throw new Error('本类不能实例化');
      }
    }
  }
  
  class Rectangle extends Shape {
    constructor(length, width) {
      super();
      // ...
    }
  }
  
  var x = new Shape();  // 报错
  var y = new Rectangle(3, 4);  // 正确

  /**上面代码中，Shape类不能被实例化，只能用于继承
   * 注意，在函数外部，使用new.target会报错
   */