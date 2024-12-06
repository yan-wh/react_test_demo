import React, {useEffect, useState, useRef} from 'react';
// import { request } from '../../request'
// import style from './index.module.less';
import './index.less'

interface WaterfallProps {
	items?: string[]; // 图片数据列表
	columnWidth?: number; // 图片列宽度，不传入则按列数，每一列宽度是容器的【1 / maxColumns】
	gapSize?: number; // 图片间距
	maxColumns?: number; // 最大列数
}

/**
 * 瀑布流组件、column属性
 */
export const Waterfall = ({ imagePaths }) => {
	const [images, setImages] = React.useState<any>([]);

	useEffect(() => {
        // console.log('imagePaths', imagePaths)
		setImages(imagePaths);
	}, [imagePaths]);

	return (
		<div className="container">
			{images?.map((image: any, index: number) => {
				console.log('✅ ~  image:', image);

				return (
					<div key={index} className="item">
						<img src={image.src} alt={`Image ${index}`} />
					</div>
				);
			})}
		</div>
	);
};

// 作者：ObjectX不知名程序员
// 链接：https://juejin.cn/post/7370513151052021787
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




/**
 * js瀑布流
 */
// export class WaterFall {
// 	gap: number; // 间距
// 	container: HTMLDivElement; // 容器
// 	heightArr: number[]; // 保存每列的高度信息
// 	items: HTMLCollection; // 子节点
// 	renderIndex: number; // 保存已经渲染了的节点
// 	constructor(container: HTMLDivElement, options: {gap: number}) {
// 		this.gap = options?.gap ?? 0; // 间距
// 		this.container = container; // 容器
// 		this.heightArr = []; // 保存每列的高度信息
// 		this.items = container.children; // 子节点
// 		this.renderIndex = 0;
// 		this.container.addEventListener('resize', () => {
// 			this.heightArr = [];
// 			this.layout();
// 		});
// 		// 监听节点生成和卸载
// 		this.container.addEventListener('DOMSubtreeModified', () => {
// 			this.layout();
// 		});
// 	}

// 	getMaxHeight(heightArr: number[]) {
// 		let maxHeight = heightArr[0];
// 		for (let i = 1; i < heightArr.length; i++) {
// 			if (heightArr[i] > maxHeight) {
// 				maxHeight = heightArr[i];
// 			}
// 		}
// 		return maxHeight;
// 	}

// 	// 计算高度最小的列
// 	getMinIndex(heightArr: number[]) {
// 		let minIndex = 0;
// 		let min = heightArr[minIndex];
// 		for (let i = 1; i < heightArr.length; i++) {
// 			if (heightArr[i] < min) {
// 				min = heightArr[i];
// 				minIndex = i;
// 			}
// 		}
// 		return minIndex;
// 	}

// 	layout() {
// 		if (this.items.length === 0) return;
// 		const gap = this.gap;
// 		const pageWidth = this.container?.offsetWidth || 1000;
// 		const itemWidth = (this.items[0] as HTMLDivElement).offsetWidth;
// 		const columns = Math.ceil(pageWidth / (itemWidth + gap)) ?? 5; // 总共有多少列

// 		// 增量加载
// 		while (this.renderIndex < this.items.length) {
// 			let top, left;
// 			const curItem = this.items[this.renderIndex] as HTMLDivElement;
// 			const curImgItem = curItem.children[0] as HTMLImageElement;
// 			// 之前插入的时候我们给item设置了默认值，这我们需要将图片高度设置给item
// 			curItem.style.height = curImgItem.offsetHeight + 'px';
// 			curItem.style.width = curImgItem.offsetWidth + 'px';
// 			if (this.renderIndex < columns) {
// 				// 第一列
// 				top = 0;
// 				left = (itemWidth + gap) * this.renderIndex;
// 				this.heightArr[this.renderIndex] = curImgItem.offsetHeight;
// 			} else {
// 				// 找到高度最小的一列
// 				const minIndex = this.getMinIndex(this.heightArr);
// 				// 属于那一列，获取第一个元素，要获取left
// 				const whichColumnFirstItem = this.items[minIndex] as HTMLDivElement;

// 				top = this.heightArr[minIndex] + gap;
// 				left = whichColumnFirstItem.offsetLeft;
// 				// 重新计算当前插入列的高度
// 				this.heightArr[minIndex] += curImgItem.offsetHeight + gap;
// 			}

// 			curItem.style.top = top + 'px';
// 			curItem.style.left = left + 'px';
// 			this.renderIndex++;
// 		}
// 	}
// }

// export const JsTypeRender = (options: WaterfallProps) => {
// 	let loading = false;
// 	const {items = []} = options;
// 	const jsContainer = useRef<HTMLDivElement>(null);

// 	// 获取1-400之间的任意高度
// 	const getRandomHeight = (min = 1, max = 4) => {
// 		return (Math.floor(Math.random() * (max - min + 1)) + min) * 100;
// 	};

// 	// 生成随机的柔和颜色
// 	const getRandomColor = () => {
// 		const hue = Math.floor(Math.random() * 360); // 0到360度
// 		const saturation = Math.floor(Math.random() * 20) + 70; // 70%到90%的饱和度
// 		const lightness = Math.floor(Math.random() * 20) + 70; // 70%到90%的亮度
// 		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// 	};

// 	// 模拟异步请求数据
// 	async function getData(num = 5) {
// 		console.log('✅ ~ 请求数据num:', num);
// 		const jsContainerNode = jsContainer.current;
// 		if (jsContainerNode === null) return;
// 		let images = []
//         await request({
//             url: '/api/getImagesNames',
//             method: 'get'
//         }).then((res) => {
//             if (res.data) {
//                 images = res.data.map((item: string) => {
//                     return { 
//                         src: `/api/uploads/${item}`,
//                         file: item,
//                         height: '',
//                         gridRow: ''
//                     }
//                 })
//             }
//         })
// 		for (let i = 0; i < images.length; i++) {
// 			const div = document.createElement('div');
// 			div.className = `${style.jsItem}`;
// 			const img = new Image();
// 			img.src = images[i].src;
// 			// 等待图片加载完成，将图片依次插入到容器中
// 			img.onload = () => {
// 				const fragment = document.createDocumentFragment();
// 				div.className = `${style.jsItem}`;
// 				div.style.height = getRandomHeight(4, 1) + 'px';
// 				div.style.backgroundColor = getRandomColor(); // 设置随机颜色
// 				div.style.backgroundColor = getRandomColor(); // 设置随机颜色
// 				div.appendChild(img);
// 				fragment.appendChild(div);
// 				jsContainerNode.appendChild(fragment);
// 			};
// 			img.onerror = () => {
// 				console.error('Image failed to load');
// 			};
// 		}
// 	}

// 	// 触底增加数据
// 	const handScorllAddData = async () => {
// 		const scrollTop = document.documentElement.scrollTop;
// 		const clientHeight = document.documentElement.clientHeight;
// 		const scrollHeight = document.body.scrollHeight;
// 		const buffer = 50; // 缓冲区距离
// 		console.log(
// 			`Scroll Top: ${scrollTop}, Client Height: ${clientHeight}, Scroll Height: ${scrollHeight}`,
// 		);

// 		if (scrollTop + clientHeight >= scrollHeight - buffer && !loading) {
// 			loading = true;
// 			console.log('触底，开始加载数据...');
// 			await getData(5);
// 			loading = false;
// 			console.log('数据加载完成');
// 		}
// 	};

// 	// 先获取20条数据
// 	useEffect(() => {
// 		getData(20);
// 	}, []);

// 	// 渲染绘制
// 	useEffect(() => {
// 		const jsContainerNode = jsContainer.current;
// 		if (jsContainerNode === null) return;
// 		const water = new WaterFall(jsContainerNode, {gap: 10});
// 		water.layout();
// 	}, [items]);

// 	// 触底增加
// 	useEffect(() => {
// 		const onScroll = () => {
// 			console.log('滚动事件触发');
// 			handScorllAddData();
// 		};

// 		window.addEventListener('scroll', onScroll);

// 		return () => {
// 			window.removeEventListener('scroll', onScroll);
// 		};
// 	}, []);

// 	return <div className={style.jsContainer} ref={jsContainer}></div>;
// };