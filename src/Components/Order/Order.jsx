import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import { getMainer } from "../../Api/Axios";
import allbrand from "../../images/allbarnd.webp";
import bitmain from "../../images/bitmain.webp";
import canaan from "../../images/canaan.webp";
import whatsminer from "../../images/whatsminer.webp";
import count1040 from "../../images/10-40count.webp";
import count50100 from "../../images/50-100count.webp";
import count100 from "../../images/100count.webp";
import "./order.css";

const barndOption = [
    {
        value: "ALL BRAND",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={allbrand}
                    alt="allbarnd"
                    width={200}
                    style={{ marginRight: 10, width: 200, height: 40 }}
                />
                <span>ALL BRAND</span>
            </span>
        ),
    },
    {
        value: "WHATSMINER",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={whatsminer}
                    alt="whatsminer"
                    style={{ marginRight: 10, width: 200, height: 40 }}
                />
                <span>WHATSMINER</span>
            </span>
        ),
    },
    {
        value: "BITMAIN",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={bitmain}
                    alt="bitmain"
                    width={200}
                    style={{ marginRight: 10, width: 200, height: 40 }}
                />
                <span>BITMAIN</span>
            </span>
        ),
    },
    {
        value: "CANAAN",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={canaan}
                    alt="canaan"
                    width={200}
                    style={{ marginRight: 10, width: 200, height: 40 }}
                />
                <span>CANAAN</span>
            </span>
        ),
    },
];

const countOption = [
    {
        value: "MOQ 10-40 ",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={count1040}
                    alt="count 10-40"
                    width={200}
                    style={{ marginRight: 10, width: 70, height: 50 }}
                />
                <span>MOQ 10-40 </span>
            </span>
        ),
    },
    {
        value: "MOQ 50-100",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={count50100}
                    alt="count 50-100"
                    width={200}
                    style={{ marginRight: 10, width: 70, height: 50 }}
                />
                <span>MOQ 50-100</span>
            </span>
        ),
    },
    {
        value: "MOQ 100+",
        label: (
            <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                    fontSize: 18,
                }}
            >
                <img
                    src={count100}
                    alt="count 100+"
                    width={200}
                    style={{ marginRight: 10, width: 70, height: 50 }}
                />
                <span>MOQ 100+</span>
            </span>
        ),
    },
];

const locationOption = [
    {
        value: "USA",
        label: "USA",
    },
    {
        value: "CANADA",
        label: "CANADA",
    },
    {
        value: "ASIA",
        label: "ASIA",
    },
    {
        value: "EUROPA",
        label: "EUROPA",
    },
    {
        value: "LATIN AMERICA",
        label: "LATIN AMERICA",
    },
];

const conditionOption = [
    {
        value: "NEW",
        label: "NEW",
    },
    {
        value: "USED",
        label: "USED",
    },
    {
        value: "I DON’T MIND",
        label: "I DON’T MIND",
    },
];

const Order = ({ setUserId, setMainer }) => {
    const [state, setState] = useState({
        brandSelect: "ALL BRAND",
        countSelect: "10-",
        locationSelect: "USA",
        conditionSelect: "NEW",
    });
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            setUserId(userId);
            sessionStorage.setItem("userId", userId);
        } else {
            navigate("/not-found");
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("brand", state.brandSelect);
        bodyFormData.append("location", state.locationSelect);
        bodyFormData.append("moq", state.countSelect);
        bodyFormData.append("condition", state.conditionSelect);
        bodyFormData.append("user_id", userId);
        const data = await getMainer(bodyFormData);
        if (typeof data !== "undefined" && data.length > 0) {
            navigate("/dashboard");
            sessionStorage.setItem("productMainer", JSON.stringify(data));
            setMainer(data);
        } else {
            swal({
                title: "Info!",
                text: "Unfortunately, the product you were looking for was not found. Please wait. Our staff will contact you.",
                icon: "info",
                button: false,
            });
        }
    };

    const onChangeBrand = (e) => {
        setState((prev) => ({ ...prev, brandSelect: e.value }));
    };

    const onChangeCount = (e) => {
        setState((prev) => ({ ...prev, countSelect: e.value }));
    };

    const onChangeLocation = (e) => {
        setState((prev) => ({ ...prev, locationSelect: e.value }));
    };

    const onChangeCondition = (e) => {
        setState((prev) => ({ ...prev, conditionSelect: e.value }));
    };

    return (
        <div className="order">
            <div className="order__card">
                <h3>What kind of product do you want?</h3>
                <form onSubmit={onSubmit}>
                    <label htmlFor="brandSelect">
                        What’s type of manufacture brand are you currently
                        looking for?
                    </label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={barndOption[0]}
                        name="brandSelect"
                        options={barndOption}
                        onChange={onChangeBrand}
                        required
                    />
                    <label htmlFor="countSelect">
                        What size of order are you looking at?
                    </label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={countOption[0]}
                        options={countOption}
                        name="countSelect"
                        onChange={onChangeCount}
                        required
                    />
                    <label htmlFor="locationSelect">
                        What location you prefer the units to be located?
                    </label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={locationOption[0]}
                        options={locationOption}
                        name="locationSelect"
                        onChange={onChangeLocation}
                        required
                    />
                    <label htmlFor="conditionSelect">
                        In what condition would you prefer the units?
                    </label>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={conditionOption[0]}
                        options={conditionOption}
                        name="conditionSelect"
                        onChange={onChangeCondition}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Order;
