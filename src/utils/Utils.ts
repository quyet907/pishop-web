export const convertMonney = (num: number) => {
    return num.toLocaleString("en-US", { style: "currency", currency: "VND" });
};