import React, {useState, useCallback, useMemo} from 'react';
import {TextInput, View, Text, Image} from 'react-native';
import styles from './styles';
import {useStyles} from '@theme';

const phoneVerifierRegex = /\+?\d+/g;

const sources = {
  PROFILE: {
    inactive: require('@assets/profile/profile.png'),
    active: require('@assets/profile/profile.png'),
    error: require('@assets/profile/profile_error.png'),
  },
  PHONE: {
    inactive: require('@assets/phone/phone.png'),
    active: require('@assets/phone/phone.png'),
    error: require('@assets/phone/phone.png'), // need phone.error icon
  },
  DELIVERY_TYPE: {
    inactive: require('@assets/delivery_type/delivery_type_inactive.png'),
    active: require('@assets/delivery_type/delivery_type.png'),
  },
};

const InputWithIcon = ({
  label = '',
  keyboardType = 'default',
  onChangeText,
  returnKeyType = 'next',
  numberOfLines = 1,
  value,
  placeholder = '',
  icon,
  type = 'text',
  required,
}) => {
  const theme = useStyles();
  const [active, setActive] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const handleChangeText = content => {
    setText(content);
    if (type === 'phone') {
      return onChangeText(content.match(phoneVerifierRegex)?.join());
    }
    return onChangeText(content);
  };

  const hasLabel = useMemo(() => label.length > 1, [label]);

  const handleVerification = useCallback(() => {
    setActive(false);
    setError(false);
    if (required && !value) {
      setError(true);
    }
    if (!active && text && !value) {
      setError(true);
    }
  }, [required, value, active, text]);

  const iconSources = sources[icon];

  return (
    <View style={[styles.inputContainer, theme.flex]}>
      <Text style={styles.inputLabelWithIcon}>
        {required && hasLabel ? `${label}` : hasLabel ? label : ' '}
      </Text>
      <View
        style={[
          styles.inputWithIcon,
          active
            ? styles.inputWithIconActive
            : error
            ? styles.inputWithIconError
            : styles.inputWithIconInactive,
        ]}
      >
        <Image
          style={styles.inputIcon}
          source={
            active || value
              ? iconSources.active || icon
              : error
              ? iconSources.error
              : iconSources.inactive || icon
          }
        />
        <TextInput
          onBlur={handleVerification}
          onFocus={() => setActive(true)}
          style={styles.inputWithIconText}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          underlineColorAndroid="transparent"
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          value={value}
          numberOfLines={numberOfLines}
        />
      </View>
    </View>
  );
};

export default InputWithIcon;
