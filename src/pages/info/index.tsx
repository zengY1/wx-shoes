import Taro, { Component, Config } from '@tarojs/taro'
import { Swiper, SwiperItem, View, Image } from '@tarojs/components'
import { shoesInfo, imgUrl } from '../../utils/shoesInfo'
import './index.less'

class ShoesInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgUrlList: [],
            shoesName: ''
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
                shoesName: shoes[0].name
            })
        }

    }
    render() {
        const { shoesName, imgUrlList } = this.state
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
                                    <Image src={imgUrl + item} style='width: 100%;height: 100%' />
                                </SwiperItem>)
                        })}
                    </Swiper>
                </View>
                <View>
                    <View className='shoes-name'>{shoesName}</View>
                </View>
                <View>
                    <View className='info-title'>{imgUrlList.length>0?'具体详情':''}</View>
                    <View className='info-Img'>
                        {imgUrlList.map((item) => {
                            console.log('item', item)
                            return (
                                <View className='img'>
                                    <Image src={imgUrl + item + '-csw'} style='width: 100%;height: 100%' />
                                </View>)
                        })}
                    </View>
                </View>
            </View>
        )
    }
}
export default ShoesInfo