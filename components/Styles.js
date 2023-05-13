import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
// For all sites
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
    },


    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        padding: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    gatheringButton: {
        backgroundColor: '#0A100D',
        color: '#B9BAA3',
        borderRadius: 5,
        paddingVertical: 10,
        flex: 1,
        marginHorizontal: 2,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },

    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },





//Google LogIn styles
    googleButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        color: '#333',
    },
    googleButton: {
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#D6D5C9',
    },





// Create styles
    createContainer: {
        flex: 1,
        backgroundColor: '#D6D5C9',
        paddingHorizontal: 20,
        paddingVertical: 40,
        paddingTop: 100,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
    },
    createbutton: {
        backgroundColor: '#0A100D',
        color: '#B9BAA3',
        borderRadius: 5,
        paddingVertical: 10,
        flex: 1,
        marginHorizontal: 2,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 30,
    },





//GatheringInterfaceView styles
    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin:10,
        borderRadius: 25,
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: 80,
        borderRadius: 25,
        marginRight: 10,
        marginBottom: 10,
    },
    gatImage: {
        aspectRatio: 1,
        width: 80,
        height: undefined,
        borderRadius: 25,
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 20,
        flex: 1,
    },
    infoText: {
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },

    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 12,
    },
    selectedTextStyle: {
        fontSize: 12,
    },





//GatheringView styles
    headText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'black',
        paddingBottom: '2%',
        marginBottom: '5%',
        borderBottomWidth:0.5,
    },
    gatheringInformation: {
        margin: '3%',
    },
    descriptionText: {
        fontSize: 16,
            marginBottom: '6%',
    },
    descriptionText2: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomButtonContainer: {
        flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
            color: '#333',
    },
    deleteButton: {
        backgroundColor: '#DE1616'
    },
    modalButton: {
        margin: 5,
            padding: 8,
            borderRadius: 5,
            borderColor: "black",
            borderWidth: 1,
            alignItems: "center",
    },
    modalButtonTexts: {
        color: "black",
        fontWeight: "700",
        fontSize: 18,
    },







// CategoryView and FieldsView styles
    budgetContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        marginBottom: '0.2%',
    },
    budgetInfo: {
        width: '68%',
    },
    budgetText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    budget: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icons: {
        flexDirection: 'row',
        alignItems: 'center',
    },





// Profile styles
    bioContainer: {
        justifyContent: 'space-between',
        marginBottom: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        height: 130,
        width: 130,
        borderRadius: 50,
        marginBottom: 20,
    },
    profilePicture: {
        aspectRatio: 1,
        width: '100%',
        height: undefined,
        borderRadius: 50,
    },

    bottomContainer: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bioEmail: {
        fontSize: 18,
        marginBottom: 10,
        marginLeft: 5,
    },

    signOutButtonContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
        marginBottom: 20,
    },

    deleteButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#808080',
        textAlign: 'center',
        fontSize: 16
    },





//Budget, Edit gathering Modal styles
    textModal: {
        fontSize:16,
        color: '#a19f9f',
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: '8%',
    },
    modalInput: {
        flex: 1,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bababa',
        fontSize: 16,
        padding: '0.5%',
        paddingLeft: 10,
    },




//Modal.tsx styles
    modalContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
    },
    modalHeader: {
        justifyContent: "flex-start",
        padding: '3%',
    },
    modalText: {
        paddingTop: '3%',
        marginLeft: '2%',
        justifyContent: 'flex-start',
        fontSize: 24,
    },
    modalBody: {
        justifyContent: "center",
        paddingHorizontal: '5%',
        minHeight: 100,
        padding: '2%',
    },
    modalFooter: {
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 10,
        flexDirection: "row",
        backgroundColor: '#f0f0f0',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,

    },




//button.tsx styles
    buttons: {
        margin: 5,
        padding: 8,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
    },
    buttonTexts: {
        color: "black",
        fontWeight: "700",
        fontSize: 18,
    },


});


export {styles}
