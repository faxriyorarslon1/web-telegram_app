import svg from "../../images/404errorbro.svg";

const NoUser = () => {
    return (
        <div
            style={{
                margin: "30px auto 20px",
                padding: "0 10px",
                maxWidth: 610,
            }}
        >
            <div
                style={{
                    maxWidth: 600,
                    width: "100%",
                    padding: "20px 15px",
                    borderRadius: 10,
                }}
            >
                <img
                    loading="lazy"
                    decoding="async"
                    width={150}
                    height={150}
                    src={svg}
                    alt="page not found"
                />
            </div>
        </div>
    );
};

export default NoUser;
