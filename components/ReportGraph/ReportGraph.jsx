import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
import { firestore } from "../../firebase/config";

const ReportGraph = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [productSold, setProductSold] = useState(0);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const statsRef = firestore.collection("stats").doc(user.id);
  const fetchData = async () => {
    statsRef.onSnapshot((snapShot) => {
      if (!snapShot.exists) {
        setIsStatsLoading(false);
        return;
      }
      setProductSold(snapShot.data().revenue);
      setIsStatsLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, [""]);
  return (
    <View style={{ alignItems: "center", width: "100%", marginVertical: 10 }}>
      <View
        style={{
          backgroundColor: cxlxrs.white,
          borderRadius: 16,
          // elevation: 4,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 5,
            paddingTop: 20,
            paddingBottom: 30,
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
                fontSize: 15,
                fontFamily: FontFamily.FiraSemiBold,
                fontWeight: "600",
              }}
            >
              Revenue
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
                  `₦${productSold}`
                )}
              </Text>
            </View>
          </View>
        </View>
        <LineChart
          data={{
            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            datasets: [
              {
                data: [0, 0, 0, 0, 0, 0, 0],
              },
            ],
          }}
          width={Dimensions.get("screen").width - 20}
          height={200}
          chartConfig={{
            backgroundColor: cxlxrs.black,
            backgroundGradientFrom: cxlxrs.black,
            backgroundGradientTo: cxlxrs.black,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
          }}
          bezier
          style={{
            borderRadius: 10,
            paddingVertical: 6,
            backgroundColor: cxlxrs.black,
          }}
        />
      </View>
    </View>
  );
};

export default ReportGraph;
