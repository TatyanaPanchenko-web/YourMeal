import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMask } from "@react-input/mask";
import { updateOrderData } from "../../services/FB";
import { deleteAllCart } from "../../services/FB";
import style from "./modalDelivery.module.scss";

export default function modalDelivery({
  setModalDeliveryStatus,
  dataAuth,
  upload,
}) {
  const [choiceDelivery, setChoiceDelivery] = useState("carrier");
  const [submitForm, setSubmitForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const inputPhoneRef = useMask({
    mask: "+___ (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const onSubmit = (data) => {
       setSubmitForm(true);
    updateOrderData(data);
    upload.setStatus((prev) => !prev);
    deleteAllCart();
    // setModalDeliveryStatus(false);
  };
  return (
    <div>
      <div
        className={style.modal}
        onClick={() => {
          setModalDeliveryStatus(false);
        }}
      >
        <div
          className={style["modal-container"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={style["modal-close"]}
            onClick={() => {
              setModalDeliveryStatus(false);
            }}
          ></div>
          {!submitForm && <div className={style["modal-title"]}>Доставка</div>}
          <div className={style["modal-inner"]}>
            {!submitForm ? (
              <form
                className={style["delivery-form"]}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  placeholder="Ваше имя"
                  {...register("firstName", {
                    required: "Необходимо заполнить данное поле",
                    value: `${dataAuth.firstName ? dataAuth.firstName : ""}`,
                    maxLength: 30,
                    pattern: {
                      value: /^[A-Za-z, А-Яа-я]+$/i,
                      message: "Поле содержит недопустимые символы",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className={style.errorField}>
                    {errors.firstName?.message}
                  </p>
                )}
             
                <input
                  placeholder="+375 (__) ___-__-__"
                  type="tel"
                  // {...register("phone", {
                  //   required: "Необходимо заполнить данное поле",
                  // minLength: 3,
                  // })}
                  ref={inputPhoneRef}
                />
                {errors.phone && (
                  <p className={style.errorField}>{errors.phone?.message}</p>
                )}
                <div className={style["modal-radio"]}>
                  <div className={style["modal-radio-item"]}>
                    <label
                      onClick={() => {
                        setChoiceDelivery("carrier");
                      }}
                    >
                      <input
                        {...register("delivery", { required: true })}
                        type="radio"
                        value="carrier"
                        checked
                      />
                      <span>Доставка</span>
                    </label>
                  </div>
                  <div className={style["modal-radio-item"]}>
                    <label
                      onClick={() => {
                        setChoiceDelivery("self");
                      }}
                    >
                      <input
                        {...register("delivery", { required: true })}
                        type="radio"
                        value="self"
                      />
                      Самовывоз
                    </label>
                  </div>
                </div>
                {choiceDelivery === "carrier" ? (
                  <div className={style["modal-choice-delivery"]}>
                    <input
                      placeholder="Улица, дом, квартира"
                      type="text"
                      {...register("address", {
                        required: "Необходимо заполнить данное поле",
                        maxLength: 60,
                      })}
                    />
                    {errors.address && (
                      <p className={style.errorField}>
                        {errors.address?.message}
                      </p>
                    )}

                    <div className={style["modal-inputs"]}>
                      <input
                        placeholder="Этаж"
                        type="number"
                        {...register("floor", {
                          maxLength: 2,
                        })}
                      />

                      <input
                        placeholder="Домофон"
                        type="text"
                        {...register("intercom", {
                          maxLength: 10,
                        })}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={style["modal-choice-self-delivery"]}>
                    <div className={style["modal-points]"]}>
                      <div className={style["modal-radio-item"]}>
                        <label>
                          <input
                            {...register("point", { required: true })}
                            type="radio"
                            value="pointBoulRozhd"
                          />
                          <span>Рождественский бульвар 1, 10:00 - 23:00</span>
                        </label>
                      </div>
                      <div className={style["modal-radio-item"]}>
                        <label>
                          <input
                            {...register("point", { required: true })}
                            type="radio"
                            value="pointProsLen"
                          />
                          <span>Ленинградский проспект 70, 10:00 - 22:00</span>
                        </label>
                      </div>
                      <div className={style["modal-radio-item"]}>
                        <label>
                          <input
                            {...register("point", { required: true })}
                            type="radio"
                            value="pointNovosl"
                          />
                          <span>Новослободская 4, 11:00 - 23:00</span>
                        </label>
                      </div>
                      <div className={style["modal-radio-item"]}>
                        <label>
                          <input
                            {...register("point", { required: true })}
                            type="radio"
                            value="pointMozhVal"
                          />
                          <span>Можайский вал 10, 10:00 - 22:00</span>
                        </label>
                      </div>
                    </div>
                    <div className={style["modal-map]"]}></div>
                  </div>
                )}
                <input type="submit" value="Оформить" />
              </form>
            ) : (
              <div>Заказ оформлен</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
