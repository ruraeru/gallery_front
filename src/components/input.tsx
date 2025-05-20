import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import styles from "@/styles/Input.module.css";

interface InputProps {
    name: string;
    label: string;
    errors?: string[];
}

const _Input = ({ name, label, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className={styles.wrapper}>
            <div>
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    ref={ref}
                    name={name}
                    {...rest}
                />
            </div>
            {errors?.map((error, index) => (
                <span key={index}>
                    {error}
                </span>
            ))}
        </div>
    )
}

export default forwardRef(_Input);