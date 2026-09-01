export function sortShoes(shoes, sort) {
    return [...shoes].sort((a, b) => {
        switch (sort) {
            case "title-asc":
                return a.title.localeCompare(b.title);

            case "title-desc":
                return b.title.localeCompare(a.title);

            case "category-asc":
                return a.category.localeCompare(b.category);

            case "category-desc":
                return b.category.localeCompare(a.category);

            default:
                return 0;
        }
    });
}