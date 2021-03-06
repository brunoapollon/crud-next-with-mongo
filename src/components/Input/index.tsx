import React, {
  InputHTMLAttributes,
  FunctionComponent,
  createRef,
  useEffect,
} from 'react';
import { useField } from '@unform/core';
import styles from '../../styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: FunctionComponent<InputProps> = ({ name, ...rest }) => {
  const inputRef = createRef<HTMLInputElement>();

  const { defaultValue, fieldName, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, inputRef, registerField]);

  return (
    <input
      defaultValue={defaultValue}
      ref={inputRef}
      {...rest}
      className={styles.input}
    />
  );
};

export default Input;
