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
    containerSuccess: {
        margin: metrics.baseMargin / 2,
        borderRadius: metrics.baserRadius,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.sucess,
        
    },
    form: {
        marginTop: metrics.baseMargin,
    },
    row: {
        flexDirection: "row"
    },
    rowBtn: {
        flexDirection: "row",
        justifyContent: "space-around", 
        alignItems: "stretch"       
    },
    input: {
        backgroundColor: colors.whiteTransparent,
        borderRadius: metrics.baserRadius,
        height: 44,
        paddingHorizontal: metrics.basePadding,
        marginTop: metrics.baseMargin * 2,
    },
    textItem: {
        color: colors.white,
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    buttonLogout: {
        backgroundColor: colors.danger,
        borderRadius: metrics.baserRadius,
        marginTop: metrics.baseMargin * 2,
        height: 44,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        marginLeft: metrics.baseMargin,
        backgroundColor: colors.secondary,
        borderRadius: metrics.baserRadius,
        marginTop: metrics.baseMargin * 2,
        height: 44,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonDelete: {
        backgroundColor: colors.danger,
        borderRadius: metrics.baserRadius,
        height: 44,
        width: 44,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonTextDelete: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 20,
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
    textLightItem: {
        color: colors.white,
    },
    textLight: {
        paddingTop: metrics.basePadding / 2, 
        color: colors.lighter,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 17
    },
    textTitle: {
        color: colors.lighter,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 24
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
    listContainerItem: {
        flex: 1,
        margin: metrics.baseMargin,
        backgroundColor: colors.whiteTransparent,
        borderRadius: metrics.baserRadius,
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
       

    },
    listContainer: {
        flex: 1,
        marginTop: metrics.baseMargin,
        backgroundColor: colors.whiteTransparent,
        borderRadius: metrics.baserRadius,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",

    },
    listItem: {
        alignItems: "center"
       
    },
    buttonItem: {
        alignSelf: 'flex-start'
    },
    rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
    },
    

});

export default styles;
