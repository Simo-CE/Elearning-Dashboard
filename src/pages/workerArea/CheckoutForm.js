import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteGreyAsset,
  discoverAsset,
  idealAsset,
  maestroAsset,
  masterAsset,
  paypalAsset,
  safeCheckoutAsset,
  shieldAsset,
  visaAsset,
} from "../../assets";
import { removeFromCart, emptyCart } from "../../redux/AddToCart";
import "./WorkerArea.css";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  CardElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { usePurchaseTrainingMutation } from "../../services/api";
import { toast } from "react-toastify";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [isValidToken, setIsValidToken] = useState();
  const [cardName, setCardName] = useState();

  const cart = useSelector((state) => state.cart.cart);
  let totalPrice = cart.reduce((n, { price }) => n + Number(price), 0);
  let totalTax = cart.reduce((n, { tax }) => n + Number(tax), 0);
  let totalDiscount = cart.reduce((n, { discount }) => n + Number(discount), 0);

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Card name is required"),
  //   cardNumber: Yup.string().required("Card number is required"),
  //   expirayDate: Yup.string().required("Required"),
  //   CVV: Yup.string().required("Required"),

  // });

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(validationSchema),
  //   mode: "onTouched",
  // });

  const [
    purchaseTraining,
    {
      isSuccess: purchaseTrainingSuccess,
      isLoading: purchaseTrainingLoading,
      isError: purchaseTrainingIsError,
      error: purchaseTrainingError,
      reset: purchaseTrainingReset,
    },
  ] = usePurchaseTrainingMutation();

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    cart?.map((item, index) => {
      item?.training_series_section
        ? formData.append(`series_id[${index}]`, item.id)
        : formData.append(`training_id[${index}]`, item.id);
      formData.append(`desc`, item.desc);
    });
    formData.append(`device_type`, "web");
    formData.append(`amount`, totalPrice);

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });

    formData.append(`card_name`, cardName);
    formData.append(`cart_type`, payload?.paymentMethod.type);
    formData.append(`status`, payload?.paymentMethod.id && "succeeded");
    formData.append(`payment_method`, "stripe");
    formData.append(`stripe_id`, payload?.paymentMethod.id);
    formData.append(`card_no`, payload?.paymentMethod?.card?.last4);

    purchaseTraining(formData)
      .unwrap()
      .then((payload) => {
        payload && toast.success("Purchased successfully");
        dispatch(emptyCart());
        // navigate(paths.invoice, { state: { payload } });
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };

  const handleReCaptchaVerify = async (token) => {
    if (!token) {
      return;
    }
    token && setIsValidToken(true);
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12  main-div h-100">
          <p className="fs-14 fw-600 ml-2" style={{ color: "#B6B6B6" }}>
            Order summary
          </p>
          <table className="table checkoutTable">
            {cart?.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>Training: {item.name}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                      € {Number(item.price - item?.discount)?.toFixed(0)}
                      <img
                        src={deleteGreyAsset}
                        alt=""
                        className="cursor"
                        height="12px"
                        width="12px"
                        onClick={() => handleRemove(item.id)}
                        style={{ color: "#D5D5D5" }}
                      />
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>€ {totalPrice + totalTax - totalDiscount}</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>€ {totalDiscount}</td>
              </tr>

              <tr>
                <td>VAT (20%)</td>
                <td>€ {totalTax}</td>
              </tr>
              <tr>
                <td>
                  <p className="fs-14 fw-550">Total EUR</p>
                </td>
                <td>
                  <p className="fs-14 fw-550">
                    € {totalPrice + totalTax - totalDiscount}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <center>
            <button
              type="submit"
              className="payment-btn w-100"
              onClick={handleConfirmPayment}
            >
              Confirm payment
            </button>
            <div className="d-flex gap-2 align-items-center justify-content-center mt-3">
              <img src={shieldAsset} width="12px" height="13.71px" />
              <p className="fs-10 fw-400" style={{ color: "#A6A6A6" }}>
                Payments are secure and encrypted
              </p>
            </div>
          </center>
        </div>
      </div>
      <div className="row">
        <div style={{ position: "absolute", left: "-868px" }}>
          <div className="col-lg-12">
            <h3 className="fs-14 fw-600 mb-3 mt-5" style={{ color: "#B6B6B6" }}>
              Payment information
            </h3>
            <div className="d-flex align-items-center gap-2 mt-2">
              <img src={paypalAsset} width="60px" height="38.4px" alt="" />
              <img src={visaAsset} width="60px" height="38.4px" alt="" />
              <img src={masterAsset} width="60px" height="38.4px" alt="" />
              <img src={discoverAsset} width="60px" height="38.4px" alt="" />
              <img src={maestroAsset} width="60px" height="38.4px" alt="" />
              <img src={idealAsset} width="60px" height="38.4px" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <GoogleReCaptcha
              onVerify={(token) => handleReCaptchaVerify(token)}
            />
            {isValidToken && (
              <>
                <label
                  htmlFor=""
                  className="fs-11 fw-500"
                  style={{ color: "#616161" }}
                >
                  Name on card
                </label>
                <input
                  type="text"
                  className="checkoutInput"
                  placeholder="Christophe Margand"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <label
                  htmlFor=""
                  className="fs-11 fw-500 mt-2"
                  style={{ color: "#616161" }}
                >
                  Card number
                </label>
                <CardNumberElement />
                <div className="row mt-4">
                  <div className="col-lg-7">
                    <label
                      htmlFor=""
                      className="fs-11 fw-500"
                      style={{ color: "#616161" }}
                    >
                      Expiration
                    </label>
                    <CardExpiryElement className="checkoutInput" />
                  </div>
                  <div className="col-lg-5">
                    <label
                      htmlFor=""
                      className="fs-11 fw-500"
                      style={{ color: "#616161" }}
                    >
                      CVV
                    </label>
                    <CardCvcElement className="checkoutInput" />
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-md-12 d-flex align-items-end justify-content-end">
            <img src={safeCheckoutAsset} width="139px" height="40px" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
