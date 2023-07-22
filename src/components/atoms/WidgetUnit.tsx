import clsx from "clsx";
import { HTMLProps } from "react";

interface WidgetUnitProps extends HTMLProps<HTMLSpanElement> {
    children: React.ReactNode;
}

export default function WidgetUnit({
    children,
    className,
    ...props
}: WidgetUnitProps) {
    const classes = clsx("text-xl leading-none", className);

    return (
        <span className={classes} {...props}>
            {children}
        </span>
    );
}
