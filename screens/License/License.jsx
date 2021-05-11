import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
// import * as Progress from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import { cxlxrs } from "../../constants/Colors";

import { styles } from "./styles";
import { StartOfToday, TimeDifference } from "../../utils/helper";
import { useSelector } from "react-redux";
import { Circle } from "react-native-svg";
import { FontFamily } from "../../constants/Fonts";
import moment, { isMoment } from "moment";
import AppButton from "../../components/AppButton/AppButton";

const License = () => {
  const user = useSelector(({ user }) => user.currentUser);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [progress, setProgress] = useState(0.0);
  useEffect(() => {
    const today = StartOfToday();
    const ending = user.subExpireTimestamp;
    calculateProgress(today, ending);
    const timeDifferene = TimeDifference(new Date(ending), new Date(today));
    setTimeLeft(timeDifferene);
  }, [""]);
  const calculateProgress = (today, ending) => {
    const elapsed = 100 - (today / ending) * 100;
    setProgress(elapsed.toFixed(1));
  };
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{ flexDirection: "row", alignItems: "center", width: 60 }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={24}
                color={cxlxrs.black}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.routeTitle}>Licenses</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <View style={styles.circles}>
          <AnimatedCircularProgress
            size={150}
            width={5}
            fill={progress}
            tintColor={cxlxrs.textColor}
            backgroundColor={cxlxrs.black}
            padding={10}
            renderCap={({ center }) => (
              <Circle
                cx={center.x}
                cy={center.y}
                r="10"
                fill={cxlxrs.textColor}
              />
            )}
          >
            {(fill) => (
              <Text
                style={{ fontFamily: FontFamily.FiraSemiBold, fontSize: 25 }}
              >
                {progress}%
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text
          style={{
            fontFamily: FontFamily.FiraRegular,
            fontSize: 18,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {timeLeft.days} days left
        </Text>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          position: "absolute",
          bottom: 20,
        }}
      >
        <AppButton
          onPress={() => navigation.navigate("RenewLicense")}
          title="Renew License"
          customStyle={{
            ...styles.addBtn,
          }}
          textStyle={styles.addBtnText}
        />
      </View>
    </>
  );
};

export default License;
