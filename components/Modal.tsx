import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
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
    <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
    </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
    <View style={styles.footer}>{children}</View>
);


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
        borderStyle: "solid",
    },
    header: {
        justifyContent: "flex-start",
        padding: '3%',
    },
    text: {
        paddingTop: '3%',
        marginLeft: '2%',
        justifyContent: 'flex-start',
        fontSize: 24,
    },
    body: {
        justifyContent: "center",
        paddingHorizontal: '5%',
        minHeight: 100,
        padding: '2%',
    },
    footer: {
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