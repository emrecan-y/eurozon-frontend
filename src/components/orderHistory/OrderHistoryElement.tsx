import { Order } from "@/models/order";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import MotionButton from "../ui/MotionButton";
import ImageLoader from "../ui/ImageLoader";

type OrderHistoryElementProps = {
  order: Order;
};

function OrderHistoryElement({ order }: OrderHistoryElementProps) {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const purchasedOn = new Date(order.purchasedOn);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  function toggleDetailedView(
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    setShowDetailedView((prev) => !prev);
    if (event.target instanceof SVGElement) {
      event.stopPropagation();
    }
  }

  return (
    <div
      className={`w-full rounded border-2 border-primary-bg-3 bg-primary-bg-2 text-xs shadow-md sm:text-sm`}
    >
      <div
        className={`${showDetailedView && "border-b-2"} flex items-center justify-between gap-2 border-accent-2 p-2`}
        onClick={toggleDetailedView}
      >
        <div className="flex flex-col">
          <p className="font-semibold">Bestellnummer</p>
          <p> {order.orderNumber}</p>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold">Status</p>
          <p>{order.status}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">Bestellt am</p>
          <p>{purchasedOn.toISOString().split("T")[0].replace(/-/g, ".")}</p>
        </div>
        <AnimatePresence>
          <div className="relative z-10 h-7 w-7">
            <MotionButton
              className="absolute left-0 top-0 h-full w-full"
              key={`order-history-${order.orderNumber}-${showDetailedView}`}
              onClick={toggleDetailedView}
              initial={
                isFirstLoad
                  ? false
                  : {
                      opacity: 0,
                      rotate: showDetailedView ? "-90deg" : "90deg",
                    }
              }
              exit={{
                opacity: 0,
                rotate: showDetailedView ? "-90deg" : "90deg",
              }}
              animate={{ opacity: 1, rotate: "0deg" }}
              transition={{ type: "linear" }}
            >
              {showDetailedView ? (
                <ChevronDown className="h-full w-full" />
              ) : (
                <ChevronRight className="h-full w-full" />
              )}
            </MotionButton>
          </div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showDetailedView && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ type: "ease-in-out" }}
          >
            <div className="flex flex-col gap-1 p-2">
              {Array.isArray(order.orderPositions) &&
                order.orderPositions.map((orderPos) => (
                  <div className="flex items-center justify-between border-b border-primary-text-2 pb-1">
                    <div className="h-20 w-20 rounded-lg border shadow-md sm:h-24 sm:w-24">
                      <ImageLoader
                        imageUrl={orderPos.product.imageUrl}
                      ></ImageLoader>
                    </div>

                    <div className="flex flex-1 flex-col p-2">
                      <p>{orderPos.product.name}</p>
                      <p>{orderPos.product.description}</p>
                    </div>
                    <div className="flex flex-col">
                      <p>
                        {orderPos.amount} x {orderPos.productPriceOnPurchase} €
                      </p>
                    </div>
                  </div>
                ))}
              <p className="self-end font-bold">{order.totalPrice} €</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default OrderHistoryElement;
