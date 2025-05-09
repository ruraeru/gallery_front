import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

interface InputProps {
    name: string;
    label: string;
    errors?: string[];
}

const _Input = ({ name, label, errors = [], ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div>
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