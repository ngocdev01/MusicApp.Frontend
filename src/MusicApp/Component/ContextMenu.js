import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import styled from "@emotion/styled";
import { Box, Divider, Icon, Menu, Paper, Popover } from "@mui/material";
import {
    ArrowForwardIosRounded,
    ArrowOutwardOutlined,
} from "@mui/icons-material";

/**
 *
 * @param {Object} props
 * @param {Array} props.items
 * @param {{top :number,left: number}} props.openPos
 * @param {((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined} props.onClose
 *
 */
const ContextMenu = ({ items, openPos, onClose }) => {
    const menu = useRef();
    const [pos, setPos] = useState(null);
    const getPost = () => {
        if (!openPos) {
            setPos(null);
            return;
        }
        let win = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        let menuSize = {
            width: 300,
            height: 400,
        };

        openPos.top =
            openPos.top > win.height
                ? win.height - menuSize.height
                : openPos.top;
        openPos.left =
            openPos.left > win.width
                ? win.width - menuSize.width
                : openPos.left;
        setPos(openPos);
    };

    useEffect(() => {
        getPost();
    }, [openPos]);

    return (
        <Menu
            open={openPos != null}
            anchorReference="anchorPosition"
            padding={0}
            anchorPosition={openPos}
            onClose={onClose}
            MenuListProps={{ sx: { padding: 0 } }}
            PaperProps={{ sx: { overflow: "visible" } }}
        >
            <MenuList root items={items} />
        </Menu>
    );
};

/**
 *
 * @param {Object} props
 * @param {Object} props.item
 * @param {(e:Event)=>void} props.onHover
 * @param {boolean} props.expand
 */
const MenuItem = (props) => {
    let returnItem = null;
    const label = props.item.component
        ? props.item.component
        : props.item.label;

    if (props.item.children)
        return (
            <MenuNestedItem
                label={label}
                children={props.item.children}
                {...props}
            />
        );
    else return <MenuActionItem label={label} {...props} />;
};

const MenuActionItem = ({ label, onHover,...props }) => {
    return (
        <MenuItemBox onMouseEnter={onHover} {...props}>
            <Box display="flex" alignItems="center" padding="3px" gap={2}>
                {label}
            </Box>
        </MenuItemBox>
    );
};
const MenuNestedItem = ({ label, children, onHover, expand }) => {
    const handleMouseEnter = (e) => {
        onHover(e);
    };

    return (
        <MenuItemBox onMouseEnter={handleMouseEnter}>
            <Box display="flex" alignItems="center" padding="3px" gap={2}>
                {label}
            </Box>
            {expand && <MenuList items={children} />}
        </MenuItemBox>
    );
};

const MenuList = ({ items, root }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const ref = useRef();
    const [pos, setPos] = useState({ top: true, left: true });

    useEffect(() => {
        recalculatePosition();
    }, []);
    const recalculatePosition = () => {
        let { top, left } = { top: true, left: true };
        const { width, height, x, y } = ref.current.getBoundingClientRect();

        if (x < 0) {
            left = true;
        } else if (x + width > window.innerWidth) {
            left = false;
        }

        if (left < 0) {
            top = true;
        } else if (y + height > window.innerHeight) {
            top = false;
        }

        setPos({ top: top, left: left });
    };
    return (
        <MenuNestedItemBox ref={ref} root={root} pos={pos}>
            <Paper sx={{ margin: 0 }}>
                {items.map((child, index) => {
                    if(!child.hidden)
                    return (
                        <MenuItem
                            key={index}
                            expand={activeIndex == index}
                            onHover={() => setActiveIndex(index)}
                            item={child}
                            {...child}
                        />
                    );
                })}
            </Paper>
        </MenuNestedItemBox>
    );
};
export default ContextMenu;

const MenuItemBox = styled("li")(({ theme }) => ({
    listStyle: "none",
    minHeight: '50px',
    margin: 0,
    padding: "5px 10px",
    display: "flex",
    cursor: "pointer",
    position: "relative",

    "&:hover": {
        background: "rgba(255,255,255,0.1)",
    },
}));

const MenuNestedItemBox = styled("ul")(({ theme, root, pos }) => ({
    position: root ? "static" : "absolute",
    top: pos.top ? 0 : "unset",
    bottom: pos.top ? "unset" : 0,
    left: pos.left ? "97%" : "unset",
    right: pos.left ? "unset" : "97%",
    padding: 0,
    margin: 0,
    zIndex: "999",
    border: "1px solid #555555",
    borderRadius: "5px",
    minWidth: "100px",
    maxWidth: "600px",
}));
