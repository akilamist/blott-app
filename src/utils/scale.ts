
import { Dimensions, Linking, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
export const ScreenWidth = width;
export const ScreenHeight = height;
const baseWidth = 393;
const baseHeight = 852;
const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: number) => Math.ceil(size * scale);