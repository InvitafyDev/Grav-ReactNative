"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalContainer = void 0;
const react_1 = __importDefault(require("react"));
const modalStore_1 = require("./modalStore");
const ModalContainer = () => {
    const modals = (0, modalStore_1.useModalStore)((state) => state.modals);
    return (react_1.default.createElement(react_1.default.Fragment, null, modals.map((modal, index) => {
        const ModalComponent = modal.component;
        return react_1.default.createElement(ModalComponent, { key: `${modal.id}-${index}`, ...modal.props });
    })));
};
exports.ModalContainer = ModalContainer;
