

//-----------------------  类的prototype属性和_proto_属性
/** 
 * 大多数浏览器的 ES5 实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。
 * Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
 * 
 * 1.子类的 _proto_ 属性，表示构造函数的继承，总是指向父类
 * 2.子类的 prototype 属性的 _proto_ 属性，表示方法的继承，总是指向父类的prototype的属性
 * 
 */

 class A{}

 class B extends A{

}
B.__proto__ === A  //true
B.prototype=== A.prototype // true


/**
 * 上面代码中，子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性
 * 
 */
 
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true

/**
 * 这种情况下，A作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承Function.prototype。
 * 但是，A调用后返回一个空对象（即Object实例），
 * 所以A.prototype.__proto__指向构造函数（Object）的prototype属性
 * 
 */
 
