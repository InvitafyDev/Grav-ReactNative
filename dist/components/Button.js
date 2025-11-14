"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Button = ({ title, onPress }) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: onPress },
        react_1.default.createElement(react_native_1.Text, { style: styles.text }, title)));
};
const styles = react_native_1.StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
exports.default = Button;
