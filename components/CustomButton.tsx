import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  onPress,
  label,
  icon,
  disabled,
}: {
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  label: string;
  icon?: React.ReactNode;
  style?: StyleProp<any>;
  delay?: number;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      // disabled={disabled}
      // style={[style, animatedStyle]}
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
    </TouchableOpacity>
  );
};
export default CustomButton;
