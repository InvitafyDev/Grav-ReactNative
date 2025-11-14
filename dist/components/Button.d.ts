import React from 'react';
interface ButtonProps {
    title: string;
    onPress: () => void;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
