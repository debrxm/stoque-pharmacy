import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
import { firestore } from "../../firebase/config";
import { FirstDayOfTheMonth, FirstDayOfTheWeek } from "../../utils/helper";
import StatFilterButtons from "../StatFilterButtons/StatFilterButtons";

const Graph = ({ filter, setFilter, title }) => {
  const user = useSelector(({ user }) => user.currentUser);
  const [productSold, setProductSold] = useState(0);
  const [monthOrderCount, setMonthOrderCount] = useState(0);
  const [weekOrderCount, setWeekOrderCount] = useState(0);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isSalesLoading, setIsSalesLoading] = useState(true);
  const statsRef = firestore.collection("stats").doc(user.id);
  const fetchData = async () => {
    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        setIsStatsLoading(false);
        return;
      }
      setProductSold(snapShot.data().sold);
      setIsStatsLoading(false);
    });
    const salesRef = firestore
      .collection("sales")
      .doc(user.id)
      .collection("sales");
    salesRef
      .where("created_at", ">", FirstDayOfTheWeek())
      .onSnapshot((snapShot) => {
        if (snapShot.empty) {
          setIsSalesLoading(false);
          return;
        }
        let producCount = 0;
        const size = snapShot.docs.length - 1;
        snapShot.docs.forEach((item, index) => {
          producCount += item.data().quantity;
          if (index === size) {
            setWeekOrderCount(producCount);
          }
        });
        setIsSalesLoading(false);
      });
    salesRef
      .where("created_at", ">", FirstDayOfTheMonth())
      .onSnapshot((snapShot) => {
        if (snapShot.empty) {
          setIsSalesLoading(false);
          return;
        }
        let producCount = 0;
        const size = snapShot.docs.length - 1;
        snapShot.docs.forEach((item, index) => {
          producCount += item.data().quantity;

          if (index === size) {
            setMonthOrderCount(producCount);
          }
        });
        setIsSalesLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [""]);
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{
          backgroundColor: cxlxrs.white,
          borderRadius: 16,
          elevation: 4,
          width: isStatsLoading ? "100%" : "auto",
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 20,
            paddingBottom: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: cxlxrs.black,
                fontSize: 14,
                fontFamily: FontFamily.FiraMedium,
                fontWeight: "600",
              }}
            >
              Product Sold
            </Text>
            <View
              style={{
                backgroundColor: cxlxrs.success,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 0,
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  color: cxlxrs.white,
                  fontSize: 12,
                  fontFamily: FontFamily.FiraSemiBold,
                }}
              >
                {isStatsLoading ? (
                  <ActivityIndicator
                    size="small"
                    color={cxlxrs.white}
                    style={{ marginBottom: 10 }}
                  />
                ) : (
                  productSold
                )}
              </Text>
            </View>
          </View>
          <StatFilterButtons
            filter={filter}
            setFilter={setFilter}
            styl={{
              flexDirection: "row",
              paddingVertical: 20,
            }}
          />
        </View>
        {isStatsLoading ? (
          <ActivityIndicator
            size="large"
            color={cxlxrs.black}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <>
            {filter === "thisWeek" ? (
              <ChartDisplay count={weekOrderCount} duration="week" />
            ) : (
              <ChartDisplay count={monthOrderCount} duration="month" />
            )}
          </>
        )}
      </View>
    </View>
  );
};

function ChartDisplay({ count, duration }) {
  return (
    <View
      style={{
        height: 140,
        width: Dimensions.get("screen").width - 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 20,
          fontFamily: FontFamily.FiraMedium,
          color: cxlxrs.textColor,
        }}
      >
        {count}
      </Text>
      <Text
        style={{
          color: cxlxrs.black,
          fontFamily: FontFamily.FiraRegular,
          fontSize: 13,
          fontWeight: "bold",
          marginBottom: 20,
          letterSpacing: 2,
        }}
      >
        {`Product${count > 1 ? "s" : ""} already sold this ${duration}`}
      </Text>
    </View>
  );
}

export default Graph;
