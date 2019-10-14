import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

class My extends Component {
    config: Config = {
        navigationBarTitleText: 'My'
    }
    render() {
        return (
            <View>
                <Text>
                    this is my components page
                </Text>
            </View>
        )
    }
}
export default My