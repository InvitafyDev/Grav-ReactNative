"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GravModal = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const GravModal = ({ visible, title = 'Modal Title', onClose = () => { }, onSave = () => { }, saveButtonText = 'Guardar', cancelButtonText = 'Cancelar', saveButtonDisabled = false, loading = false, isVista = false, children, }) => {
    // Handle Android back button
    (0, react_1.useEffect)(() => {
        const backHandler = react_native_1.BackHandler.addEventListener('hardwareBackPress', () => {
            if (visible) {
                onClose();
                return true;
            }
            return false;
        });
        return () => backHandler.remove();
    }, [visible, onClose]);
    return (react_1.default.createElement(react_native_1.Modal, { visible: visible, transparent: true, animationType: "fade", onRequestClose: onClose },
        react_1.default.createElement(react_native_1.View, { style: styles.backdrop }),
        react_1.default.createElement(react_native_1.SafeAreaView, { style: styles.container },
            react_1.default.createElement(react_native_1.View, { style: styles.modalContent },
                react_1.default.createElement(react_native_1.View, { style: styles.header },
                    react_1.default.createElement(react_native_1.Text, { style: styles.title }, title),
                    react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onClose, style: styles.closeButton },
                        react_1.default.createElement(react_native_1.Text, { style: styles.closeIcon }, "\u2715"))),
                loading ? (
                /* Loading State */
                react_1.default.createElement(react_native_1.View, { style: styles.loadingContainer },
                    react_1.default.createElement(react_native_1.ActivityIndicator, { size: "large", color: "#10b981" }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(react_native_1.ScrollView, { style: styles.body, contentContainerStyle: styles.bodyContent }, children),
                    !isVista && (react_1.default.createElement(react_native_1.View, { style: styles.footer },
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onClose, style: styles.cancelButton },
                            react_1.default.createElement(react_native_1.Text, { style: styles.cancelButtonText }, cancelButtonText)),
                        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onSave, style: [
                                styles.saveButton,
                                saveButtonDisabled && styles.saveButtonDisabled,
                            ], disabled: saveButtonDisabled },
                            react_1.default.createElement(react_native_1.Text, { style: styles.saveButtonText }, saveButtonText))))))))));
};
exports.GravModal = GravModal;
const styles = react_native_1.StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    closeButton: {
        padding: 4,
        marginLeft: 'auto',
    },
    closeIcon: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },
    bodyContent: {
        padding: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 12,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: '#ef4444',
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#ef4444',
        fontWeight: '700',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    saveButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#10b981',
        borderRadius: 8,
    },
    saveButtonDisabled: {
        backgroundColor: '#6ee7b7',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        textTransform: 'uppercase',
    },
});
