import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNModal from "react-native-modal";
type ModalProps = {
    isVisible: boolean;
    children: React.ReactNode;
    [x: string]: any;
};
export const Modal = (
    {
        isVisible = false,
        children,
        ...props
    }: ModalProps) => {

    return (
        <RNModal
            isVisible={isVisible}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={800}
            backdropTransitionOutTiming={800}
            {...props}>
            {children}
        </RNModal>
    );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
    <View style={styles.modalContainer}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
    <View style={styles.modalHeader}>
        <Text style={styles.modalText}>{title}</Text>
    </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.modalBody}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.modalFooter}>{children}</View>
);


const styles = StyleSheet.create({
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
});


Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
