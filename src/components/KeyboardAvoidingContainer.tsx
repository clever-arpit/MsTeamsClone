import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useTheme } from '../hooks/ThemeContext';

type Props = {
  children: React.ReactNode;
  style?: any;
  backgroundColor?: string;
  keyboardVerticalOffset?: number;
  scrollEnabled?: boolean;
};

const KeyboardAvoidingContainer: React.FC<Props> = ({
  children,
  keyboardVerticalOffset = Platform.OS === 'ios' ? 65 : 45,
  scrollEnabled = true,
}) => {
  const { colors } = useTheme();
  const RenderComponent = scrollEnabled ? ScrollView : View;
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <StatusBar barStyle={colors.status_bar_style} hidden={true} />
      <RenderComponent
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        {children}
      </RenderComponent>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingContainer;
