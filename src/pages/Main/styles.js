import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';
import { bold } from 'ansi-colors';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: metrics.basePadding * 2,
        justifyContent: "center",
        alignItems: 'stretch'
    },
    barStyle: {
        backgroundColor: colors.primary
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1

    },
    logo: {
        height: 165,
        width: 155, 
    },
    containerError: {
        borderRadius: metrics.baserRadius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.danger,
        
    },
    form: {
        marginTop: metrics.baseMargin * 2,
    },
    input: {
        backgroundColor: colors.whiteTransparent,
        borderRadius: metrics.baserRadius,
        height: 44,
        paddingHorizontal: metrics.basePadding,
        marginTop: metrics.baseMargin * 2,
    },
    button: {
        backgroundColor: colors.secondary,
        borderRadius: metrics.baserRadius,
        marginTop: metrics.baseMargin * 2,
        height: 44,
        justifyContent: "center",
        alignItems: "center"
        
    },
    buttonText: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
    criarContaContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: metrics.baseMargin 
    },
    textLight: {
        paddingTop: metrics.basePadding / 2, 
        color: colors.lighter
    },
    textLightError: {
        padding: 5, 
        color: colors.lighter,
        fontWeight: 'bold',
        fontSize: 16
    },
    textCriarConta: {
        paddingTop: metrics.basePadding,
        color: colors.secondary,
        fontWeight: "bold"
    }

});

export default styles;
