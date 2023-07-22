import clsx from "clsx";
import { HTMLProps } from "react";

interface WidgetContentProps extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

export default function WidgetContent({
    children,
    className,
    ...props
}: WidgetContentProps) {
    const classes = clsx("flex-1", className);

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
}
