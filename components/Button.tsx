import { useEffect } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Button = ({
  onPress,
  label,
  icon,
  style,
  disabled,
  delay = 400, // default delay in ms
}: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  icon?: React.ReactNode;
  style?: StyleProp<any>;
  delay?: number;
  disabled?: boolean;
}) => {
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withDelay(
      delay,
      withTiming(1, {
        duration: 700,
        easing: Easing.bounce,
      })
    );
  }, [bounce, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(bounce.value, [0, 1], [0.7, 1]),
      },
    ],
    opacity: bounce.value,
  }));

  return (
    <AnimatedTouchable
      disabled={disabled}
      style={[style, animatedStyle]}
      className="mt-2 w-full p-4 bg-[#FFD700] rounded-lg items-center border-gray-300"
      onPress={onPress}
      // activeOpacity={0.8}
    >
      {disabled ? (
        <ActivityIndicator size="small" color="#79797a" />
      ) : (
        <Text style={{ color: "#464646", fontSize: 16 }}>
          {icon} {label}
        </Text>
      )}
    </AnimatedTouchable>
  );
};
export default Button;
