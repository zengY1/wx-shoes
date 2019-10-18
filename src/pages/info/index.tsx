import Taro, { Component, Config } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import { shoesInfo, imgUrl } from '../../utils/shoesInfo'
import './index.less'

class ShoesInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrlList: [],
            shoesName: '',
            buyerUrlList: [],
            imgListRoot:''
        }
    }
    config: Config = {
        navigationBarTitleText: '详情'
    }
    componentWillMount() {
        const paramsId = this.$router.params.id
        const shoes = shoesInfo.filter((item) => item.shoesId == paramsId)
        if (shoes.length > 0) {
            this.setState({
                imgUrlList: shoes[0].imgList,
                shoesName: shoes[0].name,
                buyerUrlList: shoes[0].buyerList,
                imgListRoot:shoes[0].imgListRoot
            })
        }

    }
    imgError=(data)=>{
        console.log(data)
    }
    render() {
        const { shoesName, imgUrlList, buyerUrlList ,imgListRoot} = this.state
        return (
            <View className='info-wrapper'>
                <View className='info-swiper'>
                    <Swiper
                        className='swiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular
                        indicatorDots
                        autoplay>
                        {imgUrlList.map((item, index) => {
                            return (
                                <SwiperItem key={index}>
                                    <Image src={imgUrl+imgListRoot + item+'.jpg'} style='width: 100%;height: 100%' />
                                </SwiperItem>)
                        })}
                    </Swiper>
                </View>
                <View>
                    <View className='shoes-name'>{shoesName}</View>
                </View>
                <View>
                    <View className='info-title'>{imgUrlList.length > 0 ? '具体详情' : ''}</View>
                    <View className='info-Img'>
                        {imgUrlList.map((item) => {
                            return (
                                <View className='img'>
                                    <Image src={imgUrl+imgListRoot + item+'.jpg'+ '-csw'} style='width: 100%;height: 100%' />
                                </View>)
                        })}
                    </View>
                    <View>
                        <View className='info-title'>{buyerUrlList.length > 0 ? '买家实物展示' : ''}</View>
                        <View className='info-Img'>
                            {buyerUrlList.map((item) => {
                                return (
                                    <View className='img'>
                                        <Image src={imgUrl+imgListRoot + item +'.jpg'+ '-csw'} style='width: 100%;height: 100%' onload={()=>this.imgError(item)}/>
                                    </View>)
                            })}
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
export default ShoesInfo