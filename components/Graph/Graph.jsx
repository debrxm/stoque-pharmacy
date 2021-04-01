import React from "react";
import { Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { cxlxrs } from "../../constants/Colors";
import { FontFamily } from "../../constants/Fonts";
import StatFilterButtons from "../StatFilterButtons/StatFilterButtons";

const Graph = ({ filter, setFilter, title, monthOrderCount }) => {
  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{
          backgroundColor: cxlxrs.white,
          borderRadius: 16,
          elevation: 4,
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
                {"1800"}
              </Text>
            </View>
          </View>
          <StatFilterButtons
            filter={filter}
            setFilter={setFilter}
            styl={{
              flexDirection: "row",
              // height: 65,
              paddingVertical: 20,
            }}
          />
        </View>
        {filter === "thisWeek" ? (
          <LineChart
            data={{
              labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
              datasets: [
                {
                  data: [100, 0, 0, 0, 0, 0, 0],
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
        ) : (
          <View
            style={{
              height: 200,
              width: Dimensions.get("screen").width - 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: cxlxrs.black,
                fontSize: 50,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              {monthOrderCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Graph;
