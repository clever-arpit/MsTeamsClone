import React from 'react';
import DateTimePickerModal, {
  DateTimePickerProps,
} from 'react-native-modal-datetime-picker';
import Icons from '../utils/Icons';
import { triggerAlert } from './triggerAlert';

interface CustomDatePickerProps {
  handleConfirm: (date: Date) => void;
  hideDatePicker: () => void;
  isDatePickerVisible: boolean;
  mode?: DateTimePickerProps['mode']; // 'date' | 'time' | 'datetime'
  maximumDate?: Date;
  minimumDate?: Date;
  initialDate?: Date;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  handleConfirm,
  hideDatePicker,
  isDatePickerVisible,
  mode = 'date',
  maximumDate,
  minimumDate,
  initialDate = new Date(),
}) => {

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const hundredYearsAgo = new Date();
  hundredYearsAgo.setFullYear(today.getFullYear() - 100);

  const onConfirm = (date: Date) => {
    if (date > today) {
      triggerAlert({
        title: 'Alert',
        message:
          'Please select valid date.',
        image: Icons.warningIcon,
      });
      return;
    }

    handleConfirm(date);
    hideDatePicker();
  };

  return (
    <DateTimePickerModal
      isVisible={isDatePickerVisible}
      mode={mode}
      date={initialDate}
      maximumDate={maximumDate || today}
      minimumDate={minimumDate || hundredYearsAgo}
      onConfirm={onConfirm}
      onCancel={hideDatePicker}
    />
  );
};

export default CustomDatePicker;