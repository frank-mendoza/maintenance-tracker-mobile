import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Defs, Mask, Path, Rect } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(Text);

export default function SuccessScreen() {
  const animation = useSharedValue(0);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      animation.value = withTiming(1, {
        duration: 900,
        easing: Easing.out(Easing.exp),
      });
    }, 600); // 600ms delay before animation starts

    return () => clearTimeout(timeout);
  }, [animation]);

  // Animate checkmark drawing and color
  const animatedCheckProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(animation.value, [0, 1], [50, 0]);
    const green = 75 + Math.round(115 * animation.value);
    const stroke = animation.value === 0 ? "#fff" : `rgb(75,${green},67)`;
    return {
      strokeDashoffset,
      stroke,
    };
  });

  // Animate mask to reveal the check icon from left to right
  const maskProps = useAnimatedProps(() => {
    const width = interpolate(animation.value, [0, 1], [0, 52]);
    return {
      width,
    };
  });

  // Animate circle color from white to green
  const animatedCircleProps = useAnimatedProps(() => {
    const green = 75 + Math.round(115 * animation.value);
    const stroke = animation.value === 0 ? "#fff" : `rgb(75,${green},67)`;
    return {
      stroke,
    };
  });

  // Animate text opacity and scale
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: animation.value,
      transform: [
        {
          scale: interpolate(animation.value, [0, 1], [0.7, 1]),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <AnimatedSvg
        width={100}
        height={100}
        viewBox="0 0 52 52"
        style={{ marginBottom: 30 }}
      >
        <Defs>
          <Mask id="revealMask">
            <AnimatedRect
              x="0"
              y="0"
              width="60" // Ensure full width
              height="60" // Ensure full height
              animatedProps={maskProps}
              fill="#fff"
            />
          </Mask>
        </Defs>
        <AnimatedPath
          d="M26 1C12.1929 1 1 12.1929 1 26C1 39.8071 12.1929 51 26 51C39.8071 51 51 39.8071 51 26C51 12.1929 39.8071 1 26 1Z"
          fill="none"
          strokeWidth={2}
          animatedProps={animatedCircleProps}
        />
        <AnimatedPath
          d="M14 27L22 35L38 19"
          fill="none"
          stroke={"#fff"}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="50"
          animatedProps={animatedCheckProps}
          mask="url(#revealMask)"
        />
      </AnimatedSvg>

      <AnimatedText style={[styles.text, animatedTextStyle]}>
        Success!
      </AnimatedText>
      <Text
        className=" font-semibold text-blue-400"
        style={{ marginVertical: 20, fontSize: 16 }}
        onPress={() => router.push("/login")}
      >
        Click here to login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbf7ff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    color: "#4BB543",
    fontWeight: "bold",
  },
});
