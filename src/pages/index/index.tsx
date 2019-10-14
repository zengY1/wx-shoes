import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, ScrollView, Image } from '@tarojs/components'
import './index.less'
interface NavItem {
  id: number,
  name: string,
}
interface ListItem{
  id:number,
  name:string,
  imgUrl:string
}
interface IState {
  activeState?: number,
  arr?: NavItem[],
  arrList?:ListItem[]
}
export default class Index extends Component<'', IState>{

  constructor(props) {
    super(props)
    this.state = {
      activeState: 1,
      arr: [{ id: 1, name: '中外名酒' }, { id: 2, name: '中外名烟' }, { id: 3, name: '中外名茶' }, { id: 4, name: '中外名饭' }],
      arrList:[{id:1,name:'Air Force 1空军1号',imgUrl:'http://pzcpiu6zq.bkt.clouddn.com//nick/air6.jpg'},{id:2,name:'Air Force 1空军1号',imgUrl:'http://pzcpiu6zq.bkt.clouddn.com//nick/air6.jpg'}]
    }
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '分类'
  }
  componentWillMount() { }

  componentDidMount() {
    const a = 111111
    Taro.setStorage({
      key: 'aaa',
      data: a
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  toMyClick = () => {
    Taro.navigateTo({
      url: '../my/index'
    })
  }
  getLogin = () => {
    console.log('hello')
    Taro.login({
      success: (res) => {
        var value = Taro.getStorageSync('aaa')
        console.log(value)
      }
    })
  }
  navChange = (data) => {
    this.setState({ activeState: data })
  }
  render() {
    console.log(this.state.arrList)
    const { activeState, arr ,arrList} = this.state
    return (
      <View className='wrapper'>
        <View className='content'>
          <ScrollView className='nav'>
            {arr.length > 0 ? arr.map((item) => {
              return (
                <View className={activeState === item.id ? 'nav-item active' : 'nav-item'} onClick={() => this.navChange(item.id)}>
                  {item.name}
                </View>
              )
            }) : ''}
          </ScrollView>
          <ScrollView className='content-list'>
            {arrList.length>0?arrList.map((item)=>{
              return (
                <View className='list-item' key={item.id}>
                <View className='item-img'>
                  <Image src={item.imgUrl} style='width: 120rpx;height: 120rpx'/>
                </View>
                <View className='item-desc'>
                  <View className='item-name'>{item.name}</View>
                  <View className='item-price'>￥220</View>
                </View>
              </View>
              )
            }):''}
           
          </ScrollView>
        </View>
      </View >
    )
  }
}
