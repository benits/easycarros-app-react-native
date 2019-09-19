import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
    baseMargin: 10,
    basePadding: 20,
    baserRadius: 4,
    screenWidth: width < height ? width : height,
    screenHeigth: width < height ? height : width
}