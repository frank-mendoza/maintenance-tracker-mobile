import { images } from "@/constants/images";
import { Image, View } from "react-native";
const LoadingIndicator = () => {
  return (
    <View className="h-full  flex justify-center items-center bg-[#FFD700]">
      <Image
        source={images.logo as any}
        style={{
          width: 150,
          height: 150,
          marginTop: 10,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
export default LoadingIndicator;
