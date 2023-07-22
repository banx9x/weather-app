interface GridItemProps extends HTMLElement {
    heading: string;
    area: string;
}

export default function GridItem({ area, heading }: GridItemProps) {
    return <div className="grid-item" style={{ gridArea: area }}>
        
    </div>;
}
