import { createContext, useContext, useEffect, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
    const [compareItems, setCompareItems] = useState(() => {
        const savedCompareItems = localStorage.getItem("compareItems");

        return savedCompareItems ? JSON.parse(savedCompareItems) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "compareItems",
            JSON.stringify(compareItems)
        );
    }, [compareItems]);

    function toggleCompare(shoe) {
        const isAlreadySelected = compareItems.some(
            (item) => item.id === shoe.id
        );

        if (isAlreadySelected) {
            setCompareItems(
                compareItems.filter((item) => item.id !== shoe.id)
            );
            return;
        }

        if (compareItems.length >= 2) {
            return;
        }

        setCompareItems([...compareItems, shoe]);
    }

    function isInCompare(id) {
        return compareItems.some((item) => item.id === id);
    }

    return (
        <CompareContext.Provider
            value={{
                compareItems,
                toggleCompare,
                isInCompare,
            }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    return useContext(CompareContext);
}