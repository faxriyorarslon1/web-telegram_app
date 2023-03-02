export const getMainer = async (body) => {
    const res = await fetch(`https://159.203.88.113/api/v1/productlist/`, {
        method: "POST",
        body: body,
    });
    const data = res.json();
    return data;
};

export const postLike = async (body) => {
    const res = await fetch(`https://159.203.88.113/api/v1/like/`, {
        method: "POST",
        body: body,
    });
    const data = res.json();
    return data;
};

export const postDisLike = async (body) => {
    const res = await fetch(`https://159.203.88.113/api/v1/dislike/`, {
        method: "POST",
        body: body,
    });
    const data = res.json();
    return data;
};

export const postProduct = async (body) => {
    const res = await fetch(`https://159.203.88.113/api/v1/orders/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    });
    const data = res.json();
    return data;
};
