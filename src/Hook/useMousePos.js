import { useState } from "react";

export default function useMousePos() {
    const [pos, setPos] = useState(null);
    function unset() {
        setPos(null);
    }

    const set = (e) => {
        e.preventDefault();
        setPos(
            pos === null
                ? {
                      mouseX: e.clientX,
                      mouseY: e.clientY,
                  }
                : null
        );
    };

    return [pos, set, unset];
}
