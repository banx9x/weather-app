import { HTMLProps } from "react";
import clsx from "clsx";

interface WidgetValueProps extends HTMLProps<HTMLElement> {
    children: React.ReactNode;
}

export default function WidgetValue({
    children,
    className,
    ...props
}: WidgetValueProps) {
    const classes = clsx("text-5xl leading-none", className);

    return (
        <span className={classes} {...props}>
            {children}
        </span>
    );
}
