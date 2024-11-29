import { useEffect, useState } from 'react'
import { request } from '../../request'
import { Photo } from '../../types'
import GsapTest from '../../components/gsap-test/index'

export default function GsapComp() {
    const [ photos, setPhotos ] = useState<Photo[]>([])
    const [photoElements, setPhotoElements] = useState<JSX.Element[]>([])
    const [photoClass, setPhotoClass] = useState<string[]>([])

    useEffect(() => {
        request({
            url: '/api/getImagesNames',
            method: 'get'
        }).then((res) => {
            // console.log(res.data)
            if (res.data) {
                let arr = []
                arr = res.data.map((item: string) => {
                    return { 
                        src: `/api/uploads/${item}`,
                        file: item,
                        height: '',
                        gridRow: ''
                    }
                })
                setPhotos(arr)
                setPhotoClass(arr.map((item: object, index: number) => `.photo${index}`))
                const elements: JSX.Element[] = arr.map((photo, index) => <div key={index} className={"w-full h-full bg-cover absolute top-0 left-0" + ` photo${index}`} style={{ backgroundImage: `url(${photo.src})`, backgroundPosition: "center", backgroundRepeat: "no-repeat" }}></div>)
                setPhotoElements(elements)
            }
        })
    }, [])

    return (
        <GsapTest photos={photos} photoElements={photoElements} photoClass={photoClass}/>
    )
}