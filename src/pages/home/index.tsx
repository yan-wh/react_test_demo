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

import { 
    Button, 
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    useDisclosure, 
    Card, 
    Skeleton, 
    Calendar,  
} from '@nextui-org/react';
import { useState } from 'react'
import { parseDate } from '@internationalized/date'
import MusicBox from '../../components/MusicBox'

interface IConfig {
    name: string
    age: number
}



export default function Home() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [ config, setConfig ] = useState<IConfig>({name: '', age: 0})
    let [curDate, setCurDate] = useState(parseDate(new Date().toISOString().split('T')[0]))
    return (
        <div className='px-2 py-2 flex'>
            <div className='w-full'>
                <div className='flex w-full justify-center'>
                    {[1, 2, 3, 4].map((item: number, index: number) => {
                        return <div className='w-1/6 mr-2' key={index}>
                            <Card className="w-100 h-full space-y-5 p-4" radius="lg">
                                <Skeleton className="rounded-lg">
                                    <div className="h-24 rounded-lg bg-default-300"></div>
                                </Skeleton>
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5 rounded-lg">
                                        <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-4/5 rounded-lg">
                                        <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                    </Skeleton>
                                    <Skeleton className="w-2/5 rounded-lg">
                                        <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </Card>
                        </div>
                    })}
                    <Calendar 
                        aria-label="Date (Controlled)" 
                        value={curDate} 
                        onChange={setCurDate} 
                    />
                </div>

                {/* 音乐盒 */}
                <div className='flex justify-center w-full h-[300px]'>
                    <MusicBox width={'80%'} height={300}/>
                </div>

                <div className='flex justify-center items-center w-full h-[200px]'>
                    <Button onPress={onOpen} className='w-[200px] h-[100px] text-2xl'>叨叨念</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={'blur'} placement={'auto'}
                        classNames={{
                            base: "bg-white text-black",
                            // header: "border-b-[1px] border-[#292f46]",
                            // footer: "border-t-[1px] border-[#292f46]",
                            // closeButton: "hover:bg-white/5 active:bg-white/10",
                        }}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                    <ModalBody>
                                        <p>
                                            嗯，慧慧子是个大美女
                                        </p>
                                        <p>
                                            嗯，灏灏子是个大帅哥
                                        </p>
                                        <p>
                                            嗯，他俩简直是天仙配！
                                        </p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={onClose}>
                                            关掉我
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                            嗯呐
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </div>
            </div>
            
        </div>
    )
}