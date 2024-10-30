// 写出ts中几种定义类型的方法

// 0.基础类型
// type IConfig1 = string | number | boolean | null | undefined

// 1.接口
interface IConfig {
    name: string
    age: number
}
// 2.类型别名
type IConfig2 = {
    name: string
    age: number
}
// 3.字面量类型
type IConfig3 = 'name' | 'age'
// 4.联合类型
type IConfig4 = string | number
// 5.交叉类型
type IConfig5 = {name: string} & {age: number}
// 6.元组类型
type IConfig6 = [string, number]
// 7.枚举类型
enum IConfig7 {
    name = 'name',
    age = 'age'
}
// 8.函数类型
type IConfig8 = (name: string, age: number) => void
// 9.数组类型
type IConfig9 = string[]
// 10.对象类型
type IConfig10 = {name: string, age: number}
// 11.类类型
class IConfig11 {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
}
// 12.泛型类型
type IConfig12<T> = T[]
// 13.类型断言
type IConfig13 = string | number
function getConfig(config: IConfig13) {
    return config as string
}
// 14.类型守卫
function getConfig2(config: IConfig13) {
    if (typeof config === 'string') {
        return config
    }
    return config.toString()
}
// 15.类型推断
function getConfig3(config: IConfig13) {
    return config
}
// 16.类型别名和接口的区别
// 类型别名可以定义联合类型，接口不能

// 接口可以定义联合类型，类型别名不能

// 17.类型断言和类型守卫的区别
// 类型断言是告诉编译器我知道这个类型是什么，类型守卫是告诉编译器这个类型是什么
// 18.类型断言和类型守卫的使用场景
// 类型断言一般用于你知道这个类型是什么，但是编译器不知道的情况
// 类型守卫一般用于你知道这个类型是什么，但是编译器不知道的情况


import { useState } from 'react'

interface IConfig {
    name: string
    age: number
}



export default function Home() {
    const [ config, setConfig ] = useState<IConfig>({name: '', age: 0})
    return (
        <div></div>
    )
}