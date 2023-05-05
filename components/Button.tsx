import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

export type ButtonProps = {
    title: string;
    onPress: () => void;
};

export const Buttons = ({ title, onPress }: ButtonProps) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 5,
        padding: 8,
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
    },
    text: {
        color: "black",
        fontWeight: "700",
        fontSize: 18,
    },

});