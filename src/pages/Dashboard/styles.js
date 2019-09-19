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
        margin: metrics.baseMargin
    },
    containerAviso: {
        marginTop: metrics.baseMargin,
        borderRadius: metrics.baserRadius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.warning,
    },
    containerError: {
        margin: metrics.baseMargin,
        borderRadius: metrics.baserRadius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.danger,
        
    },
    form: {
        marginTop: metrics.baseMargin * 2,
    },
    row: {
        flexDirection: "row"
    },
    input: {
        backgroundColor: colors.whiteTransparent,
        borderRadius: metrics.baserRadius,
        height: 44,
        paddingHorizontal: metrics.basePadding,
        marginTop: metrics.baseMargin * 2,
    },
    buttonLogout: {
        marginLeft: 8,
        backgroundColor: colors.danger,
        borderRadius: metrics.baserRadius,
        marginTop: metrics.baseMargin * 2,
        height: 44,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginLeft: 8,
        backgroundColor: colors.secondary,
        borderRadius: metrics.baserRadius,
        marginTop: metrics.baseMargin * 2,
        height: 44,
        width: 80,
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
    textAddContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: metrics.baseMargin 
    },
    textLight: {
        paddingTop: metrics.basePadding / 2, 
        color: colors.lighter,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 17
    },
    textLightError: {
        padding: 5, 
        color: colors.lighter,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: "center"
    },
    textCriarConta: {
        paddingTop: metrics.basePadding,
        color: colors.secondary,
        fontWeight: "bold"
    },
    inputs: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listContainer: {
        flex: 1,
        marginTop: metrics.baseMargin,
        borderRadius: metrics.baserRadius,
        backgroundColor: colors.lighter,
        padding: metrics.basePadding ,
        justifyContent: "center",
        alignItems: 'stretch'
    }

});

export default styles;
