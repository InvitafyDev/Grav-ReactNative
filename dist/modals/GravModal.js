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
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const typography_1 = require("../theme/typography");
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
        react_1.default.createElement(react_native_safe_area_context_1.SafeAreaView, { style: styles.container },
            react_1.default.createElement(react_native_1.View, { style: styles.modalContent },
                react_1.default.createElement(react_native_1.View, { style: styles.header },
                    react_1.default.createElement(react_native_1.Text, { style: styles.title }, title),
                    react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onClose, style: styles.closeButton },
                        react_1.default.createElement(react_native_1.Text, { style: styles.closeIcon }, "\u2715"))),
                loading ? (
                /* Loading State */
                react_1.default.createElement(react_native_1.View, { style: styles.loadingContainer },
                    react_1.default.createElement(react_native_1.ActivityIndicator, { size: "large", color: typography_1.colors.primary }))) : (react_1.default.createElement(react_1.default.Fragment, null,
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
        backgroundColor: typography_1.colors.backdrop,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: typography_1.colors.white,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: typography_1.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: typography_1.colors.border,
    },
    title: {
        fontSize: typography_1.fontSize.xl,
        fontWeight: typography_1.fontWeight.semibold,
        color: typography_1.colors.black,
        flex: 1,
    },
    closeButton: {
        padding: typography_1.spacing.xs,
        marginLeft: 'auto',
    },
    closeIcon: {
        fontSize: typography_1.fontSize['2xl'],
        fontWeight: typography_1.fontWeight.semibold,
        color: typography_1.colors.black,
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
        padding: typography_1.spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: typography_1.spacing.md,
        gap: typography_1.spacing.md,
        borderTopWidth: 1,
        borderTopColor: typography_1.colors.border,
    },
    cancelButton: {
        paddingVertical: typography_1.spacing.md,
        paddingHorizontal: typography_1.spacing.xl,
        borderWidth: 1,
        borderColor: typography_1.colors.danger,
        borderRadius: typography_1.borderRadius.md,
    },
    cancelButtonText: {
        color: typography_1.colors.danger,
        fontWeight: typography_1.fontWeight.bold,
        fontSize: typography_1.fontSize.sm,
        textTransform: 'uppercase',
    },
    saveButton: {
        paddingVertical: typography_1.spacing.md,
        paddingHorizontal: typography_1.spacing.xl,
        backgroundColor: typography_1.colors.primary,
        borderRadius: typography_1.borderRadius.md,
    },
    saveButtonDisabled: {
        backgroundColor: typography_1.colors.primaryLight,
    },
    saveButtonText: {
        color: typography_1.colors.white,
        fontWeight: typography_1.fontWeight.bold,
        fontSize: typography_1.fontSize.sm,
        textTransform: 'uppercase',
    },
});
