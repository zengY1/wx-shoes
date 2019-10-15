import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, ScrollView, Image } from '@tarojs/components'
import { shoesNode, nickList, adidasList } from '../../utils/shoes'
import './index.less'
interface NavItem {
  id: number,
  name: string,
}
interface ListItem {
  id?: number,
  name?: string,
  imgUrl?: string
}
interface ListItems {
  id?: number,
  name?: string,
  list?: ListItem[]
}
interface IState {
  activeState?: number,
  arr?: NavItem[],
  arrList?: ListItems[],
  shoesList?: any
}
export default class Index extends Component<'', IState>{

  constructor(props) {
    super(props)
    this.state = {
      activeState: 1,
      arr: [],
      arrList: [],
      shoesList: []
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
    const { activeState } = this.state
    if (activeState === 1) {
      this.setState({
        shoesList: nickList
      })
    }
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  toInfoClick = (id) => {
    Taro.navigateTo({
      url: `../info/index?id=${id}`
    })
  }
  navChange = (data) => {
    if (data === 1) {
      this.setState({
        activeState: data,
        shoesList: nickList
      })
    }else if(data===2){
      this.setState({
        activeState: data,
        shoesList: adidasList
      })
    }

  }
  render() {

    const { activeState, shoesList } = this.state
    const newArr: ListItem[] = []
    shoesList.length > 0 ? shoesList.map((item) => {
      if (item.list.length > 0) {
        const childList = item.list
        const newA: any = {
          id: item.id,
          name: item.name
        }
        newArr.push(newA)
        childList.map((item) => {
          newArr.push(item)
        })
      }
    }) : ''
    return (
      <View className='wrapper'>
        <View className='content'>
          <ScrollView className='nav' scrollY={true}>
            {shoesNode.length > 0 ? shoesNode.map((item) => {
              return (
                <View className={activeState === item.id ? 'nav-item active' : 'nav-item'} onClick={() => this.navChange(item.id)}>
                  {item.name}
                </View>
              )
            }) : ''}
          </ScrollView>
          <ScrollView className='content-list' scrollY={true}>
            {
              newArr.length > 0 ? newArr.map((item) => {
              
                if (!item.imgUrl) {
                  return <View className='list-title' key={item.id}>{item.name}</View>
                }
                if (item.imgUrl) {
                  return (
                    <View className='list-item' key={item.id} onClick={()=>this.toInfoClick(item.id)}>
                      <View className='item-img'>
                        <Image src={item.imgUrl} style='width: 120rpx;height: 120rpx' />
                      </View>
                      <View className='item-desc'>
                        <View className='item-name'>{item.name}</View>
                        <View className='item-price'></View>
                      </View>
                    </View>
                  )
                }
              }) : ''
            }
          </ScrollView>
        </View>
      </View >
    )
  }
}
