import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
// For all sites
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
    },
    nonHeaderContainer: {
        flex: 1,
        padding: 5,
        backgroundColor: '#D6D5C9',
        paddingTop: 100,
    },
    button: {
        backgroundColor: '#0A100D',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: '1%',
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
        marginBottom: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    buttonText: {
        color: '#D6D5C9',
        textAlign: 'center',
        fontSize: 16,
    },
    deleteText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 16,
    },





//Google LogIn styles
    googleButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#333',
    },
    googleButton: {
        alignItems: 'center',
    },
    googleButtonText: {
        color: '#D6D5C9',
    },
    logo: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
        marginTop: '-30%',
        marginBottom: '-15%',
        resizeMode: 'center',

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
        marginLeft: '2%',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        color: '#333',
        fontSize: 16,
    },
    createButton: {
        backgroundColor: '#0A100D',
        color: '#B9BAA3',
        borderRadius: 5,
        paddingVertical: 10,
        flex: 1,
        marginHorizontal: '1%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: '8%',
        marginLeft: '2%'
    },





//GatheringInterfaceView styles
    gatContainer: {
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin: '2%',
        borderRadius: 25,
    },
    gat: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    gatImageContainer: {
        width: '25%',
        borderRadius: 25,
    },
    gatImage: {
        aspectRatio: 1,
        width: '80%',
        height: undefined,
        borderRadius: 25,
    },
    nameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: '10%',
    },
    infoText: {
        fontSize: 16,
    },
    gatName: {
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },

    filterContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 5,
        borderRadius: 5,
        borderWidth: 0.5,
        width: '59%',
    },
    icon: {
        marginRight: 5,
    },
    selectedTextStyle: {
        fontSize: 16,
    },





//GatheringView and attendeesGatheringView styles
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
        marginBottom: '10%',
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '4%',
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#DE1616'
    },
    categoryInfoContainer: {
        flex: 1,
        marginBottom: '10%',
        flexDirection: "row",
        width: '100%',
        height: undefined,
        flexWrap: 'wrap',
    },
    categoryInfo: {
        borderRadius: 10,
        padding: 5,
        margin: '2%',
        marginRight: '4%',
        backgroundColor: 'white',
    },
    guests: {

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
        width: '65%',
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
    category: {
        marginBottom: '2%'
    },
    bioContainer: {
        justifyContent: 'space-between',
        marginBottom: '5%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
    },
    imageContainer: {
        alignItems: 'center',
        height: 130,
        width: '35%',
        borderRadius: 50,
        marginBottom: '5%',
    },
    profilePicture: {
        aspectRatio: 1,
        width: '100%',
        height: undefined,
        borderRadius: 50,
    },

    invitesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    invitesText: {
        fontWeight: 'bold',
    },
    bioEmail: {
        fontSize: 18,
        marginBottom: '4%',
        marginLeft: '2%',
    },

    signOutButtonContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#0A100D',
        paddingBottom: 10,
        marginBottom: '5%',
    },

    deleteButtonContainer: {
        marginTop: '5%',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#808080',
        textAlign: 'center',
        fontSize: 16,
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



//Invite attendees view
    attendees:{
        backgroundColor: '#B9BAA3',
        padding: 10,
        margin:'5%',
        borderRadius: 5,
    },
    attendeesText: {
        fontSize: 16,
        marginTop: '3%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    attendeesCont: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottom: 'black',
    },
    attendeesImageContainer: {
        width: '16%',
        borderRadius: 25,
        marginRight: '5%',
        marginLeft: '-5%',
    },
    attendeesName: {
        fontSize: 20,
        fontWeight: "bold",
    },
    attendeesName2: {
        fontSize: 20,
        marginTop: '10%',
        fontWeight: "bold",
    },
    attendeesIcons: {
        top: '2%',
        left: '80%',
    },
});


export {styles}
